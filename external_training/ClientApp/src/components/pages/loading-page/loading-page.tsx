import {LoadingOrange} from "../../../icons/loading-orange";

export function LoadingPage() : JSX.Element {
    return (
        <div className="w-screen h-screen bg-white justify-center items-center gap-2.5 inline-flex">
            <div className="flex-col justify-start items-center gap-[50px] inline-flex">
                <div className="justify-center items-center gap-2.5 inline-flex">
                    <div className="w-[400px] h-[400px] relative animate-[spin_6s_linear_infinite] flex justify-center items-center">
                        <LoadingOrange/>
                    </div>
                </div>
                <div className="justify-start items-center gap-2.5 inline-flex">
                   <h1 className="pl-[25px] text-center text-yellow-900 text-5xl font-semibold font-['Golos']">Загрузка...</h1>
                </div>
            </div>
        </div>
    )
}
