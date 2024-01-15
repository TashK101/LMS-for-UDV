import { JSX } from "react/jsx-runtime";
import DropDownMenuElement from './test-file-2';
import {Comments} from "../../comments/comments";
import {CommentsType} from "../../../types/comments";
import {useAppSelector} from "../../../hooks";
import {getApplication, getTest} from "../../../store/system-process/system-getters";
import {Header} from "../../header/header";


const comms : CommentsType = [
    {
        content: "aaaaaaaaaaaaaaaa пневмоноультра-микроскопический кремниевулканокониоз как твои дела пневмоноультра-микроскопический кремниевулканокониоз пневмоноультра-микроскопический кремниевулканокониоз",
        createdAt : "ddddd",
        userFullName : "A A A",
        userId : '0'
    },
    {
        content: "тестовые данные термогидроэлектростанция термогидроэлектростанция тестовых данных",
        createdAt : "ddgggdd",
        userFullName : "D D D",
        userId : '1'
    },
    {
        content: "Привет, да, конечно! Я буду рада тебя видеть на своём курсе, мы уже созвонились с юристами",
        createdAt : "ddgggdd",
        userFullName : "D D D",
        userId : '0'
    }
]

export function SignInErrorPage() : JSX.Element {
    const test = useAppSelector(getApplication)
    return (
        <>
            <div className="user-page">
                <header className="page-header user-page__head">
                    <h1 className="page-title user-page__title">Sign in</h1>
                </header>
                <div className="sign-in user-page__content">
                    <form action="sign-in-pages-directory/sign-in-error#" className="sign-in__form">
                        <div className="sign-in__message">
                            <p>Please enter a valid email address</p>
                        </div>
                        <div className="sign-in__fields">
                            <div className="sign-in__field sign-in__field--error">
                                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"/>
                                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                            </div>
                            <div className="sign-in__field">
                                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"/>
                                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                            </div>
                        </div>
                        <div className="sign-in__submit">
                            <button className="sign-in__btn" type="submit">Sign in</button>
                        </div>
                        <DropDownMenuElement elementLabel="Labeblblblblbllblblblbl" ></DropDownMenuElement>
                    </form>
                    <Comments comments={comms} authorId='0'/>
                    <div>{test?.trainingTopic}</div>
                    <Header/>
                </div>
            </div>
        </>
    );
}
