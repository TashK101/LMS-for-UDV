import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {loadNotifications, loadTest, redirectToRoute, setLoadingStatus} from "../system-process/system-process";
import {Notifications} from "../../types/notifications";
import authService from '../../components/api-authorization/AuthorizeService'
import {Application} from "../../types/application";



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