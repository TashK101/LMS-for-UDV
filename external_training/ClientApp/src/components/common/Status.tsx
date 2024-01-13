import { ApprovedIcon, AwaitManagerApprovalIcon, AwaitPaymentAndContractIcon, AwaitPaymentIcon, CourseSelectionIcon, NotApprovedIcon } from "./Icons";
import { H400 } from "./Text";

export enum StatusType {
    NOT_APPROVED,
    AWAIT_MANAGER_APPROVAL,
    COURSE_SELECTION,
    AWAIT_CONTRACT_AND_PAYMENT,
    AWAIT_PAYMENT,
    APPROVED
}

interface IStatus {
    title: string
    children: React.ReactNode
}

let statusMap = new Map<StatusType, IStatus>([
    [StatusType.APPROVED, { title: 'утверждено', children: <ApprovedIcon /> }],
    [StatusType.AWAIT_PAYMENT, { title: 'ждёт оплату', children: <AwaitPaymentIcon /> }],
    [StatusType.AWAIT_CONTRACT_AND_PAYMENT, { title: 'ждёт договор и оплату', children: <AwaitPaymentAndContractIcon /> }],
    [StatusType.COURSE_SELECTION, { title: 'идёт подбор курса', children: <CourseSelectionIcon /> }],
    [StatusType.AWAIT_MANAGER_APPROVAL, { title: 'ждёт согласования руководителя', children: <AwaitManagerApprovalIcon /> }],
    [StatusType.NOT_APPROVED, { title: 'не согласовано', children: <NotApprovedIcon /> }]
]);

interface StatusComponentProps {
    statusType: StatusType
}

export function StatusComponent({ statusType }: StatusComponentProps) {
    const status = statusMap.get(statusType)
    return (
        <div className="bg-white border border-color2 rounded-[8px] flex flex-row items-center gap-[8px] px-[8px] py-[6px]">
            {status?.children}
            <H400 fontSize={16} text={status?.title ?? ""} />
        </div>
    )
}
