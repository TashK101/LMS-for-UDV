import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {
    loadAdminArchivedApplications,
    loadAdminPendingApplications,
    loadEvents, loadManagerArchivedApplications, loadManagerPendingApplications,
    loadApplicationDetails, loadCourseDetails,
    loadEvents,
    loadNotifications,
    loadStartConfig,
    loadTest,
    loadTrainingApplications, loadUserArchivedApplications, loadUserTrainingApplications,
    redirectToRoute,
    setLoadingStatus
} from "../system-process/system-process";
import {Notifications} from "../../types/notifications";
import {Application, Course} from "../../types/application";
import {StartConfig} from "../../types/startConfig";

import {EventsType} from "../../types/event.tsx";
import {ShortAdminPendingApplicationInfoType, ShortApplicationInfoType} from "../../types/short-application-info.tsx";
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
            dispatch(loadUserTrainingApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchUserArchivedApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchUserArchivedApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortApplicationInfoType[]>(`api/user/archived_applications`);
            dispatch(loadUserArchivedApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchManagerPendingApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchManagerPendingApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortApplicationInfoType[]>(`api/manager/pending_applications`);
            dispatch(loadManagerPendingApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchManagerArchivedApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchManagerArchivedApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortApplicationInfoType[]>(`api/manager/archived_applications`);
            dispatch(loadManagerArchivedApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchAdminPendingApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchAdminPendingApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortAdminPendingApplicationInfoType[]>(`api/Admin/pending_applications`);
            dispatch(loadAdminPendingApplications(data));
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const fetchAdminArchivedApplicationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchAdminArchivedApplications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<ShortApplicationInfoType[]>(`api/Admin/archived_applications`);
            dispatch(loadAdminArchivedApplications(data));
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