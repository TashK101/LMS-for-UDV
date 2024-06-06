import {HeaderAvatar} from "../avatar/header-avatar";
import {Bell} from "../../icons/bell";
import {Letter} from "../../icons/letter";
import {Logo} from "../../icons/logo";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchStartConfigAction} from "../../store/api-actions/api-actions";
import {getfullName, getIsDataLoading, getRole} from "../../store/system-process/system-getters";
import DropDownMenu from "../drop-down-menu/drop-down-menu";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {useNavigate} from "react-router-dom";

export function Header () : JSX.Element {
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = 1;
    useEffect(() => {
        dispatch(fetchStartConfigAction());
    }, []);

    const role = useAppSelector(getRole);
    const fullName = useAppSelector(getfullName);
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag && (!role && !fullName))
        return <LoadingPage/>
    else
    return (
        <div className="w-full relative top-0 left-0">
            <div className="w-full h-[80px] inline-flex relative bg-white shadow">
                <div className="w-1/2 px-[30px]">
                    <Logo/>
                </div>
                <div className="w-1/2 px-[50px] h-full">
                    <div className="flex justify-end items-center gap-[8px] h-full">
                        <button className="w-[74px] h-full justify-center items-center inline-flex hover:bg-[#E4E4E3]" onClick={() => navigate('/notifications', {state: userId})}>
                            <Bell/>
                        </button>

                        {role !== 'User' && <button className="w-[74px] h-full justify-center items-center inline-flex hover:bg-[#E4E4E3]" onClick={() => navigate('/inprogress_applications')}>
                            <Letter/>
                        </button> }
                        <button className="w-[74px] h-full" onClick={() => setIsMenuVisible(!isMenuVisible)}><HeaderAvatar userFullName={fullName}/></button>
                    </div>
                </div>
            </div>
            {<DropDownMenu isVisible={isMenuVisible}/>}
        </div>
    )
}