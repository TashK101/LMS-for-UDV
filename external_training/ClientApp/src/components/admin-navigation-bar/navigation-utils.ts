import {ApplicationStatus} from "../current-applications-utils/application-status.ts";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";

export enum AdminBarTab {
    Editing = 'На редактировании',
    Coordination = 'Согласование',
    InProcess = 'В работе',
    AwaitingContract = 'Ждёт договор',
    AwaitingPayment = 'Ждёт оплату',
    AwaitingLearning = 'Ждёт обучение',
    LearningInProcess = 'На обучении',
    History = 'В истории'
}

export const AdminTabsMapping = {
    [AdminBarTab.Coordination]: ApplicationStatus.AwaitingManagerApproval,
    [AdminBarTab.Editing]: ApplicationStatus.Editing,
    [AdminBarTab.InProcess]: ApplicationStatus.CourseSelection,
    [AdminBarTab.AwaitingContract]: ApplicationStatus.AwaitingContractAndPayment,
    [AdminBarTab.AwaitingPayment]: ApplicationStatus.AwaitingPayment || ApplicationStatus.AwaitingContractAndPayment,
    [AdminBarTab.AwaitingLearning]: ApplicationStatus.AwaitingTraining,
    [AdminBarTab.LearningInProcess]: ApplicationStatus.TrainingInProgress,
    [AdminBarTab.History]: ApplicationStatus.TrainingCompleted || ApplicationStatus.TrainingCanceled || ApplicationStatus.NotApproved,
}

export function getFilteredApplications(filteredApplications: { [key in AdminBarTab]: CurrentApplicationType[] }, filterOption: AdminBarTab) {
    switch (filterOption) {
        case AdminBarTab.Editing:
            return filteredApplications[AdminBarTab.Editing];
        case AdminBarTab.Coordination:
            return filteredApplications[AdminBarTab.Coordination];
        case AdminBarTab.InProcess:
            return filteredApplications[AdminBarTab.InProcess];
        case AdminBarTab.AwaitingContract:
            return filteredApplications[AdminBarTab.AwaitingContract];
        case AdminBarTab.AwaitingPayment:
            return filteredApplications[AdminBarTab.AwaitingPayment];
        case AdminBarTab.AwaitingLearning:
            return filteredApplications[AdminBarTab.AwaitingLearning];
        case AdminBarTab.LearningInProcess:
            return filteredApplications[AdminBarTab.LearningInProcess];
        case AdminBarTab.History:
            return filteredApplications[AdminBarTab.History];
    }
}