import {useState} from "react";
import clsx from "clsx";
import {PlusIcon} from "../../current-applications-utils/icons/plus-icon.tsx";
import {ApplicationCard} from "../../current-applications-utils/application-card.tsx";
import {ApplicationStatus} from "../../current-applications-utils/application-status.ts";
import {ModeSwitchButton} from "../../current-applications-utils/mode-switch-button.tsx";

const applications = [
    {
        title: "Компьютерное зрение, но с очень длинным названием",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.Approved,
        comments_count: 0
    },
    {
        title: "НААААААААААААААААААААААЗВАНИЕ",
        date: new Date(2024, 0, 32),
        status: ApplicationStatus.AwaitingContractAndPayment,
        comments_count: 4
    },
    {
        title: "Будующеведение",
        date: new Date(3000, 6, 9),
        status: ApplicationStatus.AwaitingManagerApproval,
        comments_count: 0
    },
    {
        title: "Компьютерное зрение",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.NotApproved,
        comments_count: 0
    },
    {
        title: "Компьютерное зрение",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.AwaitingManagerApproval,
        comments_count: 0
    },
    {
        title: "Компьютерное зрение",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.AwaitingManagerApproval,
        comments_count: 0
    },
    {
        title: "Компьютерное зрение",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.AwaitingManagerApproval,
        comments_count: 0
    },
    {
        title: "Компьютерное зрение",
        date: new Date(2023, 11, 13),
        status: ApplicationStatus.AwaitingManagerApproval,
        comments_count: 0
    }
]

export function CurrentApplicationsPage(): JSX.Element {
    const [historyMode, setHistoryMode] = useState(false);
    const newApplicationButtonStyle = clsx(
        "flex items-center py-[15px] px-[28px] border-[#F59D0E]",
        "bg-[#FFCE80] border-2 rounded-full font-semibold active:bg-[#C27800]",
        "hover:border-[#C27800] hover:drop-shadow-lg transition-colors");

    const filteredApplications = historyMode ?
        applications.filter((appl) => appl.status === ApplicationStatus.Approved) :
        applications.filter((appl) => appl.status !== ApplicationStatus.Approved);

    return (
        <div>
            <div className={"mx-[55px] mt-[40px] flex font-medium items-center justify-between"}>
                <ModeSwitchButton contentMode={historyMode}
                                  setContentMode={setHistoryMode}
                                  leftPartText={"Текущие заявки"}
                                  rightPartText={"История"}/>
                <button
                    className={newApplicationButtonStyle}>
                    <PlusIcon className={"mr-4"}/>
                    Новая заявка
                </button>
            </div>

            <div className={"flex justify-center mx-[125px] mt-[30px]"}>
                <div className={"flex flex-wrap w-[1185px]"}>
                    {filteredApplications.map((appl, i) => (
                        <ApplicationCard key={i} application={appl}/>
                    ))}
                </div>
            </div>
        </div>
    )
}