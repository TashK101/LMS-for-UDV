import {HeaderAvatar} from "../avatar/header-avatar";
import {Bell} from "../../icons/bell";
import {Letter} from "../../icons/letter";
import {Logo} from "../../icons/logo";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import authService from '../api-authorization/AuthorizeService'
import {jwtDecode} from "jwt-decode";

export function Header () : JSX.Element {
    const [isBellHover, setIsBellHover] = useState<boolean>(false);
    const [isLetterHover, setIsLetterHover] = useState<boolean>(false);
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    useEffect(() => {
        async function getToken() {
            const token = await authService.getAccessToken();
            setToken(token);
        }
        getToken();
    }, [])

    //const decoded = jwtDecode(token);
    console.log(token)

    return (
        <div className="w-full inline-flex relative bg-white shadow">
            <div className="w-1/2 px-[30px]">
                <Logo/>
            </div>
            <div className="w-1/2 px-[50px] py-[15px]">
                <div className="flex justify-end items-center gap-[22px]">
                    <button onMouseEnter={() => setIsBellHover(true)} onMouseLeave={() => setIsBellHover(false)} onClick={() => navigate('/notifications')}><Bell isHover={isBellHover}/></button>
                    <button onMouseEnter={() => setIsLetterHover(true)} onMouseLeave={() => setIsLetterHover(false)} onClick={() => navigate('/catalogapplications')}><Letter isHover={isLetterHover}/></button>
                    <HeaderAvatar userFullName={'A A A'}/>
                </div>
            </div>
        </div>
    )
}