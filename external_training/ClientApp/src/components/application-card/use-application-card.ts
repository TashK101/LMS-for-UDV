import {useNavigate} from "react-router-dom";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import clsx from "clsx";
import {ApplicationStatus} from "../current-applications-utils/application-status.ts";

type ApplicationCardController = {
    application: CurrentApplicationType;
    stacked: boolean;
    showSOLOButtonIfNeed: boolean;
}

export function useApplicationCard({application, stacked, showSOLOButtonIfNeed}: ApplicationCardController) {
    const navigate = useNavigate();
    const applicationDateStr = application.date.toLocaleString("ru", {
        day: '2-digit',
        month: 'long',
        year: "numeric"
    }).replace(' г.', '');

    const userFullName = application.userFullName;
    const handleCardClick = () => {
        navigate(`/application_details/${application.id}`);
    };
    const cardClassName = clsx({
        'application-card': true,
        'application-card_basic': !stacked,
        'application-card_stacked': stacked
    })

    const showSOLOButton = showSOLOButtonIfNeed && application.status === ApplicationStatus.Editing;


    return {handleCardClick, userFullName, applicationDateStr, cardClassName, showSOLOButton};
}