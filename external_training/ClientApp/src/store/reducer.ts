import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import {SystemProcess} from '../types/state';
import {Notifications} from "../types/notifications";

const initialState: SystemProcess = {
    error: null,
    isDataLoading: false,
    notifications: []
};

export const systemProcess = createSlice({
    name: 'TEST',
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
    }
});
export const redirectToRoute = createAction<string>('app/redirectToRoute');
export const {setLoadingStatus, setError, loadNotifications} = systemProcess.actions;
