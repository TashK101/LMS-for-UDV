import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from 'react-modern-calendar-datepicker';
import React, {useState} from "react";
import {DayRange} from "react-modern-calendar-datepicker";
import clsx from "clsx";
import {customLocale} from "./custom-locale.ts";

type SmallCalendarDatePickerProps = {
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    className?: string;
}

export default function SmallCalendarDatePicker({
                                                    setFirstSelectedDate,
                                                    setSecondSelectedDate,
                                                    className
                                                }: SmallCalendarDatePickerProps) {
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null
    });

    const onChangeHandler = (newVal: DayRange) => {
        if (newVal.from) {
            setFirstSelectedDate(() => customLocale.toNativeDate(newVal.from));
        }
        if (newVal.to) {
            setSecondSelectedDate(() => customLocale.toNativeDate(newVal.to));
        }
        setSelectedDayRange(() => newVal);
    }

    return (
        <Calendar
            value={selectedDayRange}
            onChange={onChangeHandler}
            locale={customLocale}
            colorPrimary={"#F59D0E"}
            colorPrimaryLight={"#FFEDCF"}
            slideAnimationDuration={"0.25s"}
            calendarClassName={clsx("font-normal [&_abbr]:no-underline border-solid border-[#C9C9C7] border-2", className)}
            calendarRangeStartClassName={"text-black"}
            calendarRangeBetweenClassName={"text-black"}
            calendarRangeEndClassName={"text-black"}
        />
    )
}