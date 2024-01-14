import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {store} from '../store/store';
import {setError} from '../store/reducer';
import {StatusCodes} from 'http-status-codes';
import authService from '../components/api-authorization/AuthorizeService'

export const BACKEND_URL = 'https://localhost:44441';
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
        async (config: AxiosRequestConfig) => {
            let value: any;

            try {
                // Wait for the promise to resolve
                value = await authService.getAccessToken();
            } catch (error) {
                // Handle any errors that might occur while getting the access token
                console.error("Error getting access token:", error);
            }

            if (value && config.headers) {
                config.headers['Authorization'] = `Bearer ${value}`;
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
