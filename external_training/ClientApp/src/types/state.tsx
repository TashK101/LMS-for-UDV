import {store} from "../store/store";
import {Notifications} from "./notifications";
import {Application} from "./application";
import {EventType} from "./event.tsx";

export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    notifications: Notifications[];
    test: Application | undefined;
    events: EventType[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;