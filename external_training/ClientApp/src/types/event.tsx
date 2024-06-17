export type EventType = {
    trainingApplicationId: number,
    courseName: string,
    userFullName: string,
    isOnline: boolean,
    status: string,
    begin: string,
    end: string,
}

export type EventsType = EventType[];
