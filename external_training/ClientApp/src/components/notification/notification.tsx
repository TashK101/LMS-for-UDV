export function Notification() : JSX.Element {
    return(
        <div className="p-[30px] bg-white rounded-[10px] shadow border border-stone-300 justify-center items-end gap-[100px] inline-flex">
            <div className="flex-col justify-center items-start gap-5 inline-flex">
                <div className="text-zinc-800 text-xl font-medium font-['Golos']">Статус заявки обновлён</div>
                <div className="text-zinc-800 text-xl font-normal font-['Golos']">Заявка: “Компьютерное зрение”</div>
            </div>
            <div className="flex-col justify-center items-start gap-5 inline-flex">
                <div className="text-zinc-500 text-base font-normal font-['Golos']">10.10.2023  15:05</div>
            </div>
        </div>
    )
}