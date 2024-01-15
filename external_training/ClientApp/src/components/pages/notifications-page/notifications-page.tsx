import {Notification} from "../../notification/notification";
import {Header} from "../../header/header";
import {useEffect} from "react";
import {fetchNotificationsAction} from "../../../store/api-actions/api-actions";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getNotifications} from "../../../store/system-process/system-getters";

export function NotificationsPage() : JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchNotificationsAction());
    }, []);
    const notifications = useAppSelector(getNotifications);
    return(
        <div className="w-full h-[832px] relative bg-white">
            <div className="left-[203px] top-[234px] absolute flex-col justify-start items-start gap-[30px] inline-flex">
                {notifications.map((element) => <Notification notification={element}/>)}
            </div>
            <div className="left-[203px] top-[150px] absolute text-zinc-800 text-[32px] font-semibold font-['Golos'] tracking-wider">Уведомления</div>
            <Header/>
        </div>
    )
}