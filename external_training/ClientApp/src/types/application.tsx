import { CommentsType } from "./comments";

export type Application = {
    trainingApplicationId: number;
    trainingTopic: string;
    status: string;
    applicationUserName: string;
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