import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token.ts';
import {store} from '../store/store';
import {setError} from '../store/reducer';
import {StatusCodes} from 'http-status-codes';

export const BACKEND_URL = 'https://13.design.pages.academy/wtw';
export const REQUEST_TIMEOUT = 5000;


export const STATUS_CODE_MAPPING: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true
};


const shouldDisplayError = (response: AxiosResponse) => !!STATUS_CODE_MAPPING[response.status];

export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL : BACKEND_URL,
        timeout : REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const token = getToken();

            if (token && config.headers) {
                config.headers['x-token'] = token;
            }

            return config;
        },
    );

    api.interceptors.response.use((response) => response, (error: AxiosError) => {
        if (error.response?.data && shouldDisplayError(error.response)) {
            store.dispatch(setError(error.response.data.toString()));
                }
        throw error;
    }
    );

    return api;
};
