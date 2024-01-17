import {HeaderAvatar} from "../avatar/header-avatar";
import {Bell} from "../../icons/bell";
import {Letter} from "../../icons/letter";
import {Logo} from "../../icons/logo";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchStartConfigAction} from "../../store/api-actions/api-actions";
import {getfullName, getRole} from "../../store/system-process/system-getters";
import DropDownMenu from "../drop-down-menu/drop-down-menu";

export function Header () : JSX.Element {
    const [isBellHover, setIsBellHover] = useState<boolean>(false);
    const [isLetterHover, setIsLetterHover] = useState<boolean>(false);
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchStartConfigAction());
    }, []);

    const role = useAppSelector(getRole);
    const fullName = useAppSelector(getfullName);
    const userId = 1;

    return (
        <div className="w-full relative top-0 left-0">
            <div className="w-full h-[80px] inline-flex relative bg-white shadow">
                <div className="w-1/2 px-[30px]">
                    <Logo/>
                </div>
                <div className="w-1/2 px-[50px] py-[15px]">
                    <div className="flex justify-end items-center gap-[22px]">
                        <button onMouseEnter={() => setIsBellHover(true)} onMouseLeave={() => setIsBellHover(false)} onClick={() => navigate('/notifications', {state: userId})}><Bell isHover={isBellHover}/></button>
                        {role !== 'User' && <button onMouseEnter={() => setIsLetterHover(true)} onMouseLeave={() => setIsLetterHover(false)} onClick={() => navigate('/catalogapplications')}><Letter isHover={isLetterHover}/></button>}
                        <button onClick={() => setIsMenuVisible(!isMenuVisible)}><HeaderAvatar userFullName={fullName}/></button>
                    </div>
                </div>
            </div>
            {<DropDownMenu isVisible={isMenuVisible}/>}
        </div>
    )
}