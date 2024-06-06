import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import {StartPage} from "./components/pages/start-page/start-page";
import {SignInErrorPage} from "./components/pages/test-page/test-page";
import {NotificationsPage} from "./components/pages/notifications-page/notifications-page";
import {SettingsPage} from "./components/pages/settings/SettingsPage";
import {ApplicationPage} from "./components/pages/application/ApplicationPage";
import {ApplicationDetailsPage} from "./ApplicationDetailsPage";
import {MyApplicationsPage} from "./components/pages/my-applications/my-applications-page";
import {CalendarPage} from "./components/pages/calendar-page/calendar-page";
import {InprogressApplicationPage} from "./components/pages/inprogress-applications/inprogress-application-page";
import {LoginMenu} from "./components/api-authorization/LoginMenu";
import {ErrorPage} from "./components/pages/error-page/error-page";

const AppRoutes = [
    {
        index: true,
        element: <StartPage />
    },
    {
        path: '/notifications',
        requireAuth: true,
        element: <NotificationsPage />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/test',
        requireAuth: true,
        element: <SignInErrorPage/>
    },
    {
        path: '/catalogapplications',
        requireAuth: true,
        element: <FetchData/>
    },
    {
        path: '/calendar',
        requireAuth: true,
        element: <CalendarPage/>
    },
    {
        path: '/my_applications',
        requireAuth: true,
        element: <MyApplicationsPage/>
    },
    {
        path: '/application_details/:id',
        requireAuth: true,
        element: <ApplicationDetailsPage/>
    },
    {
        path: '/settings',
        requireAuth: true,
        element: <SettingsPage/>
    },
    {
        path: '/details',
        requireAuth: true,
        element: <ApplicationPage/>
    },
    {
        path: '/inprogress_applications',
        requireAuth: true,
        element: <InprogressApplicationPage/>
    },
    {
        path: '/logout',
        element: <LoginMenu/>
    },
    {
        path: '/error',
        element: <ErrorPage/>
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;