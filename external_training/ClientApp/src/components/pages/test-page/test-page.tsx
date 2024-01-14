import { JSX } from "react/jsx-runtime";
import DropDownMenuElement from './test-file-2';

export function SignInErrorPage() : JSX.Element {
    return (
        <body>
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

                    <div className="w-[430px] h-48 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="py-[5px] justify-center items-center gap-2.5 inline-flex">
                            <div className="w-[60px] h-[60px] p-2.5 bg-orange-100 rounded-[100px] border border-amber-500 justify-center items-center flex">
                                <div className="w-10 h-10 text-center text-zinc-800 text-base font-medium font-['Golos'] leading-normal tracking-tight">ЛЛ</div>
                            </div>
                            <div className="flex-col justify-center items-start gap-2.5 inline-flex">
                                <div className="text-center text-zinc-800 text-xl font-normal font-['Golos']">Лина Линова</div>
                                <div className="text-zinc-500 text-base font-normal font-['Golos']">25.10.2023</div>
                            </div>
                        </div>
                        <div className="px-[30px] py-5 bg-white rounded-[5px] shadow border border-stone-300 flex-col justify-center items-end gap-2.5 flex">
                            <div className="w-[370px] text-zinc-800 text-xl font-normal font-['Golos']">Подойдёт ли курс, заточенный под обучение именно технологии распознавания лиц?</div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
