import {Comments} from "../comments/comments";
import {useEffect, useState} from "react"
import {noManagerApprovalStatuses} from "./flagStatuses";
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
import PostToSoloButton from "../post-to-solo-button/post-to-solo-button.tsx";
import clsx from "clsx";
import {ApplicationChangeForm} from "./application-change-form";
import ApplicationInitForm from "./application-init-form";

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
    let isCourseSet = !noManagerApprovalStatuses.includes(status);

    return (
        <div>
            <Header/>
            <div className='application-details left-5'>
                <h2 className='topic-text'>{application?.trainingTopic}</h2>
                {role === Role.admin && status === ApplicationStatus.Editing &&
                    <div className='flex gap-[15px]'>
                        <PostToSoloButton applicationId={application?.trainingApplicationId} variant={'big'}/>
                        <button
                            className={clsx('rounded-[100px] box-border leading-[24px] text-[20px] py-[15px]',
                                'px-[24px] border-[2px] border-[#FFCE80] text-[#724600] hover:bg-[#FFEDCF]',
                                'hover:border-[#F59D0E] shadow-md active:shadow-none')}>Отправить в историю
                        </button>
                    </div>
                }

                <div className='flex border-2 rounded-xl items-center w-fit py-[6px] px-[16px]'>
                    <StatusIcon variant={status} className='mr-[8px]'/>
                    {status}
                </div>

                <div className='flex w-full gap-[50px]'>
                    {application?.applicationUserName &&
                        <IconNameCombo names={[application?.applicationUserName]} action='Подал'/>}

                    {application && application?.approvingManagers?.length > 0 &&
                        <IconNameCombo
                            names={getFullNames(application.approvingManagers)}
                            action='Согласует'
                        />
                    }
                </div>

                {(role === Role.admin && (isCourseSet || status === ApplicationStatus.Editing)) && (
                    <ModeSwitchButton contentMode={dataFlag} setContentMode={setDataFlag}
                                      leftPartText={noManagerApprovalStatuses.includes(status) 
                                          ? 'Исходные данные' : 'Текущие данные'}
                                      rightPartText={ status === ApplicationStatus.Editing 
                                          ? "Редактирование" : 'Оформление'}/>)}

                {role === Role.admin && dataFlag ?
                    <div className="flex">
                        <ApplicationInitForm id={id}/>
                        <ApplicationChangeForm id={id}/>
                    </div>
                    :
                    (noManagerApprovalStatuses.includes(status) ?
                        <PendingApplicationDetails id={id}/>
                        :
                        <ApprovedApplicationDetails id={id}/>)}

                {application && role && ((role === Role.admin) || userId === application?.applicationUserId) &&
                    <CommentSendField trainingApplicationId={id} applicationUserId={application?.applicationUserId}
                                      userId={userId} role={roleEnum}/>}
                
            </div>
            <div className='top-bottom-20'>
                {application?.comments &&
                    <Comments comments={application.comments} authorId={userId}/>}
            </div>
        </div>
    );
}


