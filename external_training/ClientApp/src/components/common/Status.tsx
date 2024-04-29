import { ApplicationStatus } from "../current-applications-utils/application-status";
import { ApprovedIcon, AwaitManagerApprovalIcon, AwaitPaymentAndContractIcon, AwaitPaymentIcon, CourseSelectionIcon, NotApprovedIcon } from "./Icons";

interface IStatus {
    title: string
    children: React.ReactNode
}

let statusMap = new Map<ApplicationStatus, IStatus>([
    [ApplicationStatus.Approved, { title: 'утверждено', children: <ApprovedIcon /> }],
    [ApplicationStatus.AwaitingPayment, { title: 'ждёт оплату', children: <AwaitPaymentIcon /> }],
    [ApplicationStatus.AwaitingContractAndPayment, { title: 'ждёт договор и оплату', children: <AwaitPaymentAndContractIcon /> }],
    [ApplicationStatus.CourseSelection, { title: 'идёт подбор курса', children: <CourseSelectionIcon /> }],
    [ApplicationStatus.AwaitingManagerApproval, { title: 'ждёт согласования руководителя', children: <AwaitManagerApprovalIcon /> }],
    [ApplicationStatus.NotApproved, { title: 'не согласовано', children: <NotApprovedIcon /> }]
]);

interface StatusComponentProps {
    statusType: ApplicationStatus
}

export function StatusComponent({ statusType }: StatusComponentProps) {
    const status = statusMap.get(statusType)
    return (
        <div className="bg-white border-[1px] border-color2 rounded-[8px] flex flex-row items-center gap-[8px] px-[8px] py-[6px]">
            {status?.children}
            <p className="font-golos text-color7 text-[16px] font-[400]">{status?.title ?? ""}</p>
        </div>
    )
}
