import { Activity, ActivityTracker, ResearchFindings } from "./types";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const combineFindings = (findings: ResearchFindings[]) : string => {
    return findings.map(finding => `${finding.summary}\n\n Source: ${finding.source}`).join('\n\n---\n\n')
}

export const handleError = <T>(error: unknown, context: string,activityTracker?:ActivityTracker, activityType?: Activity["type"], fallbackReturn?: T) =>{

    const errorMessage = error instanceof Error ? error.message : 'Unkown error';

    if(activityTracker && activityType){
        activityTracker.add(activityType, "error", `${context} failed" ${errorMessage}`)
    }
    return fallbackReturn
}