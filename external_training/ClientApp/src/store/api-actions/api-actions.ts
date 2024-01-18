import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {
    loadApplicationDetails, loadCourseDetails,
    loadEvents,
    loadNotifications,
    loadStartConfig,
    loadTrainingApplications,
    setLoadingStatus
} from "../system-process/system-process";
import {Notifications} from "../../types/notifications";
import {Application, Course} from "../../types/application";
import {StartConfig} from "../../types/startConfig";

import {EventsType} from "../../types/event.tsx";
import {ShortApplicationInfoType} from "../../types/short-application-info.tsx";
import { INewApplication } from "../../types/new-application.tsx";
import {redirect} from "react-router-dom";



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
        } finally {
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
                }).catch(err => {
                console.log(err.response.data);
                redirect('/error');
            });
            dispatch(loadApplicationDetails(data));
        }

        finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchCourseDetailsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchCourseDetails',
    async (id, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<Course>(`api/user/course`,
                {
                    params: { trainingApplicationId: id }
                } );
            dispatch(loadCourseDetails(data));
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

export const fetchRoleAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchApplicationDetails',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<StartConfig>(`api/user/role`);
            dispatch(loadStartConfig(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchUserTrainingApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchUserTrainingApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortApplicationInfoType[]>(`api/user/training_applications`);
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