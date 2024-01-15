import {store} from "../store/store";
import {Notifications} from "./notifications";
import {Application} from "./application";

export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    notifications: Notifications[];
    test: Application | undefined;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;