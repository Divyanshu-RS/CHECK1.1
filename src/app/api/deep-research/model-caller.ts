import { generateObject, generateText } from "ai";
import { openrouter } from "./services";
import { ActivityTracker, ModelCallOptions, ResearchState } from "./types";
import { MAX_RETRY_ATTEMPTS, RETRY_DELAY_MS } from "./constants";
import { delay } from "./utils";


export async function callModel<T>({
    model, prompt, system, schema, activityType = "generate"
}: ModelCallOptions<T>,
researchState: ResearchState,activityTracker: ActivityTracker ): Promise<T | string>{

  let attempts = 0;
  let lastError: Error | null = null;

  while(attempts < MAX_RETRY_ATTEMPTS){
    try{
      if(schema){

        const { object, usage } = await generateObject({
            model: openrouter(model),
            prompt,
            system,
            schema: schema
          });
    
          researchState.tokenUsed += usage.totalTokens;
          researchState.completedSteps++
    
          return object;
        }else{
    
            const { text, usage } = await generateText({
                model: openrouter(model),
                prompt,
                system,
              });
    
              researchState.tokenUsed += usage.totalTokens;
          researchState.completedSteps++
    
          return text;
        }
    }catch(error){
       attempts++;
       lastError = error instanceof Error ? error : new Error('Unknown error');

       if(attempts < MAX_RETRY_ATTEMPTS){
        activityTracker.add(activityType, 'warning', `Model call failed, attempt ${attempts}/${MAX_RETRY_ATTEMPTS}. Retrying...`)
       }
       await delay(RETRY_DELAY_MS*attempts)
    }
  }

  throw lastError || new Error(`Failed after ${MAX_RETRY_ATTEMPTS} attempst!`)
}