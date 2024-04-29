import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {store} from '../store/store';
import {setError} from '../store/system-process/system-process';
import {StatusCodes} from 'http-status-codes';
import authService from '../components/api-authorization/AuthorizeService'
import {redirect} from "react-router-dom";

export const BACKEND_URL = '';
export const REQUEST_TIMEOUT = 5000;


export const STATUS_CODE_MAPPING: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!STATUS_CODE_MAPPING[response.status];
export const createAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    let isRefreshing = false;
    let refreshPromise: Promise<string> | null = null;

    api.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            let token: any;

            try {
                token = await authService.getAccessToken();
            } catch (error) {
                console.error('Error getting access token:', error);
                redirect('/error')
            }

            if (token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
    error => {
        console.error('Error getting to page', error);
        redirect('/error')
    });

    api.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            if (error.response?.status === StatusCodes.UNAUTHORIZED) {
                // const originalRequest = error.config;
                //
                // if (!isRefreshing) {
                //     isRefreshing = true;
                //
                //     try {
                //         const newToken = await authService.refreshToken();
                //         authService.setAccessToken(newToken);
                //
                //         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                //         return api(originalRequest);
                //     } catch (refreshError) {
                //         console.error('Token refresh failed:', refreshError);
                //         // Redirect to login or handle the situation based on your application's requirements
                //     } finally {
                //         isRefreshing = false;
                //     }
                // } else if (!refreshPromise) {
                //     refreshPromise = new Promise((resolve) => {
                //         authService.onTokenRefresh(() => {
                //             originalRequest.headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
                //             resolve(api(originalRequest));
                //         });
                //     });
                //
                //     return refreshPromise;
                // }
                redirect('/error')
            }

            if (error.response?.data && shouldDisplayError(error.response)) {
                store.dispatch(setError(error.response.data.toString()));
            }

            throw error;
        },
    );

    return api;
};
