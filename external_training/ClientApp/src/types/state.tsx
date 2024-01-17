import {store} from "../store/store";
import {Notifications} from "./notifications";
import {Application} from "./application";
import {EventType} from "./event.tsx";
import {ShortApplicationInfoType} from "./short-application-info.tsx";


export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    application: Application | undefined;
    role: string;
    userFullName: string;
    notifications: Notifications;
    events: EventType[];
    trainingApplications: ShortApplicationInfoType[];

};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;