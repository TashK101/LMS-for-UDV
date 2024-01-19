export type AdminApplication = {
    trainingApplicationId: number,
    status: string,
    educationalCenter: string,
    courseName: string,
    participantsCount: number,
    participantsNames: string,
    isTrainingOnline: boolean,
    isCorporateTraining: boolean,
    begin: string,
    end: string,
    costPerParticipant: number
}
