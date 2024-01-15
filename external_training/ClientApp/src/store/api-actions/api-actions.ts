import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, State} from "../../types/state";
import {AxiosInstance} from "axios";
import {loadApplicationDetails, loadNotifications, redirectToRoute, setLoadingStatus} from "../reducer";
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
            const {data} = await api.get<any>('weatherforecast');
            //dispatch(loadNotifications(data));
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
                    params: { trainingApplicationId: id },
                }, );
            dispatch(loadApplicationDetails(data));
        } finally{
            dispatch(setLoadingStatus(false));
        }
    },
);
