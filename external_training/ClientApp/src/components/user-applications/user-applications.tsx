import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {fetchUserTrainingApplicationsAction} from "../../store/api-actions/api-actions.ts";
import {
    CurrentApplicationType
} from "../pages/my-applications/my-applications-page.tsx";
import {State} from "../../types/state.tsx";
import ApplicationCardsContainer from "../application-card/application-cards-container.tsx";
import {ApplicationStatus} from "../current-applications-utils/application-status.ts";

const getTrainingApplications = (state: State) => state.userTrainingApplications;

export function UserApplications() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserTrainingApplicationsAction());
    }, []);

    const trainingApplications = useAppSelector(getTrainingApplications);
    const applications: CurrentApplicationType[] = [];

    if (trainingApplications) {
        trainingApplications.forEach((app) =>
            applications.push({
                id: app.trainingApplicationId,
                title: app.trainingTopic,
                date: new Date(app.createdAt),
                status: ApplicationStatus[app.status as keyof typeof ApplicationStatus],
                comments_count: app.commentsCount,
            }));
    }

    return (
        <ApplicationCardsContainer applications={applications} showImportButtonInDatePicker showDatePicker/>
    )
}