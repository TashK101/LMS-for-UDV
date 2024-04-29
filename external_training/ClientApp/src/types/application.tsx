import {CommentsType} from "./comments";

export type Application = {
    trainingApplicationId: number;
    trainingTopic: string;
    status: string;
    "desiredManagerId": string;
    desiredManagerName: string;
    "applicationUserId": string,
    "applicationUserName": string,
    plannedParticipantsCount: number;
    plannedParticipantsNames: string;
    department: string;
    team: string;
    isTrainingOnline: boolean;
    isCorporateTraining: boolean;
    desiredBegin: string;
    desiredEnd: string;
    estimatedCostPerParticipant: number;
    similarPrograms: string;
    relevanceReason: string;
    trainingGoals: string;
    skillsToBeAcquired: string;
    applicationNotes: string;
    comments: CommentsType;
}

export type Course = {
    trainingApplicationId: number,
    trainingTopic: string,
    status: string,
    applicationUserId: string,
    desiredManagerId: string,
    desiredManagerName: string,
    educationalCenter: string,
    courseName: string,
    participantsCount: number,
    participantsNames: string,
    department: string,
    team: string,
    isTrainingOnline: boolean,
    isCorporateTraining: boolean,
    begin: string,
    end: string,
    costPerParticipant: number,
    comments: CommentsType;
}