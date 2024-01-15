import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {StartPage} from "./components/pages/start-page/start-page";
import {SignInErrorPage} from "./components/pages/test-page/test-page";
import {NotificationsPage} from "./components/pages/notifications-page/notifications-page";
import {ApplicationDetails} from "./components/application-details/application-details";

const AppRoutes = [
    {
        index: true,
        element: <StartPage />
    },
    {
        path: '/notifications',
        element: <NotificationsPage />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/test',
        element: <SignInErrorPage/>
    },
    {
        path: '/catalogapplications',
        element: <FetchData/>
    },
    {
        path: '/counter',
        element: <ApplicationDetails/>
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;