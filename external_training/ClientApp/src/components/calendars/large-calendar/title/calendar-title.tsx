import ChooseButton from "./choose-button.tsx";
import React from "react";
import CalendarFiltersButton from "../calendar-filters/calendar-filters-button.tsx";

type CalendarTitleProps = {
    chosenMonth: number;
    chosenYear: number;
    setChosenMonth: React.Dispatch<React.SetStateAction<number>>;
    setChosenYear: React.Dispatch<React.SetStateAction<number>>;
    setIsFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const monthsOps = [
    {
        value: 0,
        label: "Январь",
    },
    {
        value: 1,
        label: "Февраль"
    },
    {
        value: 2,
        label: "Март"
    },
    {
        value: 3,
        label: "Апрель"
    },
    {
        value: 4,
        label: "Май"
    },
    {
        value: 5,
        label: "Июнь"
    },
    {
        value: 6,
        label: "Июль"
    },
    {
        value: 7,
        label: "Август"
    },
    {
        value: 8,
        label: "Сентябрь"
    },
    {
        value: 9,
        label: "Октябрь"
    },
    {
        value: 10,
        label: "Ноябрь"
    },
    {
        value: 11,
        label: "Декабрь"
    }
]

export default function CalendarTitle({chosenMonth, chosenYear, setChosenMonth, setChosenYear, setIsFiltersVisible} : CalendarTitleProps) {
    const yearsOps = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i > currentYear - 12; i--) {
        yearsOps.push({
            label: i.toString(),
            value: i,
        });
    }

    return (
        <div className="flex items-center justify-between gap-[61px] py-[33px] pr-[67px] pl-[50px]">
            <div className="flex items-center gap-[61px]">
                <div className="flex items-center gap-[25px]">
                    <ChooseButton options={monthsOps} currentValue={chosenMonth} setCurrentValue={setChosenMonth}/>
                    <ChooseButton options={yearsOps} currentValue={chosenYear} setCurrentValue={setChosenYear}/>
                    <CalendarFiltersButton onClick={() => setIsFiltersVisible((prevState) => !prevState)}/>
                </div>
            </div>
            <div className="flex items-center gap-[40px]">
                <div className="h-8 flex items-center gap-[10px]">
                    <div className="w-[25px] h-[25px] bg-[#FFBB4B] rounded"></div>
                    <div>- курс утверждён</div>
                </div>
                <div className="h-8 flex items-center gap-[10px]">
                    <div className="w-[25px] h-[25px] bg-[#C9C9C7] rounded"></div>
                    <div>- курс ждёт оплату или договор</div>
                </div>
            </div>
        </div>
    );
}
