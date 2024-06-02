import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import {SystemProcess} from '../../types/state';
import {Notifications} from "../../types/notifications";
import {Application} from "../../types/application";
import {EventType} from "../../types/event.tsx";
import {TrainingApplicationType} from "../../types/training-application.tsx";
import { Manager } from '../../types/manager.tsx';

const initialState: SystemProcess = {
    error: null,
    isDataLoading: false,
    notifications: [],
    test: undefined,

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
        loadNotifications : (state, action : PayloadAction<Notifications[]>) => {
            state.notifications = action.payload;
        },
        loadTest : (state, action : PayloadAction<Application>) => {
            state.test = action.payload;
            console.log(action.payload);
        },
        loadEvents : (state, action : PayloadAction<EventType[]>) => {
            state.events = action.payload;
        },
        loadTrainingApplications : (state, action : PayloadAction<TrainingApplicationType[]>) => {
            state.trainingApplications = action.payload;
        },
        loadManagers: (state, action: PayloadAction<Manager[]>) => {
            state.managers = action.payload;
        }
    }
});
export const redirectToRoute = createAction<string>('app/redirectToRoute');
export const {setLoadingStatus, setError, loadNotifications, loadTest, loadEvents, loadTrainingApplications, loadManagers } = systemProcess.actions;
