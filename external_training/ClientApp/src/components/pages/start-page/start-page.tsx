import {Zoom} from "react-awesome-reveal";
import {LogoUDV} from "../../../icons/logo-with-udv";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ApplicationPaths} from '../../api-authorization/ApiAuthorizationConstants';
import authService from '../../api-authorization/AuthorizeService';

export function StartPage() : JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await authService.isAuthenticated();

            setTimeout(() => {
                if (isAuthenticated) {
                    navigate('/inprogress_applications');
                } else {
                    navigate(ApplicationPaths.Login);

                }
            }, 2500);
        };

        checkAuthentication();
    }, []);
    return (
    <div className="w-screen h-screen bg-amber-500 justify-center items-center inline-flex">
        <Zoom duration={2000}>
            <div className="w-[495px] h-[483px] relative bg-amber-500 rounded-[20px] shadow flex-col justify-center items-center flex">
                <div className="left-[165px] top-[130px]">
                    <LogoUDV/>
                </div>
            </div>
        </Zoom>
</div>)
}
