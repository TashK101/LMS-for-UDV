import {Notification} from "../../notification/notification";
import {Header} from "../../header/header";

export function NotificationsPage() : JSX.Element {
    return(
        <div className="w-full h-[832px] relative bg-white">
            <div className="left-[203px] top-[234px] absolute flex-col justify-start items-start gap-[30px] inline-flex">
                <Notification/>
                <Notification/>
            </div>
            <div className="left-[203px] top-[150px] absolute text-zinc-800 text-[32px] font-semibold font-['Golos'] tracking-wider">Уведомления</div>
            <Header/>
        </div>
    )
}