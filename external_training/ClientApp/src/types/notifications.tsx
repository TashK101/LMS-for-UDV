export type NotificationType =
    {
        createdAt: string,
        text: string,
        trainingApplicationId: number,
        trainingTopic: string,
    }

export type Notifications = NotificationType[];