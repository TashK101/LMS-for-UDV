
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import './application-card.css';
import CardContentFull from "./card-content/card-content-full.tsx";
import CardContentStacked from "./card-content/card-content-stacked.tsx";
import {useApplicationCard} from "./use-application-card.ts";

export type ApplicationSubCardProps = {
    application: CurrentApplicationType;
    applicationManager: string;
    applicationDateStr: string;
    showSOLOButton: boolean;
    showStackedVersionIcon?: boolean;
}

type ApplicationCardProps = {
    application: CurrentApplicationType;
    stacked?: boolean;
    showSOLOButton?: boolean;
    showStackedVersionIcon?: boolean;
}

export function ApplicationCard({
                                    application,
                                    showSOLOButton = false,
                                    stacked = false,
                                    showStackedVersionIcon = true
                                }: ApplicationCardProps) {
    const {handleCardClick, applicationManager, applicationDateStr, cardClassName} = useApplicationCard({
        application,
        stacked,
    });

    return (
        <div className={cardClassName} onClick={handleCardClick}>
            {!stacked && <CardContentFull application={application}
                                          applicationManager={applicationManager}
                                          applicationDateStr={applicationDateStr}
                                          showSOLOButton={showSOLOButton}/>}
            {stacked && <CardContentStacked application={application}
                                            applicationManager={applicationManager}
                                            applicationDateStr={applicationDateStr}
                                            showSOLOButton={showSOLOButton}
                                            showStackedVersionIcon={showStackedVersionIcon}/>}
        </div>
    );
}