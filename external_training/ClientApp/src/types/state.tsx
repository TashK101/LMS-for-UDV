import {store} from "../store/store";
import {Notifications} from "./notifications";

export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    notifications: Notifications[]
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;