import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {
    loadNotifications,
    loadStartConfig,
    loadTest,
    redirectToRoute,
    setLoadingStatus
} from "../system-process/system-process";
import {Notifications} from "../../types/notifications";
import {Application} from "../../types/application";
import {StartConfig} from "../../types/startConfig";



export const fetchNotificationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchNotifications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<Notifications>(`api/user/notifications`);
            dispatch(loadNotifications(data));
        } finally{
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchApplicationDetailsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchApplicationDetails',
    async (id, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<Application>(`api/user/training_application`,
                {
                    params: { trainingApplicationId: id }
                } );
            dispatch(loadTest(data));
        } finally{
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchStartConfigAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchStartConfig',
    async (_args, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<StartConfig>('api/user/role');
            dispatch(loadStartConfig(data));
        } finally{
            dispatch(setLoadingStatus(false));
        }
    },
);