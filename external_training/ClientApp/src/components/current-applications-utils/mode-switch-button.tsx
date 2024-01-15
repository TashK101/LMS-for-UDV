import clsx from "clsx";
import {CheckMarkIcon} from "./icons/checkmark-icon.tsx";
import React from "react";

type ModeSwitchButtonProps = {
    contentMode: boolean;
    setContentMode: React.Dispatch<React.SetStateAction<boolean>>;
    leftPartText: string;
    rightPartText: string;
    className?: string;
}

export function ModeSwitchButton({contentMode, setContentMode, leftPartText, rightPartText, className} : ModeSwitchButtonProps) {
    const selectedButtonStyle = "bg-[#FFEDCF] hover:bg-[#FFCE80]"
    const unselectedButtonStyle = "hover:bg-[#FFCE80]"
    const historyModeButtonStyle = "flex py-[12px] px-[24px]  hover:bg-[#C9C9C7]"

    return (
        <div className={clsx(className,"flex")}>
            <button
                onClick={() => (setContentMode((prev) => !prev))}
                className={clsx(
                    contentMode ? unselectedButtonStyle : selectedButtonStyle,
                    historyModeButtonStyle,
                    "border-2 rounded-l-full")}
                disabled={!contentMode}>
                <CheckMarkIcon className={clsx(contentMode ? "hidden" : "", "mr-[8px]")}/>
                {leftPartText}
            </button>
            <button
                onClick={() => (setContentMode((prev) => !prev))}
                className={clsx(
                    contentMode ? selectedButtonStyle : unselectedButtonStyle,
                    historyModeButtonStyle,
                    "border-y-2 border-r-2 rounded-r-full")}
                disabled={contentMode}>
                {rightPartText}
                <CheckMarkIcon className={clsx(contentMode ? "" : "hidden", "ml-[8px]")}/>
            </button>
        </div>
    )
}