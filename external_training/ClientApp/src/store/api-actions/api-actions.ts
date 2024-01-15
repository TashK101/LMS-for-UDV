import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {
    loadEvents,
    loadNotifications,
    loadTest,
    redirectToRoute,
    setLoadingStatus
} from "../system-process/system-process";
import {Application} from "../../types/application";
import {EventsType} from "../../types/event.tsx";


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