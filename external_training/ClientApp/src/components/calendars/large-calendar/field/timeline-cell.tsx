import clsx from "clsx";
import {WeekDays} from "../../calendar-utils/enums.ts";

type TimelineCellProps = {
    date: number;
    weekDay: WeekDays;
}

export default function TimelineCell({date, weekDay}: TimelineCellProps) {
    const bgColor =
        weekDay === WeekDays.Saturday ||
        weekDay === WeekDays.Sunday
            ? "bg-[#FFCE80]" : "bg-[#FFE2B2]";

    return (
        <div className="w-[42px] items-center text-center text-sm">
            <div className={clsx(bgColor, "w-full p-2 border-b border-[#2B2A29]")}>
                <div>{date}</div>
                <div>{weekDay}</div>
            </div>
        </div>
    );
}
