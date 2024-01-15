import {Zoom} from "react-awesome-reveal";
import {LogoUDV} from "../../../icons/logo-with-udv";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks";
import {fetchApplicationDetailsAction, fetchNotificationsAction} from "../../../store/api-actions/api-actions";

export function StartPage() : JSX.Element {
    const dispatch = useAppDispatch();
    dispatch(fetchApplicationDetailsAction(1))
    const navigate = useNavigate();
    useEffect(() => {
            setTimeout(() => {
                navigate('/test')
            }, 2500)
    }, [])
    return (
    <div className="w-screen h-screen bg-amber-500 justify-center items-center inline-flex">
        <Zoom duration={2000}>
            <div className="w-[495px] h-[483px] relative bg-amber-500 rounded-[20px] shadow flex-col justify-center items-center flex" onClick={() => dispatch(fetchNotificationsAction())}>
                <div className="left-[165px] top-[130px]">
                    <LogoUDV/>
                </div>
            </div>
        </Zoom>
</div>)
}