import {Autocomplete} from "@mui/material";
import React, {useState} from "react";
import './calendar-filters.css';

export type AutocompleteOptionObject<T> = {
    label: string;
    uniqueValue: T;
}

type AutocompleteFieldProps<T> = {
    options: AutocompleteOptionObject<T>[];
    setOption: React.Dispatch<React.SetStateAction<AutocompleteOptionObject<T> | null>>;
    uniqueKey?: string;
}

function AutocompleteField<T>({options, setOption, uniqueKey = ''}: AutocompleteFieldProps<T>): JSX.Element {
    const [innerOptionInputValue, setInnerOptionInputValue] = useState<string>('');


    return (
        <Autocomplete
            key={uniqueKey}
            onChange={(_event, newOptionValue) => {
                setOption(() => newOptionValue);
            }}
            inputValue={innerOptionInputValue}
            onInputChange={(_event, newInputValue) => {
                setInnerOptionInputValue(() => newInputValue ?? '');
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            noOptionsText='Ничего не нашлось'
            style={{width: '100%'}}
            options={options}
            classes={{
                option: 'autocomplete-option',
                paper: 'autocomplete-paper'
            }}
            renderInput={(params) => {
                return (
                    <div ref={params.InputProps.ref} key={params.id}>
                        <input
                            id='pets-lists'
                            type='text'
                            style={{
                                padding: "10px",
                                width: "100%",
                                outline: 'none'
                            }}
                            {...params.inputProps}
                        />
                    </div>
                );
            }}
        ></Autocomplete>
    );
}

export default AutocompleteField;
