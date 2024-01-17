import {EllipsisIcon} from "./icons/ellipsis-icon.tsx";
import clsx from "clsx";
import {
    ApprovedIcon,
    AwaitingContractAndPaymentIcon,
    AwaitingManagerApprovalIcon,
    AwaitingPaymentIcon, CourseSelectionIcon, NotApprovedIcon
} from "./icons/status-icons.tsx";
import {ApplicationStatus} from "./application-status.ts";
import {CurrentApplicationType} from "../pages/current-applications/current-applications-page.tsx";
import {useNavigate} from "react-router-dom";

type ApplicationCardProps = {
    application: CurrentApplicationType;
}

const statusesIcons = {
    [ApplicationStatus.Approved]: <ApprovedIcon/>,
    [ApplicationStatus.AwaitingManagerApproval]: <AwaitingManagerApprovalIcon/>,
    [ApplicationStatus.AwaitingContractAndPayment]: <AwaitingContractAndPaymentIcon/>,
    [ApplicationStatus.AwaitingPayment]: <AwaitingPaymentIcon/>,
    [ApplicationStatus.NotApproved]: <NotApprovedIcon/>,
    [ApplicationStatus.CourseSelection]: <CourseSelectionIcon/>,
    [ApplicationStatus.AwaitingContract]: <AwaitingContractAndPaymentIcon/>
}

export function ApplicationCard({application}: ApplicationCardProps) {
    let applicationDateStr = application.date.toLocaleString("ru", {
        day: '2-digit',
        month: 'long',
        year: "numeric"
    });
    applicationDateStr = applicationDateStr.substring(0, applicationDateStr.length - 2);

    const cardStyle = clsx(
        "hover:from-[#FFEFD4] hover:to-[#FFFBF4]",
        "drop-shadow-xl hover:cursor-pointer w-[363px] m-3 px-[20px] py-[36px] border-solid",
        "border-2 rounded-2xl border-[#F59D0E] bg-gradient-to-r from-[#FFF6E9] to-[#FFFFFF]",
    )

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/application_details/${application.id}`)}
            className={cardStyle}>
            <div className={""}>
                <div className={"flex justify-between "}>
                    <div>
                        <p className={"text-xl font-semibold truncate w-[300px]"}>{application.title}</p>
                        <p className={"text-[#898989] mt-[10px]"}>{applicationDateStr}</p>
                    </div>
                    <EllipsisIcon className={"mt-2"}/>
                </div>
                <div className={"flex mt-[20px]"}>
                    {statusesIcons[application.status]}
                    <p className={"flex items-center"}>{application.status}</p>
                </div>
                <p className={"mt-[20px] text-[#898989]"}>{application.comments_count} комментариев</p>
            </div>
        </div>
    )
}