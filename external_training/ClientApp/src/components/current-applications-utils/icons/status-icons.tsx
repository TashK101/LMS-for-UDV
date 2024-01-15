import {UniversalClassAndChildrenProps} from "../../calendars/calendar-utils/universal-props.ts";
import clsx from "clsx";

const universalClassName = "m-2";

export function ApprovedIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#C27800"/>
            <circle cx="10" cy="10" r="9.5" stroke="#2B2A29"/>
        </svg>
    )
}

export function AwaitingPaymentIcon({className}: UniversalClassAndChildrenProps) {
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

export function AwaitingContractAndPaymentIcon({className}: UniversalClassAndChildrenProps) {
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

export function CourseSelectionIcon({className}: UniversalClassAndChildrenProps) {
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

export function AwaitingManagerApprovalIcon({className}: UniversalClassAndChildrenProps) {
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

export function NotApprovedIcon({className}: UniversalClassAndChildrenProps) {
    const fullClassName = clsx(universalClassName, className)
    return (
        <svg className={fullClassName}
             width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9.5" fill="#D9D9D9" stroke="#2B2A29"/>
        </svg>
    )
}