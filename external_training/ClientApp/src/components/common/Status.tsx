import { ApplicationStatus } from "../current-applications-utils/application-status";
import {StatusIcon} from "../current-applications-utils/icons/status-icons.tsx";

interface StatusComponentProps {
    statusType: ApplicationStatus
}

export function StatusComponent({ statusType }: StatusComponentProps) {
    return (
        <div className="bg-white border-[1px] border-color2 rounded-[8px] flex flex-row items-center gap-[8px] px-[8px] py-[6px]">
            {<StatusIcon variant={statusType} />}
            <p className="font-golos text-color7 text-[16px] font-[400]">{statusType.toLowerCase() ?? ""}</p>
        </div>
    )
}
