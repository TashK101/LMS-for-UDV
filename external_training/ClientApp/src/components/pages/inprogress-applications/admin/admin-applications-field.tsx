import {useState} from "react";
import {ModeSwitchButton} from "../../../current-applications-utils/mode-switch-button.tsx";
import {AdminPendingApplications} from "./admin-pending-applications.tsx";
import {AdminArchivedApplications} from "./admin-archived-applications.tsx";

export function AdminApplicationsField() {
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
                <AdminArchivedApplications/> : <AdminPendingApplications/>}
        </div>
    )
}