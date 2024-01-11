import { Route, Routes } from 'react-router-dom';
import './custom.css';
import {LoadingPage} from "./components/pages/loading-page/loading-page";
import {SignInErrorPage} from "./components/pages/test-page/test-page";

export default App;

function App() : JSX.Element {
    return (
            <Routes>
                <Route
                    path={'/'}
                    element={<LoadingPage/>}
                />
                <Route
                    path={'/test'}
                    element={<SignInErrorPage/>}
                />
            </Routes>
    );
}

