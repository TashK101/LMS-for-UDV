import {Notification} from "../../notification/notification";
import {HeaderAvatar} from "../../avatar/header-avatar";

export function NotificationsPage() : JSX.Element {
    return(
        <div className="w-full h-[832px] relative bg-white">
            <div className="left-[203px] top-[234px] absolute flex-col justify-start items-start gap-[30px] inline-flex">
                <Notification/>
                <Notification/>
            </div>
            <div className="left-[203px] top-[150px] absolute text-zinc-800 text-[32px] font-semibold font-['Golos'] tracking-wider">Уведомления</div>
            <div className="w-[43px] h-[42px] pl-[5px] pr-1 py-1 left-[50px] top-[148px] absolute bg-orange-100 rounded-[100px] justify-center items-center inline-flex">
                <div className="w-[34px] h-[34px] relative origin-top-left -rotate-180 flex-col justify-start items-start flex" />
            </div>
            <div className="w-[1280px] h-20 left-0 top-0 absolute bg-white shadow">
                <div className="p-5 left-[30px] top-[2px] absolute flex-col justify-center items-center gap-2.5 inline-flex" />
                <div className="left-[1107px] top-[13px] absolute justify-start items-start inline-flex">
                    <div className="w-[51px] h-[54px] p-2.5 justify-center items-center gap-2.5 flex" />
                </div>
                <HeaderAvatar userFullName={'sss ddd ggg'}/>
            </div>
        </div>
    )
}