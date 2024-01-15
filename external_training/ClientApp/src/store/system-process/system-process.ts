import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import {SystemProcess} from '../../types/state';
import {Notifications} from "../../types/notifications";
import {Application} from "../../types/application";

const initialState: SystemProcess = {
    error: null,
    isDataLoading: false,
    notifications: [],
    application: undefined,
    role: '',

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
        loadRole : (state, action : PayloadAction<string>) => {
            state.role = action.payload;
        },
        loadTest : (state, action : PayloadAction<Application>) => {
            state.application = action.payload;
        },
    }
});
export const redirectToRoute = createAction<string>('app/redirectToRoute');
export const {setLoadingStatus, setError, loadNotifications, loadTest} = systemProcess.actions;
