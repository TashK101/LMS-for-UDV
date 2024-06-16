import React, {useEffect, useState} from "react";
import {getMonthEdgesByDate, getWeekEdgesByOneDate} from "../calendars/calendar-utils/date-utils.ts";
import clsx from "clsx";
import {DateFilterOption} from "./date-filter.tsx";

type DateFilterController = {
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    firstSelectedDate: Date | undefined;
    secondSelectedDate: Date | undefined;
}

export function useDateFilter({
                                  firstSelectedDate,
                                  secondSelectedDate,
                                  setFirstSelectedDate,
                                  setSecondSelectedDate
                              }: DateFilterController) {
    const [filterOption, setFilterOption] = useState<DateFilterOption>(DateFilterOption.Month);
    const [firstDropdownOpen, setFirstDropdownOpen] = useState<boolean>(false);
    const [secondDropdownOpen, setSecondDropdownOpen] = useState<boolean>(false);

    const defaultWeekDates = getWeekEdgesByOneDate(new Date());
    const defaultMonthDates = getMonthEdgesByDate(new Date());

    if (firstSelectedDate && secondSelectedDate && secondDropdownOpen) {
        setSecondDropdownOpen(() => false);
    }

    useEffect(() => {
        if (filterOption === DateFilterOption.Week) {
            setFirstSelectedDate(() => defaultWeekDates.weekStarts);
            setSecondSelectedDate(() => defaultWeekDates.weekEnds);
        } else if (filterOption === DateFilterOption.Month) {
            setFirstSelectedDate(() => defaultMonthDates.monthStarts);
            setSecondSelectedDate(() => defaultMonthDates.monthEnds);
        }
    }, []);


    const secondFieldVisible = filterOption !== DateFilterOption.AllPeriod;
    const baseDropdownClassName = clsx(
        'flex items-center justify-between w-[256px] h-[56px] px-[16px]',
        'border-[1px] border-[#79747E] rounded-[4px] text-[#49454F]',
        'cursor-pointer hover:bg-gray-100');

    const firstDropdownClassName = clsx(baseDropdownClassName, {
        'border-[#C27800] border-[2px]': firstDropdownOpen,
        'border-[2px] border-[#79747E]': !firstDropdownOpen,
    });

    const secondDropdownClassName = clsx(baseDropdownClassName, {
        'border-[#C27800] border-[2px]': secondDropdownOpen,
        'border-[2px] border-[#79747E]': !secondDropdownOpen,
    });

    const handleFirstInputFieldClick = () => {
        setFirstSelectedDate(() => undefined);
        setSecondSelectedDate(() => undefined);
        setFirstDropdownOpen((prevState) => !prevState);
    }

    const handleSecondInputFieldClick = () => {
        setFirstSelectedDate(() => undefined);
        setSecondSelectedDate(() => undefined);
        setSecondDropdownOpen((prevState) => !prevState);
    }

    const handleFilterOptionClick = (ev: any) => {
        const option = ev.target.innerHTML;
        setFilterOption(() => option);

        if (option === DateFilterOption.Week) {
            setFirstSelectedDate(() => defaultWeekDates.weekStarts);
            setSecondSelectedDate(() => defaultWeekDates.weekEnds);
        } else if (option === DateFilterOption.ItsPeriod) {
            setSecondDropdownOpen(() => true);
        } else if (option === DateFilterOption.Month) {
            setFirstSelectedDate(() => defaultMonthDates.monthStarts);
            setSecondSelectedDate(() => defaultMonthDates.monthEnds);
        } else if (option === DateFilterOption.AllPeriod) {
            setFirstSelectedDate(() => undefined);
            setSecondSelectedDate(() => undefined);
        }
        setFirstDropdownOpen(() => false);
    }


    return {
        handleFirstInputFieldClick,
        firstDropdownClassName,
        filterOption,
        firstDropdownOpen,
        handleFilterOptionClick,
        secondFieldVisible,
        handleSecondInputFieldClick,
        secondDropdownClassName,
        secondDropdownOpen
    };
}