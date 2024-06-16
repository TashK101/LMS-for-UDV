import './admin-navigation-bar.css';
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import React from "react";
import {NavigationTabIcon} from "./icons/navigation-tab-icon.tsx";
import {AdminBarTab} from "./navigation-utils.ts";

type AdminNavigationBarProps = {
    navigationStatus: AdminBarTab,
    setFilterStatus: React.Dispatch<React.SetStateAction<AdminBarTab>>;
    statusApplications: { [key in AdminBarTab]: CurrentApplicationType[] };
}

function AdminNavigationBar({
                                statusApplications,
                                setFilterStatus,
                                navigationStatus
                            }: AdminNavigationBarProps): JSX.Element {
    const handleNavigationChange = (evt: any) => {
        setFilterStatus(() => evt.target.value);
    }

    return (
        <div className='admin-navigation'>
            {Object.values(AdminBarTab).map((status, index) => {
                return <div key={status}>
                    <input
                        id={index.toString()} type="radio" name="radio" value={status}
                        onChange={handleNavigationChange}
                        className='hidden '/>
                    <label
                        htmlFor={index.toString()}
                        className={`admin-navigation__button ${status === navigationStatus ? 'admin-navigation__button_active' : ''}`}>
                        <div className='flex items-center gap-[32px]'>
                            <div className='w-[32px] h-[32px] flex items-center justify-center'>
                                <NavigationTabIcon variant={status}/>
                            </div>
                            <p>{status}</p>
                        </div>
                        <div
                            className='w-[26px] h-[35px] flex items-center justify-center text-[16px] font-normal rounded-[4px] leading-[19px] bg-[#FFEDCF]'>{statusApplications[status].length}
                        </div>
                    </label>

                </div>;
            })}
        </div>
    );
}

export default AdminNavigationBar;
