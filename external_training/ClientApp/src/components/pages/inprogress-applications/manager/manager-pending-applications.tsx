import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useEffect} from "react";
import {fetchManagerPendingApplicationsAction} from "../../../../store/api-actions/api-actions.ts";
import {State} from "../../../../types/state.tsx";
import {CurrentApplicationType} from "../../my-applications/my-applications-page.tsx";
import {ApplicationCard} from "../../../application-card/application-card.tsx";
import {ApplicationStatus} from "../../../current-applications-utils/application-status.ts";

export function ManagerPendingApplications() {
    const getPendingApplications = (state: State) => state.managerPendingApplications
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchManagerPendingApplicationsAction());
    }, []);
    const pendingApplications = useAppSelector(getPendingApplications);
    const applications: CurrentApplicationType[] = []

    if (pendingApplications) {
        pendingApplications.forEach((app) => applications.push({
            id: app.trainingApplicationId,
            title: app.trainingTopic,
            date: new Date(app.createdAt),
            status: ApplicationStatus[app.status as keyof typeof ApplicationStatus],
            comments_count: app.commentsCount,
        }))
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