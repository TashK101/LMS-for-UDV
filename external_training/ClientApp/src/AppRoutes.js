import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {LoadingPage} from "./components/pages/loading-page/loading-page";
import {SignInErrorPage} from "./components/pages/test-page/test-page";

const AppRoutes = [
    {
        index: true,
        element: <LoadingPage />
    },
    {
        path: '/counter',
        element: <Home />
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
    ...ApiAuthorzationRoutes
];

export default AppRoutes;