import './calendar-filters.css'
import React, {useState} from "react";
import AutocompleteField, {AutocompleteOptionObject} from "../../../autocomplete-field/autocomplete-field.tsx";

type CalendarFiltersProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    courseAuthorNames: string[];
    setFormat: React.Dispatch<React.SetStateAction<string>>;
    setUser: React.Dispatch<React.SetStateAction<string>>;
}

function CalendarFilters({
                             isVisible,
                             setIsVisible,
                             courseAuthorNames,
                             setUser,
                             setFormat
                         }: CalendarFiltersProps): JSX.Element {
    const [employee, setEmployee] = useState<AutocompleteOptionObject<number> | null>(null);
    const [courseFormat, setCourseFormat] = useState<string>('');
    const [autocompleteUniqueKey, setAutocompleteUniqueKey] = useState<string>(new Date().toISOString());

    const visibility = isVisible ? 'calendar-filters_visible' : 'calendar-filters_hidden';
    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        setUser(() => employee?.label ?? '');
        setFormat(() => courseFormat);
        setIsVisible((prevState) => !prevState);
    }

    const handleReset = (evt: React.FormEvent) => {
        evt.preventDefault();

        setEmployee(() => null);
        setAutocompleteUniqueKey(() => new Date().toISOString());
        setCourseFormat(() => '');
        setUser(() => '');
        setFormat(() => '');
        setIsVisible((prevState) => !prevState);
    }

    const autocompleteOptions = courseAuthorNames?.toSorted().map((name, index): AutocompleteOptionObject<number> => ({
        uniqueValue: index,
        label: name,
    }));

    return (
        <>
            <div
                className={`${isVisible ? 'visible' : 'hidden'} left-0 w-screen h-screen fixed top-0 backdrop-opacity-10 backdrop-invert bg-black/30 z-[20]`}
                onClick={() => setIsVisible((prevState) => !prevState)}/>
            <div className={`calendar-filters ${visibility}`}>
                <form className='calendar-filters__form' onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='gap-[32px] flex flex-column'>
                        <div className='flex flex-column gap-[20px]'>
                            Сотрудник
                            <AutocompleteField<number>
                                options={autocompleteOptions}
                                setOption={setEmployee}
                                uniqueKey={autocompleteUniqueKey}/>
                        </div>
                        <div className='flex flex-column gap-[20px]'>
                            Формат
                            <div>
                                {['Онлайн', 'Оффлайн'].map((radio, index) =>
                                    <div key={index} className="flex gap-[20px] items-center py-[14px]">
                                        <input
                                            type="radio"
                                            name={'Формат'}
                                            className='w-5 h-5 accent-amber-800 border-2'
                                            value={radio}
                                            checked={radio === courseFormat}
                                            onChange={(event) => setCourseFormat(event.target.value)}
                                        />
                                        <p className="font-golos text-color7 text-[16px] font-[400]">{radio}</p>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button className='calendar-filters__submit' type='submit'>Сохранить</button>
                        <button className='calendar-filters__reset' type='reset'>Сбросить фильтры</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CalendarFilters;
