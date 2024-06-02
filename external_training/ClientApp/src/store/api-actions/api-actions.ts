import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {
    loadEvents,
    loadManagers,
    loadNotifications,
    loadTest, loadTrainingApplications,
    redirectToRoute,
    setLoadingStatus
} from "../system-process/system-process";
import {Application} from "../../types/application";
import {EventsType} from "../../types/event.tsx";
import {TrainingApplicationType} from "../../types/training-application.tsx";
import { INewApplication } from "../../types/new-application.tsx";
import { Manager } from "../../types/manager.tsx";


export const fetchNotificationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchNotifications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<Application>('/api/user/training_application?trainingApplicationId=1');
            dispatch(loadTest(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchEventsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchEvents',
    async (_arg,  {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<EventsType>('/api/user/events');
            dispatch(loadEvents(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchTrainingApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchEvents',
    async (_arg,  {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<TrainingApplicationType[]>('/api/user/training_applications');
            dispatch(loadTrainingApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const postNewApplicationAction = createAsyncThunk<void, INewApplication, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postNewApplication',
    async (_arg: INewApplication, { dispatch, extra: api }) => {
        try {
            dispatch(setLoadingStatus(true));
            const { data } = await api.post<INewApplication>('/api/user/training_application', _arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchManagersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchManagers',
    async (_arg, { dispatch, extra: api }) => {
        try {
            dispatch(setLoadingStatus(true));
            const { data } = await api.get<Manager[]>('/api/user/managers');
            dispatch(loadManagers(data))
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);
