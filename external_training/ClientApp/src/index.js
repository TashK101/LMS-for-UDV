import 'bootstrap/dist/css/bootstrap.css';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import React, {useEffect} from 'react';
i
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {} from "./tailwind.css";
import {Provider} from "react-redux";
import {store} from "./store/store";
import browserHistory from "./history-route/browser-history";
import HistoryRouter from "./history-route/history-route";
import { ModalState } from './components/common/Modal';
import {useAppDispatch} from "./hooks";
import {fetchStartConfigAction} from "./store/api-actions/api-actions";

document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ModalState>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalState>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
