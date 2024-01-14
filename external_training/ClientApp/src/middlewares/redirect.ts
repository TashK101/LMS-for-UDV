import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../history-route/browser-history';
import {Middleware} from 'redux';
import {systemProcess} from '../store/reducer';

type Reducer = ReturnType<typeof systemProcess.reducer>
export const redirect: Middleware<unknown, Reducer> =
    () =>
        (next) =>
            (action: PayloadAction<string>) => {
                if (action.type === 'app/redirectToRoute') {
                    if (action.payload === '/back') {
                        browserHistory.back();
                    } else {
                        browserHistory.push(action.payload);
                    }
                }
                return next(action);
            };
