import {State} from "../../../../types/state.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useEffect, useState} from "react";
import {fetchAdminPendingApplicationsAction} from "../../../../store/api-actions/api-actions.ts";
import {ApplicationStatus} from "../../../current-applications-utils/application-status.ts";
import ApplicationCardsContainer from "../../../application-card/application-cards-container.tsx";
import {CurrentApplicationType} from "../../my-applications/my-applications-page.tsx";
import AdminNavigationBar from "../../../admin-navigation-bar/admin-navigation-bar.tsx";
import {
    AdminBarTab,
    AdminTabsMapping,
    getFilteredApplications
} from "../../../admin-navigation-bar/navigation-utils.ts";


// HARDCODE! WIP

export function AdminPendingApplications() {
    const getPendingApplications = (state: State) => state.adminPendingApplications;
    const [navigationStatus, setNavigationStatus] = useState<AdminBarTab>(() => AdminBarTab.Editing);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAdminPendingApplicationsAction());
    }, []);

    const pendingApplications = useAppSelector(getPendingApplications);
    let applications: CurrentApplicationType[] = []

    if (pendingApplications) {
        pendingApplications.forEach((app) => applications.push({
            id: app.trainingApplicationId,
            title: app.trainingTopic,
            date: new Date(app.createdAt),
            status: ApplicationStatus[app.status as keyof typeof ApplicationStatus],
            commentsCount: app.commentsCount,
            userFullName: app.userFullName,
        }))
    }

    // @ts-ignore
    let filteredApplications: { [key in AdminBarTab]: CurrentApplicationType[] } = {};
    Object.keys(AdminBarTab).forEach((statusString) => {
        const status = AdminBarTab[statusString as keyof typeof AdminBarTab];
        filteredApplications[status] = applications.filter((app) => AdminTabsMapping[status].includes(app.status));
    })

    applications = getFilteredApplications(filteredApplications, navigationStatus);

    return (
        <div>
            <div className={"mt-[30px]"}>
                <AdminNavigationBar setFilterStatus={setNavigationStatus} statusApplications={filteredApplications}
                                    navigationStatus={navigationStatus}/>
                <ApplicationCardsContainer
                    applications={applications}
                    showImportButtonInDatePicker={navigationStatus === AdminBarTab.History}
                    showDatePicker
                    showSOLOButtonIfNeed/>
            </div>
        </div>
    )
}