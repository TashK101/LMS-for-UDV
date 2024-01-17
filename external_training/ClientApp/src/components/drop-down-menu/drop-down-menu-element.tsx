import {useNavigate} from "react-router-dom";

type DropDownMenuElementProps = {
    elementLabel: string,
    path: string,
}
export default function DropDownMenuElement({elementLabel, path} : DropDownMenuElementProps) : JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="self-stretch h-14 flex-col justify-start items-start flex hover:bg-orange-100">
            <div className="self-stretch h-14 px-3 py-2 justify-start items-center gap-3 inline-flex">
                <div className="w-6 h-6 relative" />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <button className="text-zinc-900 text-base font-normal font-['Golos']" onClick={() => navigate(path)}>{elementLabel}</button>
                </div>
            </div>
        </div>
    );
}