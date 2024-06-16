import {ApplicationStatus} from "../components/current-applications-utils/application-status.ts";

export type EventType = {
    trainingApplicationId: number,
    courseName: string,
    status: ApplicationStatus,
    begin: string,
    end: string,
}

export type EventsType = EventType[];
