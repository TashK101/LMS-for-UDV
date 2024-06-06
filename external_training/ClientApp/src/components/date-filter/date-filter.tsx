import DatePickerFilterElement from "./date-picker-filter-element.tsx";
import DownSelectArrowIcon from "../calendars/large-calendar/icons/down-select-arrow-icon.tsx";
import React from "react";
import {useDateFilter} from "./use-date-filter.ts";
import {getMonthAndYearDateString} from "../calendars/calendar-utils/date-utils.ts";

type DateFilterProps = {
    setFirstSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setSecondSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    firstSelectedDate: Date | undefined;
    secondSelectedDate: Date | undefined;
}

export enum DateFilterOption {
    Week = 'Неделя',
    Month = 'Месяц',
    ItsPeriod = 'Свой период',
    AllPeriod = 'Весь период',
}

function DateFilter({
                        setFirstSelectedDate,
                        setSecondSelectedDate,
                        firstSelectedDate,
                        secondSelectedDate,
                    }: DateFilterProps) {
    const {
        handleFirstInputFieldClick,
        firstDropdownClassName,
        filterOption,
        firstDropdownOpen,
        handleFilterOptionClick,
        secondFieldVisible,
        handleSecondInputFieldClick,
        secondDropdownClassName,
        secondDropdownOpen
    } = useDateFilter({
        firstSelectedDate,
        secondSelectedDate,
        setFirstSelectedDate,
        setSecondSelectedDate
    })

    return (
        <div className='flex relative items-center gap-[18px] text-normal z-[1]'>
            <p>Показывать заявки за</p>
            <div>
                <div
                    onClick={handleFirstInputFieldClick}
                    className={firstDropdownClassName}>
                    {filterOption}
                    <DownSelectArrowIcon/>
                </div>
                {firstDropdownOpen &&
                    <div
                        className='bg-white border-[#C27800] border-[1px] w-max shadow-md py-[8px] absolute cursor-pointer'>
                        {Object.values(DateFilterOption).map((option) => (
                            <div key={option} className='p-[12px] hover:bg-[#FFEDCF]' onClick={handleFilterOptionClick}>
                                {option}
                            </div>
                        ))}
                    </div>
                }
            </div>

            {secondFieldVisible &&
                <div className='relative'>
                    <div
                        onClick={handleSecondInputFieldClick}
                        className={secondDropdownClassName}>
                        {filterOption === DateFilterOption.Month ?
                            <p>{getMonthAndYearDateString(firstSelectedDate)}</p> :
                            <p>{firstSelectedDate?.toLocaleDateString()} {firstSelectedDate ? '-' : ' '} {secondSelectedDate?.toLocaleDateString()}</p>}
                        <DownSelectArrowIcon/>
                    </div>
                    {secondDropdownOpen &&
                        <DatePickerFilterElement variant={filterOption}
                                                 setFirstSelectedDate={setFirstSelectedDate}
                                                 setSecondSelectedDate={setSecondSelectedDate}
                                                 firstDate={firstSelectedDate}
                                                 secondDate={secondSelectedDate}/>}
                </div>
            }
        </div>
    );
}

export default DateFilter;
