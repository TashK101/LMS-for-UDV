import {Header} from "../../header/header.tsx";
import LargeCalendar from "../../calendars/large-calendar/large-calendar.tsx";


export function CalendarPage(): JSX.Element {
    return (
        <div>
            <Header/>
            <LargeCalendar/>
        </div>
    )
}