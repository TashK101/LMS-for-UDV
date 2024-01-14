import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {LoadingPage} from "./components/pages/loading-page/loading-page";
import { ApplicationDetails } from "./components/pages/application-details/application-details"
import { mockApplicationDetails} from "./components/pages/application-details/mock";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <LoadingPage />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/application-details',
        element: <ApplicationDetails />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;