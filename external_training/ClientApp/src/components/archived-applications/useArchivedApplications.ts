import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import {State} from "../../types/state.tsx";
import {ShortApplicationInfoType} from "../../types/short-application-info.tsx";
import {
    fetchAdminArchivedApplicationsAction,
    fetchUserArchivedApplicationsAction
} from "../../store/api-actions/api-actions.ts";
import {ApplicationStatus} from "../current-applications-utils/application-status.ts";

export function useArchivedApplications({adminModeArchive}: { adminModeArchive: boolean }) {
    const dispatch = useAppDispatch();
    const applications: CurrentApplicationType[] = [];
    let getArchivedApps: (state: State) => ShortApplicationInfoType[];

    useEffect(() => {
        if (adminModeArchive) {
            dispatch(fetchAdminArchivedApplicationsAction());
            getArchivedApps = (state: State) => state.adminArchivedApplications;
        } else {
            dispatch(fetchUserArchivedApplicationsAction());
            getArchivedApps = (state: State) => state.userArchivedApplications;
        }
    }, []);


    if (adminModeArchive) {
        getArchivedApps = (state: State) => state.adminArchivedApplications;
    } else {
        getArchivedApps = (state: State) => state.userArchivedApplications;
    }
    const archivedApplications = useAppSelector(getArchivedApps);


    if (archivedApplications) {
        archivedApplications.forEach((app) => {
            applications.push({
                id: app.trainingApplicationId,
                title: app.trainingTopic,
                date: new Date(app.createdAt),
                status: ApplicationStatus[app.status as keyof typeof ApplicationStatus],
                comments_count: app.commentsCount,
            })
        })
    }

    return {applications};
}