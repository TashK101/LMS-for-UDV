import {ApplicationCard} from "./application-card.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {
    fetchUserTrainingApplicationsAction
} from "../../store/api-actions/api-actions.ts";
import {
    ApplicationsStatusTrans,
    CurrentApplicationType
} from "../pages/current-applications/current-applications-page.tsx";
import {State} from "../../types/state.tsx";

const getTrainingApplications = (state: State) => state.userTrainingApplications;

export function TrainingApplicationsField() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserTrainingApplicationsAction());
    }, []);

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

    // let filteredApplications = historyMode ?
    //     applications.filter((appl) => appl.status === ApplicationStatus.Approved) :
    //     applications.filter((appl) => appl.status !== ApplicationStatus.Approved);
    let filteredApplications = applications;

    // filteredApplications = firstSelectedDate ? filteredApplications.filter((appl) => new Date(appl.date.toDateString()) >= firstSelectedDate) : filteredApplications;
    // filteredApplications = secondSelectedDate ? filteredApplications.filter((appl) => new Date(appl.date.toDateString()) <= secondSelectedDate) : filteredApplications;


    return (
        <div className={"flex justify-center mx-[125px] mt-[30px]"}>
            <div className={"flex flex-wrap w-[1185px]"}>
                {filteredApplications.map((appl, i) => (
                    <ApplicationCard key={i} application={appl}/>
                ))}
            </div>
        </div>
    )
}