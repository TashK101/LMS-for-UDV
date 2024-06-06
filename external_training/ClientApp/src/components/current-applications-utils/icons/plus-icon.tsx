import {UniversalClassAndChildrenProps} from "../../calendars/calendar-utils/universal-props.ts";
import clsx from "clsx";

export function PlusIcon({className}: UniversalClassAndChildrenProps) {
    return (
        <svg
            className={clsx("", className)}
            width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7.25H6.75V12.5H5.25V7.25H0V5.75H5.25V0.5H6.75V5.75H12V7.25Z" fill="currentColor"/>
        </svg>
    )
}