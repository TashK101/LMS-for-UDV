type DropDownMenuElementProps = {
    elementLabel: string;
}
export default function DropDownMenuElement({elementLabel} : DropDownMenuElementProps) : JSX.Element {
    return (
        <div className="self-stretch h-14 flex-col justify-start items-start flex hover:bg-[#EDEDED]">
            <div className="self-stretch h-14 px-3 py-2 justify-start items-center gap-3 inline-flex">
                <div className="w-6 h-6 relative" />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div className="self-stretch text-zinc-900 text-base font-normal font-['Golos']">{elementLabel}</div>
                </div>
            </div>
        </div>
    );
}