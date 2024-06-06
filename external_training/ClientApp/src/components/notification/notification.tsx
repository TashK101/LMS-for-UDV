import {NotificationType} from "../../types/notifications";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

    return(
            <button onClick={() => navigate('/application_details/'+notification.trainingApplicationId)} className="w-[847px] px-6 !py-5 border-b border-stone-300 justify-between items-start inline-flex hover:bg-[#FFEDCF]">
                <div className="flex-col justify-center items-start gap-2 inline-flex">
                    <div className="text-zinc-800 text-base font-semibold font-['Golos']">{notification?.text}</div>
                    <div className="text-zinc-800 text-base font-normal font-['Golos']">{`Заявка: ${notification?.trainingTopic}`}</div>
                </div>
                <div className="flex-col justify-center items-start gap-5 inline-flex">
                    <div className="text-zinc-500 text-sm font-normal font-['Golos']">{dateTimeFormatted}</div>
                </div>
            </button>
    )
}