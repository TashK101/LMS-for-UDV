import {NotificationType} from "../../types/notifications";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {getApplication} from "../../store/system-process/system-getters";

type NotificationProps = {
    notification : NotificationType | undefined;
}

export function Notification({notification}: NotificationProps) : JSX.Element {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(notification ? notification.trainingId : 1));
    }, []);
    const application = useAppSelector(getApplication);
    return(
        <button className="p-[30px] bg-white rounded-[10px] shadow border border-stone-300 justify-center items-end gap-[100px] inline-flex">
            <div className="flex-col justify-center items-start gap-5 inline-flex">
                <div className="text-zinc-800 text-xl font-medium font-['Golos']">{notification?.text}</div>
                <div className="text-zinc-800 text-xl font-normal font-['Golos']">{application?.trainingTopic}</div>
            </div>
            <div className="flex-col justify-center items-start gap-5 inline-flex">
                <div className="text-zinc-500 text-base font-normal font-['Golos']">{notification?.createdAt}</div>
            </div>
        </button>
    )
}