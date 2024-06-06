import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, {Calendar, Day, DayRange} from '@hassanmojab/react-modern-calendar-datepicker';
import React, {useState} from "react";
import clsx from "clsx";
import {customLocale} from "./custom-locale.ts";
import {DateFilterOption} from "../../date-filter/date-filter.tsx";
import {getMonthEdgesByDate, getWeekEdgesByOneDate} from "../calendar-utils/date-utils.ts";

type SmallCalendarDatePickerProps = {
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    firstDate?: Date;
    secondDate?: Date;
    className?: string;
}

type SmallCalendarSingleDatepickerProps = {
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    className?: string;
    inRangeFrom: boolean;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
}

type SmallCalendarMonthAndWeekPickerProps = {
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    className?: string;
    variant: DateFilterOption.Month | DateFilterOption.Week;
}

export function SmallCalendarDatePicker({
                                            setFirstSelectedDate,
                                            setSecondSelectedDate,
                                            className,
                                            firstDate,
                                            secondDate
                                        }: SmallCalendarDatePickerProps) {
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: firstDate ? {
            year: firstDate.getFullYear(),
            month: firstDate?.getMonth() + 1,
            day: firstDate?.getDate(),
        } : null,
        to: secondDate ? {
            year: secondDate.getFullYear(),
            month: secondDate?.getMonth() + 1,
            day: secondDate?.getDate(),
        } : null,
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

    return <Calendar
        value={selectedDayRange}
        onChange={onChangeHandler}
        locale={customLocale}
        colorPrimary={"#F59D0E"}
        colorPrimaryLight={"#FFEDCF"}
        slideAnimationDuration={"0.15s"}
        calendarClassName={clsx("font-normal [&_abbr]:no-underline border-solid border-[#C9C9C7] border-2", className)}
        calendarRangeStartClassName={"text-black"}
        calendarRangeBetweenClassName={"text-black"}
        calendarRangeEndClassName={"text-black"}
    />;
}

export function SmallCalendarSingleDatePickerWithInput({
                                                           setSelectedDate,
                                                           className,
                                                           inRangeFrom,
                                                           minDate,
                                                           maxDate,
                                                       }: SmallCalendarSingleDatepickerProps) {

    const [selectedDateLocal, setSelectedDateLocal] = useState<Day>()
    // @ts-ignore
    const minDateObj: Day = minDate ? {
        year: minDate?.getFullYear(),
        month: minDate?.getMonth() + 1,
        day: minDate?.getDate()
    } : undefined;

    // @ts-ignore
    const maxDateObj: Day = maxDate ? {
        year: maxDate?.getFullYear(),
        month: maxDate?.getMonth() + 1,
        day: maxDate?.getDate(),
    } : undefined;

    const onChangeHandler = (newVal: Day) => {
        if (newVal) {
            setSelectedDate(() => customLocale.toNativeDate(newVal));
        }
        setSelectedDateLocal(() => newVal);
    }

    const renderDate = selectedDateLocal ? new Date(selectedDateLocal.year, selectedDateLocal.month - 1, selectedDateLocal.day).toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    }).replace(" г.", "") : "";

    const renderCustomInput = ({ref}: { ref: any }) => (
        <input
            readOnly
            ref={ref}
            placeholder={inRangeFrom ? "От" : "До"}
            value={selectedDateLocal ? `${inRangeFrom ? "с" : "по"} ${renderDate}` : ""}
            className="font-normal w-[170px] placeholder:text-black text-center focus:border-[0px] text-lg h-[40px] px-1 rounded-xl text-black hover:shadow-inner hover:shados-xl bg-[#D9D9D9]" // a styling class
        />
    )

    return <DatePicker
        minimumDate={minDate ? minDateObj : undefined}
        maximumDate={maxDate ? maxDateObj : undefined}
        value={selectedDateLocal}
        onChange={onChangeHandler}
        locale={customLocale}
        colorPrimary={"#F59D0E"}
        colorPrimaryLight={"#FFEDCF"}
        slideAnimationDuration={"0.15s"}
        renderInput={renderCustomInput}
        wrapperClassName={clsx("relative z-[1]", className)}
        calendarRangeStartClassName={"text-black"}
        calendarRangeBetweenClassName={"text-black"}
        calendarRangeEndClassName={"text-black"}/>;
}

export function SmallCalendarMonthAndWeekPicker({
                                                    className,
                                                    setFirstSelectedDate,
                                                    setSecondSelectedDate,
                                                    variant
                                                }: SmallCalendarMonthAndWeekPickerProps) {
    const [selectedDateLocal, setSelectedDateLocal] = useState<Day>()
    const onChangeHandler = (newVal: Day) => {
        if (newVal) {
            if (variant === DateFilterOption.Week) {
                const weekEdges = getWeekEdgesByOneDate(customLocale.toNativeDate(newVal));
                setFirstSelectedDate(() => weekEdges.weekStarts);
                setSecondSelectedDate(() => weekEdges.weekEnds);
            } else {
                const monthEdges = getMonthEdgesByDate(customLocale.toNativeDate(newVal));
                setFirstSelectedDate(() => monthEdges.monthStarts);
                setSecondSelectedDate(() => monthEdges.monthEnds);
            }
        }
        setSelectedDateLocal(() => newVal);
    }

    return <Calendar
        value={selectedDateLocal}
        onChange={onChangeHandler}
        locale={customLocale}
        colorPrimary={"#F59D0E"}
        colorPrimaryLight={"#FFEDCF"}
        slideAnimationDuration={"0.15s"}
        calendarClassName={clsx("font-normal [&_abbr]:no-underline border-solid border-[#C9C9C7] border-2", className)}
        calendarRangeStartClassName={"text-black"}
        calendarRangeBetweenClassName={"text-black"}
        calendarRangeEndClassName={"text-black"}/>;
}