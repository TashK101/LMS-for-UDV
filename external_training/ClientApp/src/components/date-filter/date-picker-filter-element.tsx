import {
    SmallCalendarDatePicker,
    SmallCalendarMonthAndWeekPicker
} from "../calendars/small-calendar/small-calendar-datepicker.tsx";
import {DateFilterOption} from "./date-filter.tsx";
import React from "react";

type DatePickerFilterElementProps = {
    variant: DateFilterOption;
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    firstDate: Date | undefined;
    secondDate: Date | undefined;
}

function DatePickerFilterElement({
                                     variant,
                                     setFirstSelectedDate,
                                     setSecondSelectedDate,
                                     firstDate,
                                     secondDate
                                 }: DatePickerFilterElementProps) {
    return (
        <>
            {variant === DateFilterOption.Week &&
                <SmallCalendarMonthAndWeekPicker
                    setFirstSelectedDate={setFirstSelectedDate}
                    setSecondSelectedDate={setSecondSelectedDate}
                    variant={DateFilterOption.Week}
                    className='absolute'/>
            }
            {variant === DateFilterOption.Month &&
                <SmallCalendarMonthAndWeekPicker
                    setFirstSelectedDate={setFirstSelectedDate}
                    setSecondSelectedDate={setSecondSelectedDate}
                    variant={DateFilterOption.Month}
                    className='absolute'/>
            }
            {variant === DateFilterOption.ItsPeriod &&
                <SmallCalendarDatePicker
                    className='absolute top-[55px] left-[-1px]'
                    setFirstSelectedDate={setFirstSelectedDate}
                    setSecondSelectedDate={setSecondSelectedDate}
                    firstDate={firstDate}
                    secondDate={secondDate}/>
            }
        </>
    )
}

export default DatePickerFilterElement;
