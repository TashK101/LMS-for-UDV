import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {ApplicationDetailsAvatar} from "../../../avatar/header-avatar.tsx";
import {ApplicationStatus} from "../../../current-applications-utils/application-status.ts";
import {
    ApprovedIcon,
    AwaitingContractAndPaymentIcon,
    AwaitingManagerApprovalIcon, AwaitingPaymentIcon, CourseSelectionIcon, NotApprovedIcon
} from "../../../current-applications-utils/icons/status-icons.tsx";
import {EllipsisIcon} from "../../../current-applications-utils/icons/ellipsis-icon.tsx";
import {CurrentAdminPendingApplicationType} from "./admin-pending-applications.tsx";

type AdminPendingApplicationCardProps = {
    application: CurrentAdminPendingApplicationType,
}

export const statusesIcons = {
    [ApplicationStatus.Approved]: <ApprovedIcon/>,
    [ApplicationStatus.AwaitingManagerApproval]: <AwaitingManagerApprovalIcon/>,
    [ApplicationStatus.AwaitingContractAndPayment]: <AwaitingContractAndPaymentIcon/>,
    [ApplicationStatus.AwaitingPayment]: <AwaitingPaymentIcon/>,
    [ApplicationStatus.NotApproved]: <NotApprovedIcon/>,
    [ApplicationStatus.CourseSelection]: <CourseSelectionIcon/>,
    [ApplicationStatus.AwaitingContract]: <AwaitingContractAndPaymentIcon/>
}

export function AdminPendingApplicationCard({application}: AdminPendingApplicationCardProps) {
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
                <div className={"flex mt-[20px] gap-[10px] items-center"}>
                    <ApplicationDetailsAvatar userFullName={application.created_name}/>
                    <p>{application.created_name}</p>
                </div>
                <p className={"mt-[20px] text-[#898989]"}>{application.comments_count} комментариев</p>
            </div>
        </div>
    )
}