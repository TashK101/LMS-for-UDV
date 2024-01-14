import {configureStore} from '@reduxjs/toolkit';
import {systemProcess} from './system-process/system-process';
import {createAPI} from '../api/api';
import {redirect} from '../middlewares/redirect';

export const api = createAPI();

export const store = configureStore({
    reducer: systemProcess.reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api
            }
        }).concat(redirect)
});
