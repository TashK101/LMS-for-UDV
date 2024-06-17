import {Comments} from "../comments/comments";
import {useEffect, useState} from "react"
import {afterAdminWorkStatuses} from "./flagStatuses";
import './application-details.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getApplicationDetails, getCourseDetails, getId, getRole} from "../../store/system-process/system-getters";
import {
    fetchApplicationDetailsAction,
    fetchCourseDetailsAction,
    fetchStartConfigAction
} from "../../store/api-actions/api-actions";
import {CommentSendField, parseRoleFromString, Role} from "./comment-send-field";
import {getFullNames} from "../../helpers/get-full-names"
import {Header} from "../header/header";
import {ModeSwitchButton} from "../current-applications-utils/mode-switch-button";
import {IconNameCombo} from "./icon-name-combo";
import {StatusIcon} from "../current-applications-utils/icons/status-icons.tsx";
import {ApplicationStatus} from "../current-applications-utils/application-status.ts";
import PendingApplicationDetails from "./pending-application-details";
import ApprovedApplicationDetails from "./approved-application-details";
import {ApplicationPage} from "../pages/application/ApplicationPage";
import {ApplicationChangeForm} from "./application-change-form";

export type ApplicationDetailsProps = {
    id: number;
}

export function ApplicationDetails({id}: ApplicationDetailsProps): JSX.Element {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
        dispatch(fetchCourseDetailsAction(id));
        dispatch(fetchStartConfigAction);
    }, []);

    const application = useAppSelector(getApplicationDetails);
    const course = useAppSelector(getCourseDetails);
    const role = useAppSelector(getRole);
    const roleEnum = parseRoleFromString(role);
    const userId = useAppSelector(getId);
    const status = ApplicationStatus[application?.status as keyof typeof ApplicationStatus]
    const [dataFlag, setDataFlag] = useState(() => false);
    
    return (
        <div>
            <Header/>
            <div className='application-details left-5'>
                <h2 className='topic-text'>{application?.trainingTopic}</h2>
                
                <div className='flex border-2 rounded-xl items-center w-fit pr-4'>
                    <StatusIcon variant={status} className='mr-[8px]'/>
                    {status}
                </div>
                
                <div className='flex w-full gap-[50px]'>
                    {application?.applicationUserName &&
                        <IconNameCombo names={[application?.applicationUserName]} action='Подал'/>}
                    
                    {application?.approvingManagers?.length > 0 &&
                    <IconNameCombo
                        names={getFullNames(application.approvingManagers)}
                        action='Согласует'
                    />
                    }
                </div>

                {(role === Role.admin && status !== "Ждёт согласования руководителя") && (
                    <ModeSwitchButton contentMode={dataFlag} setContentMode={setDataFlag} leftPartText={'Исходные данные'}
                                  rightPartText={'Оформление'}/>)}
                
                {role === Role.admin && dataFlag ?
                    <div className="flex">
                        <PendingApplicationDetails id={id} />
                    </div>
                    :
                    (afterAdminWorkStatuses.includes(status) ?
                        <ApprovedApplicationDetails course={course} application={application} />
                        :
                        <PendingApplicationDetails id={id} />) }
                
                {application && role && ((role===Role.admin) || userId === application?.applicationUserId) &&
                <CommentSendField trainingApplicationId={id} applicationUserId={application?.applicationUserId} userId={userId} role={roleEnum}/>}
                
            </div>
            <div className='top-bottom-20'>
                {application?.comments &&
                    <Comments comments={application.comments} authorId={userId}/>}
            </div>
        </div>
    );
}


