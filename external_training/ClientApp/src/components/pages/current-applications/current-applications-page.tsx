import {useContext, useEffect, useState} from "react";
import clsx from "clsx";
import {PlusIcon} from "../../current-applications-utils/icons/plus-icon.tsx";
import {ApplicationCard} from "../../current-applications-utils/application-card.tsx";
import {ApplicationStatus} from "../../current-applications-utils/application-status.ts";
import {ModeSwitchButton} from "../../current-applications-utils/mode-switch-button.tsx";
import {
    fetchStartConfigAction,
    fetchUserTrainingApplicationsAction
} from "../../../store/api-actions/api-actions.ts";
import {Modal, ModalContext} from "../../common/Modal.tsx";
import {CreateApplicationPage} from "../create-application/CreateApplicationPage.tsx";
import {Header} from "../../header/header.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {State} from "../../../types/state.tsx";
import {getRole} from "../../../store/system-process/system-getters.tsx";


export const ApplicationsStatusTrans = {
    "Approved": ApplicationStatus.Approved,
    "NotApproved": ApplicationStatus.NotApproved,
    "AwaitingManagerApproval": ApplicationStatus.AwaitingManagerApproval,
    "CourseSelection": ApplicationStatus.CourseSelection,
    "AwaitingPayment": ApplicationStatus.AwaitingPayment,
    "AwaitingContractAndPayment": ApplicationStatus.AwaitingContractAndPayment,
    "AwaitingContract": ApplicationStatus.AwaitingContract
}

export type CurrentApplicationType = {
    id: number,
    title: string,
    date: Date,
    status: ApplicationStatus,
    comments_count: number
}

const getTrainingApplications = (state: State) => state.trainingApplications;

export function CurrentApplicationsPage(): JSX.Element {
    const [historyMode, setHistoryMode] = useState(false);
    const newApplicationButtonStyle = clsx(
        "flex items-center py-[15px] px-[28px] border-[#F59D0E]",
        "bg-[#FFCE80] border-2 rounded-full font-semibold active:bg-[#C27800]",
        "hover:border-[#C27800] hover:drop-shadow-lg transition-colors");

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserTrainingApplicationsAction());
        dispatch(fetchStartConfigAction);
    }, []);

    const role = useAppSelector(getRole);
    const trainingApplications = useAppSelector(getTrainingApplications);
    const applications: CurrentApplicationType[] = []

    if (trainingApplications) {
        for (let i = 0; i < trainingApplications.length; i++) {
            let trAppl = trainingApplications[i];
            applications.push({
                id: trAppl.trainingApplicationId,
                title: trAppl.trainingTopic,
                date: new Date(trAppl.createdAt),
                // @ts-ignore
                status: ApplicationsStatusTrans[trAppl.status],
                comments_count: trAppl.commentsCount,
            })
        }
    }

    const filteredApplications = historyMode ?
        applications.filter((appl) => appl.status === ApplicationStatus.Approved) :
        applications.filter((appl) => appl.status !== ApplicationStatus.Approved);

    const {modal, open, close} = useContext(ModalContext)

    return (
        <div>
            {modal &&
                <Modal onClose={close}>
                    <CreateApplicationPage onSubmit={close}/>
                </Modal>}

            <Header/>
            <div className={"mx-[55px] mt-[40px] flex font-medium items-center justify-between"}>
                <ModeSwitchButton contentMode={historyMode}
                                  setContentMode={setHistoryMode}
                                  leftPartText={"Текущие заявки"}
                                  rightPartText={"История"}/>
                <button
                    className={newApplicationButtonStyle}
                    onClick={open}>
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
