import {NotificationType} from "../../types/notifications";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {getApplication} from "../../store/system-process/system-getters";
import {toLocaleString} from "react-scripts";

type NotificationProps = {
    notification : NotificationType;
}

export function Notification({notification}: NotificationProps) : JSX.Element {
    const dateTime = new Date(notification?.createdAt);
    const dateTimeFormatted = dateTime.toLocaleString('ru', {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).replace('г. в', '')
    return(
        <button className="w-[615px] px-[50px] py-[30px] bg-[#FFFFFF] hover:bg-stone-50 rounded-[10px] shadow border-2 border-stone-300 hover:border-amber-500 justify-start items-start gap-[100px] inline-flex">
            <div className="w-full flex-col justify-center items-start gap-5 inline-flex">
                <div className="text-zinc-800 text-xl font-medium font-['Golos']">{notification?.text}</div>
                <div className="w-full flex-row justify-between items-start gap-5 inline-flex">
                    <div className="text-zinc-800 text-left text-xl font-normal font-['Golos']">{`Заявка: ${notification?.trainingTopic}`}</div>
                    <div className="text-zinc-500 text-base font-normal font-['Golos']">{dateTimeFormatted}</div>
                </div>
            </div>
        </button>
    )
}