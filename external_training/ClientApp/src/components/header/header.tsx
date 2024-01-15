import {HeaderAvatar} from "../avatar/header-avatar";

export function Header () : JSX.Element {
    return (
        <div className="w-[1280px] h-20 relative bg-white shadow">
            <div className="p-5 left-[30px] top-[2px] absolute flex-col justify-center items-center gap-2.5 inline-flex" />
            <div className="left-[1107px] top-[13px] absolute justify-start items-start inline-flex">
                <div className="w-[51px] h-[54px] p-2.5 justify-center items-center gap-2.5 flex" />
            </div>
            <HeaderAvatar userFullName={'sss ddd ggg'}/>
        </div>
    )
}