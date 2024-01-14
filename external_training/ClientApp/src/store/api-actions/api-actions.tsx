import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {loadNotifications, redirectToRoute, setLoadingStatus} from "../reducer";
import {Notifications} from "../../types/notifications";
import authService from '../../components/api-authorization/AuthorizeService'



export const fetchNotificationsAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchNotifications',
    async (_arg, {dispatch, extra: api}) => {
        try {
            dispatch(setLoadingStatus(true));
            const {data} = await api.get<any>('weatherforecast');
            //dispatch(loadNotifications(data));
            dispatch(redirectToRoute('/fetch-data'))
        } finally{
            dispatch(setLoadingStatus(false));
        }
    },
);
