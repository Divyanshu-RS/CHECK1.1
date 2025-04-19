/* eslint-disable @typescript-eslint/no-explicit-any */
import { Activity, ResearchState } from './types';


export const createActivityTracker = (dataStream: any, researchState: ResearchState) => {

    return {
        add: (type: Activity['type'], status: Activity['status'], message: Activity['message'] ) => {
            dataStream.writeData({
                type: "activity",
                content:{
                    type,
                    status,
                    message, 
                    timestamp: Date.now(),
                    completedSteps: researchState.completedSteps,
                    tokenUsed: researchState.tokenUsed
                }
            })
        }
    }
}


