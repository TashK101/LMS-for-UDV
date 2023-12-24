import {useState} from "react";
import DropDownMenu from "./drop-down-menu";
import {clsx} from "clsx/clsx";

export default function Avatar() : JSX.Element {
    const [wasAvatarClicked, setWasAvatarClicked] = useState(false)
    return (
        <div className="flex items-center justify-center">
        <button className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-[#FFEDCF] border border-[#F59D0E] hover:drop-shadow-md transition-colors" onClick={() => {setWasAvatarClicked(!wasAvatarClicked)}}>BM</button>
            <DropDownMenu isVisible={wasAvatarClicked}></DropDownMenu>
        </div>
    );
}