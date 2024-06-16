import {Course} from "./application";

export type INewApplication = {
    trainingTopic: string
    similarPrograms: string
    approvingManagerSoloAppointmentIds: string[] | undefined
    participantSoloPersonIds: string[] | undefined
    
    relevanceReason: string
    trainingGoals: string
    skillsToBeAcquired: string
    applicationNotes: string

    desiredCourse: desiredCourse
}

export type desiredCourse = {
    name: string
    isTrainingOnline: boolean
    isCorporateTraining: boolean
    begin: string
    end: string
    costPerParticipant: number
    totalCost: number
}