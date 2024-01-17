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
        <div className="w-full h-full relative bg-white">
            <Header/>
            <div className="pl-[100px] pt-[150px] pb-[50px] text-zinc-800 text-[32px] font-semibold font-['Golos'] tracking-wider">Уведомления</div>
            <div className="pl-[95px] flex-col justify-start items-start gap-[40px] inline-flex">
                {notifications.map((element) => <Notification key={element.createdAt} notification={element}/>)}
            </div>
        </div>
    )
}