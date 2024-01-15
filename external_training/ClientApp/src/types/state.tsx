import {store} from "../store/store";
import {Notifications} from "./notifications";
import {Application} from "./application";

export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    notifications: Notifications[],
    application: Application | undefined,
    notifications: Notifications[];
    application: Application | undefined;
    role: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;