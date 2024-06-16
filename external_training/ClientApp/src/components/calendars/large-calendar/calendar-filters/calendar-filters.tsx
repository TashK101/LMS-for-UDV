import './calendar-filters.css'
import React, {useState} from "react";
import DownSelectArrowIcon from "../icons/down-select-arrow-icon.tsx";
import clsx from "clsx";
import {Autocomplete, createStyles, makeStyles, Popper, TextField} from "@mui/material";
import {Tag} from "reactstrap";

type CalendarFiltersProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalendarFilters({isVisible, setIsVisible}: CalendarFiltersProps): JSX.Element {
    const [employee, setEmployee] = useState<string>(() => ' ');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(() => false);

    const baseDropdownClassName = clsx(
        'flex items-center justify-between w-full h-[42px] px-[16px]',
        'border-[1px] border-[#79747E] rounded-[4px] text-[#49454F]',
        'cursor-pointer hover:bg-gray-100');

    const firstDropdownClassName = clsx(baseDropdownClassName, {
        'border-[#C27800] border-[2px]': isDropdownOpen,
        'border-[2px] border-[#79747E]': !isDropdownOpen,
    });
    const hacndleDropdownClick = () => setIsDropdownOpen((prevState) => !prevState);


    const visibility = isVisible ? 'calendar-filters_visible' : 'calendar-filters_hidden';
    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();


        setIsVisible((prevState) => !prevState);
    }
    const options = ['Корнилов Геннадий Константинович', 'Евтущенко Петр Сергеевич', 'Мамонтова Жанна Юрьевна', 'Угаров Юрий Витальевич', 'Путин Владимир Владимирович']

    return (
        <>
            <div
                className={`${isVisible ? 'visible' : 'hidden'} left-0 w-screen h-screen fixed top-0 backdrop-opacity-10 backdrop-invert bg-black/30 z-[20]`}
                onClick={() => setIsVisible((prevState) => !prevState)}/>
            <div className={`calendar-filters ${visibility}`}>
                <form className='calendar-filters__form' onSubmit={handleSubmit}>
                    <div className='gap-[32px] flex flex-column'>
                        <div className='flex flex-column gap-[20px]'>
                            Сотрудник
                            <Autocomplete
                                style={{width: '300px'}}
                                options={options.toSorted()}
                                classes={{
                                    option: 'option-test',
                                    paper: 'paper-test'
                                }}
                                renderInput={(params) => {
                                    return (
                                        <div ref={params.InputProps.ref} key={params.id} className='border-[20px]'>
                                            <input
                                                id='pets-lists'
                                                type='text'
                                                // placeholder='Начните печатать...'
                                                style={{
                                                    // border: "1px solid #cccccc",
                                                    padding: "10px",
                                                    width: "100%",

                                                }}
                                                {...params.inputProps}
                                            />
                                        </div>
                                    );
                                }}
                                // renderOption={(option, state) => {
                                //     return (
                                //         <div onClick={(event) => option.} className='p-[16px] hover:cursor-pointer hover:bg-blue-300'>
                                //             {state}
                                //         </div>
                                //     );
                                // }}
                            ></Autocomplete>

                            {/*<div>*/}
                            {/*    <div*/}
                            {/*        onClick={hacndleDropdownClick}*/}
                            {/*        className={firstDropdownClassName}>*/}
                            {/*        <p>{employee}</p>*/}
                            {/*        <DownSelectArrowIcon/>*/}
                            {/*    </div>*/}
                            {/*    {isDropdownOpen &&*/}
                            {/*        <div*/}
                            {/*            className='bg-white border-[#C27800] border-[1px] w-[300px] shadow-md py-[8px] absolute cursor-pointer max-h-[300px] overflow-auto'>*/}
                            {/*            {options.map((option) => (*/}
                            {/*                <div key={option} className='px-[16px] py-[8px] hover:bg-[#FFEDCF]'>*/}
                            {/*                    {option}*/}
                            {/*                </div>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    }*/}
                            {/*</div>*/}
                        </div>
                        <div className='flex flex-column gap-[20px]'>
                            Формат
                            <div className='w-[300px] h-[42px] bg-blue-500'></div>
                        </div>
                    </div>
                    <button className='calendar-filters__submit'>Сохранить</button>
                </form>
            </div>
        </>
    );
}

export default CalendarFilters;
