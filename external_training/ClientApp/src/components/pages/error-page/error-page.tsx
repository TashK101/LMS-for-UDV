import {ErrorOrange} from "../../../icons/error-orange";

export function ErrorPage() : JSX.Element {
    return (
        <div className="w-screen h-screen bg-white justify-center items-center gap-2.5 inline-flex">
            <div className="flex-col justify-start items-center gap-[50px] inline-flex">
                <div className="justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[400px] h-[400px] relative flex justify-center items-center">
                        <ErrorOrange/>
                    </div>
                </div>
                <div className="justify-start items-center gap-2.5 inline-flex">
                    <h1 className="pl-[25px] text-center text-[#2B2A29] text-5xl font-semibold font-['Golos']">Страница не найдена...</h1>
                </div>
            </div>
        </div>
    )
}
