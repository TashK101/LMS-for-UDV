import {useState} from "react";
import {ModeSwitchButton} from "../../../current-applications-utils/mode-switch-button.tsx";
import {AdminPendingApplications} from "./admin-pending-applications.tsx";
import ArchivedApplications from "../../../archived-applications/archived-applications.tsx";

export function AdminApplications() {
    const [historyMode, setHistoryMode] = useState(() => false);

    return (
        <div className={"mt-[40px] font-medium"}>
            <ModeSwitchButton
                className={"mx-[55px]"}
                contentMode={historyMode}
                              setContentMode={setHistoryMode}
                              leftPartText={"Заявки в работе"}
                              rightPartText={"История"}/>
            {historyMode ?
                <ArchivedApplications adminModeArchive showImportButton/> : <AdminPendingApplications/>}
        </div>
    )
}