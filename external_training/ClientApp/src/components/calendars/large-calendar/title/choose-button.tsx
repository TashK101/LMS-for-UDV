import clsx from "clsx";
import Select, {DropdownIndicatorProps, components} from "react-select";
import React from "react";
import DownSelectArrowIcon from "../icons/down-select-arrow-icon.tsx";

type ChooseButtonProps = {
    className?: string;
    options: {
        value: number;
        label: string;
    }[]
    currentValue:number;
    setCurrentValue: React.Dispatch<React.SetStateAction<number>>
}

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
        <components.DropdownIndicator {...props}>
            <DownSelectArrowIcon className={"-mb-1 ml-2"}/>
        </components.DropdownIndicator>
    );
};

export default function ChooseButton({className, options, currentValue, setCurrentValue}: ChooseButtonProps) {
    let fullClassName = clsx(className,
        "flex items-center gap-2 border-[1px] border-[#898989] rounded-lg text-[16px] h-10 px-3 hover:bg-[#FFEDCF] hover:cursor-pointer")
    const getValue = () => {
        return options.find(c => c.value === currentValue);
    }

    const handleOnChange = (newValue: any) => {
        setCurrentValue(() => newValue.value);
    }

    return (
        <Select unstyled
                classNames={{
                    option: (state) => (
                        clsx("hover:bg-[#D9D9D9] p-[10px] hover:cursor-pointer",
                            state.isSelected ? "bg-[#FFEDCF]" : "")
                    ),
                    menuList: () => ("bg-white w-auto my-2 min-h-[528px] overflow-visible"),
                    menu: () => ("min-w-[145px] bg-white border-solid border-2 border-black rounded-lg"),
                    control: () => ("hover:cursor-pointer")
                }}
                className={fullClassName}
                isSearchable={false}
                isClearable={false}
                value={getValue()}
                onChange={handleOnChange}
                options={options}
            // @ts-ignore
                components={{DropdownIndicator}}
        ></Select>
    );
}