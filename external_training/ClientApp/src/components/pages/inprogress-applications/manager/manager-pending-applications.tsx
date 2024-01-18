import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useEffect} from "react";
import {fetchManagerPendingApplicationsAction} from "../../../../store/api-actions/api-actions.ts";
import {State} from "../../../../types/state.tsx";
import {
    ApplicationsStatusTrans,
    CurrentApplicationType
} from "../../current-applications/current-applications-page.tsx";
import {ApplicationCard} from "../../../current-applications-utils/application-card.tsx";

export function ManagerPendingApplications() {
    const getPendingApplications = (state: State) => state.managerPendingApplications
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchManagerPendingApplicationsAction());
    }, []);
    const pendingApplications = useAppSelector(getPendingApplications);
    const applications: CurrentApplicationType[] = []

    if (pendingApplications) {
        for (let i = 0; i < pendingApplications.length; i++) {
            let trAppl = pendingApplications[i];
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
    return (
        <div className={"flex justify-center mx-[125px] mt-[30px]"}>
            <div className={"flex flex-wrap w-[1185px]"}>
                {applications.map((appl, i) => (
                    <ApplicationCard key={i} application={appl}/>
                ))}
            </div>
        </div>
    )
}