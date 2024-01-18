import { useState } from "react";
import { Manager } from "../../types/manager";

interface DropDownMenuProps {
    managers: Manager[] | undefined,
    selectedManager: Manager | undefined,
    onClick: (value: string) => void
}
export function DropDownMenu({ managers, selectedManager, onClick }: DropDownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                id="dropdownDefaultButton"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="font-golos font-normal 
                text-base placeholder:text-color3 
                w-full max-w-sm 
                outline-0 border-[1px] border-color2 rounded 
                h-[56px] p-[16px]
                focus:border-color6
                "
            >
                {selectedManager?.fullName}
            </button>
            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 absolute mt-2 py-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                >
                    <ul className="font-golos text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {managers?.map(manager => <li><DropDownElement manager={manager} onClick={value => {
                            setIsOpen(false)
                            onClick(value)
                        }
                        } key={manager.managerId} /> </li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

interface DropDownElementProps {
    manager: Manager,
    onClick: (value: string) => void
}

function DropDownElement({ manager, onClick }: DropDownElementProps) {
    return (
        <a className="block px-4 py-2 hover:text-color6" onClick={() => onClick(manager.managerId)}>
            {manager.fullName}
        </a>
    )
}
