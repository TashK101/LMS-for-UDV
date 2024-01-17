import {Header} from "../../header/header.tsx";
import LargeCalendar from "../../calendars/large-calendar/large-calendar.tsx";
import {useAppSelector} from "../../../hooks";
import {getIsDataLoading} from "../../../store/system-process/system-getters";
import {LoadingPage} from "../loading-page/loading-page";


export function CalendarPage(): JSX.Element {
    const isDataLoading = useAppSelector(getIsDataLoading);
    if (isDataLoading)
        return (<LoadingPage/>)
    else
        return (
            <div>
                <Header/>
                <LargeCalendar/>
            </div>
        )
}