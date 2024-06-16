import {FilterOptionsIcon} from "../icons/filter-options-icon.tsx";

type CalendarFiltersButtonProps = {
    onClick: () => void;
}

function CalendarFiltersButton({onClick}: CalendarFiltersButtonProps) : JSX.Element {
    return (
        <button
            onClick={onClick}
            className='flex items-center gap-[22px] p-[10px] border-[1px] border-[#898989] rounded-lg text-[16px] h-10 hover:bg-[#FFEDCF] hover:cursor-pointer'>
            <FilterOptionsIcon />
            Другие фильтры
        </button>
    );
}

export default CalendarFiltersButton;
