import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {addErrorToLink} from '../../get-error-link';
import {
    loadAdminArchivedApplications,
    loadAdminPendingApplications,
    loadApplicationDetails,
    loadCourseDetails,
    loadEvents,
    loadManagers,
    loadNotifications,
    loadStartConfig,
    loadUserArchivedApplications,
    loadUserTrainingApplications,
    setLoadingStatus
} from "../system-process/system-process";
import {Notifications} from "../../types/notifications";
import {Application, Course} from "../../types/application";
import {StartConfig} from "../../types/startConfig";

import {EventsType} from "../../types/event.tsx";
import {ShortAdminPendingApplicationInfoType, ShortApplicationInfoType} from "../../types/short-application-info.tsx";
import {INewApplication} from "../../types/new-application.tsx";
import {SentCommentType} from "../../types/comments";
import {Manager} from "../../types/manager.tsx";
import {AcceptDeclineProps} from "../../components/application-details/accept-decline-buttons";
import {AdminApplication} from "../../types/admin-application.tsx";


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
            await api.get<Application>(`api/user/training_application`,
                {
                    params: {trainingApplicationId: id}
                })
                .then(({data}) => dispatch(loadApplicationDetails(data)))
                .catch(err => {
                    if (err.response.status === 404) window.location.href = addErrorToLink(window.location.href)
                    console.log(err.response.data);
                });
        } finally {
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
                    params: {trainingApplicationId: id}
                });
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
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<EventsType>('/api/user/events');
            dispatch(loadEvents(data))

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
    async (arg: INewApplication, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<INewApplication>('/api/user/training_application', arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const postUserCommentAction = createAsyncThunk<void, SentCommentType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postUserCommentAction',
    async (arg: SentCommentType, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<SentCommentType>('/api/user/comment', arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);
export const postManagerCommentAction = createAsyncThunk<void, SentCommentType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postManagerCommentAction',
    async (arg: SentCommentType, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<SentCommentType>('/api/manager/comment', arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const postAdminCommentAction = createAsyncThunk<void, SentCommentType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postAdminCommentAction',
    async (arg: SentCommentType, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<SentCommentType>('/api/Admin/comment', arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const acceptAction = createAsyncThunk<void, AcceptDeclineProps, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/accept',
    async (arg: AcceptDeclineProps, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<AcceptDeclineProps>(`/api/manager/accept_application?TrainingApplicationId=${arg.TrainingApplicationId}`)
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const declineAction = createAsyncThunk<void, AcceptDeclineProps, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/decline',
    async (arg: AcceptDeclineProps, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<AcceptDeclineProps>(`/api/manager/decline_application?TrainingApplicationId=${arg.TrainingApplicationId}`)
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
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<Manager[]>('/api/user/managers');
            dispatch(loadManagers(data))
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const postAdminApplicationAction = createAsyncThunk<void, AdminApplication, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postAdminApplicationAction',
    async (arg: AdminApplication, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<AdminApplication>('/api/Admin/course', arg);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);

export const postApplicationToSoloAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/postAdminApplicationAction',
    async (id, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            await api.post<{ applicationId: string }>(`api/Admin/send_application_to_solo?${id}`);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    },
);