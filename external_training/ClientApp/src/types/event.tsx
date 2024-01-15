export type EventType = {
    trainingApplicationId: number,
    trainingTopic: string,
    status: string,
    begin: string,
    end: string,
}

export type EventsType = EventType[];

export type EventDataType = {
    year: number,
    month: number,
}