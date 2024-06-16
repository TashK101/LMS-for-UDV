import CalendarTitle from "./title/calendar-title.tsx";
import CalendarField from "./field/calendar-field.tsx";
import {useState} from "react";
import LeftCalendarArrowIcon from "./icons/left-calendar-arrow-icon.tsx";
import RightCalendarArrowIcon from "./icons/right-calendar-arrow-icon.tsx";
import CalendarFilters from "./calendar-filters/calendar-filters.tsx";
import {useAppSelector} from "../../../hooks";
import {State} from "../../../types/state.tsx";

export default function LargeCalendar() {
    const [filterMonth, setFilterMonth] = useState(() => (new Date().getMonth()));
    const [filterYear, setFilterYear] = useState(() => (new Date().getFullYear()));
    const [filterFormat, setFilterFormat] = useState<string>('');
    const [filterUser, setFilterUser] = useState<string>('');

    const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(() => false);
    const events = useAppSelector((state: State) => state.events);
    const allCourseAuthorNames = events.map((event) => event.userFullName)

    const leftArrowClickHandler = () => {
        let currentMonth = filterMonth;
        setFilterMonth((ps) => ps === 0 ? 11 : ps - 1);
        if (currentMonth === 0) {
            setFilterYear((ps) => ps - 1)
        }
    }

    const rightArrowClickHandler = () => {
        let currentMonth = filterMonth;
        setFilterMonth((ps) => ps === 11 ? 0 : ps + 1);
        if (currentMonth === 11) {
            setFilterYear((ps) => ps + 1)
        }
    }

    return (
        <div>
            <CalendarTitle
                chosenMonth={filterMonth}
                setChosenMonth={setFilterMonth}
                chosenYear={filterYear}
                setChosenYear={setFilterYear}
                setIsFiltersVisible={setIsFiltersVisible}/>
            <CalendarFilters
                isVisible={isFiltersVisible}
                setIsVisible={setIsFiltersVisible}
                courseAuthorNames={allCourseAuthorNames}
                setUser={setFilterUser}
                setFormat={setFilterFormat}/>
            <div className="flex justify-between">
                <button className="m-4 w-[40px] hover:text-[#898989]" onClick={leftArrowClickHandler}>
                    <LeftCalendarArrowIcon className={""}/>
                </button>
                <CalendarField
                    chosenYear={filterYear}
                    chosenMonth={filterMonth}
                    events={events}
                    chosenUser={filterUser}
                    chosenFormat={filterFormat}/>
                <button className="m-4 w-[40px] hover:text-[#898989]" onClick={rightArrowClickHandler}>
                    <RightCalendarArrowIcon className="float-right"/>
                </button>
            </div>
        </div>
    );
}