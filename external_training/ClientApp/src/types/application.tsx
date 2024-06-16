import {CommentsType} from "./comments";

export type Application = {
    trainingApplicationId: number;
    trainingTopic: string;
    status: string;
    applicationUserId: string;
    applicationUserName: string;
    department: string;
    team: string;
    similarPrograms: string;
    relevanceReason: string;
    trainingGoals: string;
    skillsToBeAcquired: string;
    applicationNotes: string;
    createdAt: string;
    comments: CommentsType;
    approvingManagers: ApprovingManager[];
    participants: Participant[];
    desiredCourse: Course;
    selectedCourse: Course;
}

export type ApprovingManager = {
    personId: string;
    appointmentId: string;
    postName: string;
    orgUnitName: string;
    lastName: string;
    firstName: string;
    middleName: string;
}

export type Participant = {
    soloPersonId: string;
    fullName: string;
    lastName: string;
    firstName: string;
    middleName: string;
}

export type Course = {
    courseId: number;
    trainingApplicationId: number;
    name: string;
    isTrainingOnline: boolean;
    isCorporateTraining: boolean;
    category: string;
    description: string;
    trainingCenter: string;
    costPerParticipant: number;
    totalCost: number;
    begin: string;
    end: string;
    participantFullNames: string[];
}