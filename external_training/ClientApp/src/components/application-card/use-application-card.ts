import {useNavigate} from "react-router-dom";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import clsx from "clsx";

type ApplicationCardController = {
    application: CurrentApplicationType;
    stacked: boolean;
}

export function useApplicationCard({application, stacked}: ApplicationCardController) {
    const navigate = useNavigate();
    const applicationDateStr = application.date.toLocaleString("ru", {
        day: '2-digit',
        month: 'long',
        year: "numeric"
    }).replace(' г.', '');

    // HARDCODE! WIP.
    const applicationManager = "Иванов Иван Иванович";
    const handleCardClick = () => {
        navigate(`/application_details/${application.id}`);
    };
    const cardClassName = clsx({
        'application-card': true,
        'application-card_basic': !stacked,
        'application-card_stacked': stacked
    })


    return {handleCardClick, applicationManager, applicationDateStr, cardClassName};
}