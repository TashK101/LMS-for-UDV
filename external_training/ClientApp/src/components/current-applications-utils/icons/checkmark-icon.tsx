import {UniversalClassAndChildrenProps} from "../../calendars/calendar-utils/universal-props.ts";
import clsx from "clsx";

export function CheckMarkIcon({className}: UniversalClassAndChildrenProps) {
    return (
        <svg
            className={clsx("mt-2", className)}
            width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.75012 8.12738L1.62262 4.99988L0.557617 6.05738L4.75012 10.2499L13.7501 1.24988L12.6926 0.192383L4.75012 8.12738Z"
                fill="currentColor"/>
        </svg>
    )
}