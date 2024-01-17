import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {StartPage} from "./components/pages/start-page/start-page";
import {SignInErrorPage} from "./components/pages/test-page/test-page";
import {NotificationsPage} from "./components/pages/notifications-page/notifications-page";
import {SettingsPage} from "./components/pages/settings/SettingsPage";
import {ApplicationPage} from "./components/pages/application/ApplicationPage";
import {ApplicationDetailsPage} from "./ApplicationDetailsPage";
import {CurrentApplicationsPage} from "./components/pages/current-applications/current-applications-page";
import LargeCalendar from "./components/calendars/large-calendar/large-calendar";

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
        path: '/calendar',
        element: <LargeCalendar />
    },
    {
        path: '/cur_applications',
        element: <CurrentApplicationsPage/>
    },
    {
        path: '/application_details/:id',
        element: <ApplicationDetailsPage/>
    },
    {
        path: '/settings',
        element: <SettingsPage/>
    },
    {
        path: '/details',
        element: <ApplicationPage/>
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;