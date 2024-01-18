export type ShortApplicationInfoType = {
    trainingApplicationId: number,
    trainingTopic: string,
    createdAt: string,
    status: string,
    commentsCount: number,
}

export type ShortAdminPendingApplicationInfoType = {
    trainingApplicationId: number,
    trainingTopic: string,
    createdAt: string,
    status: string,
    commentsCount: number,
    userFullName: string,
}