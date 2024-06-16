import {UniversalClassAndChildrenProps} from "../../calendars/calendar-utils/universal-props.ts";
import clsx from "clsx";
import {ApplicationStatus} from "../application-status.ts";

const universalClassName = "";

type StatusIconProps = {
    className?: string;
    variant: ApplicationStatus;
}

export function StatusIcon({className, variant}: StatusIconProps) {
    switch (variant) {
        case ApplicationStatus.Editing:
            return <EditingIcon className={className}/>;
        case ApplicationStatus.TrainingCompleted:
            return <TrainingCompletedIcon className={className}/>;
        case ApplicationStatus.AwaitingPayment:
            return <AwaitingPaymentIcon className={className} />;
        case ApplicationStatus.AwaitingContractAndPayment:
            return <AwaitingContractAndPaymentIcon className={className} />;
        case ApplicationStatus.CourseSelection:
            return <CourseSelectionIcon className={className} />;
        case ApplicationStatus.AwaitingManagerApproval:
            return <AwaitingManagerApprovalIcon className={className} />;
        case ApplicationStatus.NotApproved:
            return <NotApprovedIcon className={className} />;
        case ApplicationStatus.TrainingCanceled:
            return <TrainingCanceledIcon className={className} />;
        case ApplicationStatus.TrainingInProgress:
            return <TrainingInProgressIcon className={className} />;
        case ApplicationStatus.AwaitingTraining:
            return <AwaitingTrainingIcon className={className} />;
        default:
            return <></>;
    }
}

function EditingIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
            width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#2B2A29"/>
            <path
                d="M10 0C12.1118 2.51829e-08 14.1694 0.66855 15.8779 1.90983C17.5863 3.15111 18.858 4.9014 19.5106 6.90983L10 10L10 0Z"
                fill="#FFCE80"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>

    )
}

function AwaitingTrainingIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.99245 9.98687L14.6152 1.69642C13.1831 0.900416 11.5668 0.486995 9.92302 0.500312C8.27901 0.513631 6.6694 0.953299 5.25024 1.77261L9.99245 9.98687Z"
                fill="#C27800" stroke="#2B2A29"/>
            <path
                d="M9.99245 10.0131L14.6152 18.3036C13.1831 19.0996 11.5668 19.513 9.92302 19.4997C8.27901 19.4864 6.6694 19.0467 5.25024 18.2274L9.99245 10.0131Z"
                stroke="#2B2A29"/>
        </svg>
    )
}

function TrainingInProgressIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#2B2A29"/>
            <circle cx="10" cy="10" r="10" fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
            <path
                d="M6 10.1821C6 9.62984 6.44772 9.18213 7 9.18213H12.6366C13.1888 9.18213 13.6366 9.62984 13.6366 10.1821V13.0463C13.6366 13.4106 13.4396 13.7487 13.1146 13.9133C10.6866 15.1424 9.08172 15.0995 6.55141 13.907C6.21068 13.7464 6 13.3994 6 13.0228V10.1821Z"
                fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12.6366 10.1821H7V13.0129C8.19103 13.5721 9.06729 13.8134 9.87737 13.8183C10.6781 13.8231 11.5186 13.5972 12.6366 13.0344V10.1821ZM7 9.18213C6.44772 9.18213 6 9.62984 6 10.1821V13.0228C6 13.3994 6.21068 13.7464 6.55141 13.907C9.08172 15.0995 10.6866 15.1424 13.1146 13.9133C13.4396 13.7487 13.6366 13.4106 13.6366 13.0463V10.1821C13.6366 9.62984 13.1888 9.18213 12.6366 9.18213H7Z"
                  fill="#2B2A29"/>
            <path d="M9.72746 6L15.4548 8.54587L9.72746 11.168L4 8.54587L9.72746 6Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M9.32128 5.08621C9.57987 4.97126 9.87506 4.97126 10.1336 5.08621L15.861 7.63208C16.2203 7.79178 16.4526 8.14718 16.4548 8.54034C16.457 8.9335 16.2286 9.29145 15.8711 9.45511L10.1437 12.0773C9.87941 12.1983 9.57551 12.1983 9.31119 12.0773L3.58373 9.45511C3.22625 9.29145 2.99784 8.9335 3.00002 8.54034C3.00219 8.14718 3.23455 7.79178 3.59382 7.63208L9.32128 5.08621ZM9.72746 6L15.4548 8.54587L9.72746 11.168L4 8.54587L9.72746 6Z"
                  fill="#2B2A29"/>
        </svg>

    )
}

function TrainingCanceledIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill="#D9D9D9" stroke="#2B2A29"/>
            <path d="M3 17L16.4615 3" stroke="#2B2A29"/>
            <path d="M3 3L17 17" stroke="#2B2A29"/>
        </svg>
    )
}

function TrainingCompletedIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>
    )
}

function AwaitingPaymentIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C12.1118 2.51829e-08 14.1694 0.66855 15.8779 1.90983C17.5863 3.15111 18.858 4.9014 19.5106 6.90983C20.1631 8.91826 20.1631 11.0817 19.5106 13.0902C18.858 15.0986 17.5863 16.8489 15.8779 18.0902C14.1694 19.3315 12.1118 20 10 20C7.88821 20 5.83062 19.3314 4.12215 18.0902C2.41367 16.8489 1.14201 15.0986 0.489434 13.0902C-0.163145 11.0817 -0.163145 8.91826 0.489435 6.90983L10 10V0Z"
                fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>
    )
}

function AwaitingContractAndPaymentIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C11.5781 1.88187e-08 13.1338 0.373491 14.5399 1.08993C15.946 1.80638 17.1626 2.84543 18.0902 4.12215C19.0178 5.39886 19.63 6.87698 19.8769 8.43565C20.1238 9.99433 19.9982 11.5893 19.5106 13.0902C19.0229 14.591 18.187 15.9552 17.0711 17.0711C15.9552 18.187 14.591 19.0229 13.0902 19.5106C11.5893 19.9982 9.99433 20.1238 8.43566 19.8769C6.87698 19.63 5.39886 19.0178 4.12215 18.0902L10 10V0Z"
                fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>

    )
}

function CourseSelectionIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C12.1118 2.51829e-08 14.1694 0.66855 15.8779 1.90983C17.5863 3.15111 18.858 4.9014 19.5106 6.90983C20.1631 8.91826 20.1631 11.0817 19.5106 13.0902C18.858 15.0986 17.5863 16.8489 15.8779 18.0902L10 10V0Z"
                fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>
    )
}

function AwaitingManagerApprovalIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 0C12.1118 2.51829e-08 14.1694 0.66855 15.8779 1.90983C17.5863 3.15111 18.858 4.9014 19.5106 6.90983L10 10V0Z"
                fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>
    )
}

function NotApprovedIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill="#D9D9D9" stroke="#2B2A29"/>
        </svg>
    )
}