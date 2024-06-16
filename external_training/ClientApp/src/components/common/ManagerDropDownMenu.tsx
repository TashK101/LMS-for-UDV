import { useState } from "react";
import {ApprovingManager, Participant} from "../../types/application";

interface ManagerDropDownMenuProps {
    managers: ApprovingManager[] | undefined,
    selectedManager: ApprovingManager | undefined,
    onClick: (value: string) => void
}
export function ManagerDropDownMenu({ managers, selectedManager, onClick }: ManagerDropDownMenuProps) {
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
                {selectedManager && getFullNames([selectedManager])}
            </button>
            {isOpen && (
                <div
                    id="dropdown"
                    className="cursor-pointer z-10 absolute mt-2 py-2 w-[300px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                >
                    <ul className="font-golos text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {managers?.map(manager => <li key={manager.appointmentId}><ManagerDropDownElement manager={manager} onClick={value => {
                            setIsOpen(false)
                            onClick(value)
                        }
                        } /> </li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

interface ManagerDropDownElementProps {
    manager: ApprovingManager,
    onClick: (value: string) => void
}

function ManagerDropDownElement({ manager, onClick }: ManagerDropDownElementProps) {
    return (
        <a className="block px-4 py-2 hover:text-color6 text-[#2B2A29]" onClick={() => onClick(manager.appointmentId)}>
            {getFullNames([manager])}
        </a>
    )
}
