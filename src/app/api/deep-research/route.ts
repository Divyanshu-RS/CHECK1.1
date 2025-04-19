import { createDataStreamResponse } from "ai";
import { ResearchState } from "./types";
import { deepResearch } from "./main";

export async function POST(req: Request) {
  try {
    const {messages } = await req.json();

    const lastMessageContent = messages[messages.length - 1].content; 

    const parsed = JSON.parse(lastMessageContent);

    const topic = parsed.topic;
    const clerifications = parsed.clerifications;


    return createDataStreamResponse({
        execute: async (dataStream) => {
          // Write data
        //   dataStream.writeData({ value: 'Hello' });

        const researchState: ResearchState = {
            topic: topic,
            completedSteps: 0,
            tokenUsed: 0,
            findings: [],
            processedUrl: new Set(),
            clerificationsText: JSON.stringify(clerifications)
        }
       await deepResearch(researchState, dataStream)
        
      
        },
        // onError: error => `Custom error: ${error.message}`,
      });
  } catch (error) {

    return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message: "Invalid message format!"
        }),
        { status: 200 }
      );
      
  }
}
