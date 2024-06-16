import CalendarCoursesTable from "./calendar-courses-table.tsx";
import TimelineCell from "./timeline-cell.tsx";
import {getDaysInMonth, getTimelineDays} from "../../calendar-utils/date-utils.ts";
import {EventType} from "../../../../types/event.tsx";

type CalendarFieldProps = {
    chosenYear: number;
    chosenMonth: number;
    events: EventType[];
    chosenUser: string;
    chosenFormat: string;
}

export default function CalendarField({chosenYear, chosenMonth, events, chosenUser, chosenFormat}: CalendarFieldProps) {
    const chosenDate = new Date(chosenYear, chosenMonth);
    const timelineDays = getTimelineDays(chosenDate);

    return (
        <div className="">
            <div className="flex justify-center">
                {timelineDays.map((weekDay, i) => (
                    <TimelineCell key={i} date={i + 1} weekDay={weekDay}/>
                ))}
            </div>
            <CalendarCoursesTable
                currentMonthMaxDate={getDaysInMonth(chosenDate)}
                chosenDate={chosenDate}
                events={events}
                chosenFormat={chosenFormat}
                chosenUser={chosenUser}
            />
        </div>
    );
}
