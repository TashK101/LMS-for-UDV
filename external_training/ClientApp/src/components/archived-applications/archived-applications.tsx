import ApplicationCardsContainer from "../application-card/application-cards-container.tsx";
import {useArchivedApplications} from "./useArchivedApplications.ts";

type ArchivedApplicationsProps = {
    adminModeArchive?: boolean;
    showImportButton?: boolean;
}

function ArchivedApplications({adminModeArchive = false, showImportButton = false}: ArchivedApplicationsProps) {
    const {applications} = useArchivedApplications({adminModeArchive});


    return <ApplicationCardsContainer applications={applications} showStackedVersionIcon showDatePicker showImportButtonInDatePicker={showImportButton}/>;
}

export default ArchivedApplications;
