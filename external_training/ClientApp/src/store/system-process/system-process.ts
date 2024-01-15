import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import {SystemProcess} from '../../types/state';
import {Notifications} from "../../types/notifications";
import {Application} from "../../types/application";
import {EventType} from "../../types/event.tsx";
import {StartConfig} from "../../types/startConfig";

const initialState: SystemProcess = {
    error: null,
    isDataLoading: false,
    notifications: [],
    application: undefined,
    role: '',
    userFullName: '',
};

export const systemProcess = createSlice({
    name: 'SYSTEM',
    initialState,
    reducers: {
        setError : (state, action : PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setLoadingStatus : (state, action : PayloadAction<boolean>) => {
            state.isDataLoading = action.payload;
        },
        loadNotifications : (state, action : PayloadAction<Notifications>) => {
            state.notifications = action.payload;
        },
        loadStartConfig : (state, action : PayloadAction<StartConfig>) => {
            state.role = action.payload.roleName;
            state.userFullName = action.payload.userFullName;
        },
        loadTest : (state, action : PayloadAction<Application>) => {
            state.application = action.payload;
        },
        loadApplicationDetails : (state, action : PayloadAction<Application>) => {
            state.application = action.payload;
        },
        loadEvents : (state, action : PayloadAction<EventType[]>) => {
            state.events = action.payload;
        },
    }
});
export const redirectToRoute = createAction<string>('app/redirectToRoute');
export const {setLoadingStatus, setError, loadNotifications, loadTest, loadEvents, loadStartConfig, loadApplicationDetails} = systemProcess.actions;

