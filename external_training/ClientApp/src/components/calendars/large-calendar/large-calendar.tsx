import CalendarTitle from "./title/calendar-title.tsx";
import CalendarField from "./field/calendar-field.tsx";
import {useState} from "react";
import LeftCalendarArrowIcon from "./icons/left-calendar-arrow-icon.tsx";
import RightCalendarArrowIcon from "./icons/right-calendar-arrow-icon.tsx";

export default function LargeCalendar() {
    const [chosenMonth , setChosenMonth] = useState(() => (new Date().getMonth()));
    const [chosenYear, setChosenYear] = useState(() => (new Date().getFullYear()));
    const leftArrowClickHandler = () => {
        let currentMonth = chosenMonth;
        setChosenMonth((ps) => ps === 0 ? 11 : ps - 1);
        if (currentMonth === 0) {
            setChosenYear((ps) => ps - 1)
        }
    }

    const rightArrowClickHandler = () => {
        let currentMonth = chosenMonth;
        setChosenMonth((ps) => ps === 11 ? 0 : ps + 1);
        if (currentMonth === 11) {
            setChosenYear((ps) => ps + 1)
        }
    }

    return (
        <div>
            <CalendarTitle chosenMonth={chosenMonth} setChosenMonth={setChosenMonth} chosenYear={chosenYear} setChosenYear={setChosenYear}/>
            <div className="flex justify-between">
                <button className="m-4 w-[40px] hover:text-[#898989]" onClick={leftArrowClickHandler}>
                    <LeftCalendarArrowIcon className={""}/>
                </button>
                <CalendarField chosenYear={chosenYear} chosenMonth={chosenMonth}/>
                <button className="m-4 w-[40px] hover:text-[#898989]" onClick={rightArrowClickHandler}>
                    <RightCalendarArrowIcon className="float-right"/>
                </button>
            </div>
        </div>
    );
}