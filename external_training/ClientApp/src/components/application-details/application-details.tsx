import {Comments} from "../comments/comments";
import {useEffect, useState} from "react"
import {afterManagerApprovalStatuses} from "./flagStatuses";
import {stringToDate} from "../../string-to-date";
import './application-details.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getApplicationDetails, getCourseDetails, getId, getRole} from "../../store/system-process/system-getters";
import {
    fetchApplicationDetailsAction,
    fetchCourseDetailsAction,
    fetchStartConfigAction
} from "../../store/api-actions/api-actions";
import {TextValueBlock} from "./text-value-block";
import {CommentSendField, parseRoleFromString, Role} from "./comment-send-field";
import {Header} from "../header/header";
import {ModeSwitchButton} from "../current-applications-utils/mode-switch-button";
import {IconNameCombo} from "./icon-name-combo";
import {AcceptDeclineButton} from "./accept-decline-buttons";
import {SubmitButton4} from "../common/Button";
import {StatusIcon} from "../current-applications-utils/icons/status-icons.tsx";
import {ApplicationStatus} from "../current-applications-utils/application-status.ts";

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
                {(role === Role.manager) && (application?.desiredManagerId === userId) && (status === 'Ждёт согласования руководителя') &&
                    <AcceptDeclineButton TrainingApplicationId={application.trainingApplicationId}/>
                }
                {(role === Role.admin) &&
                    <SubmitButton4 text={'Оформление'}/>
                }
                <p className='bold-text'>Статус:</p>
                <div className='flex border-2 rounded-xl items-center w-fit pr-4'>
                    <StatusIcon variant={status} className='mr-[8px]'/>
                    {status}
                </div>
                <div className='flex w-full gap-[50px]'>
                    {application?.applicationUserName &&
                        <IconNameCombo name={application?.applicationUserName} action='Подал'/>}
                    {afterManagerApprovalStatuses.includes(status) ?
                        application?.desiredManagerName &&
                        <IconNameCombo name={application?.desiredManagerName} action='Одобрил'/>
                        : null}
                </div>

                <ModeSwitchButton contentMode={dataFlag} setContentMode={setDataFlag} leftPartText={'Исходная заявка'}
                                  rightPartText={'Утвержденные данные'}/>
                {!dataFlag ?
                    <div className='pending-application-details'>
                        <TextValueBlock textValueProps={[
                            ['Количество участников', application?.plannedParticipantsCount],
                            ['ФИО участников', application?.plannedParticipantsNames],
                            ['Департамент', application?.department],
                            ['Отдел/команда', application?.team],
                            ['Согласующий руководитель', application?.desiredManagerName]
                        ]}/>
                        <TextValueBlock textValueProps={[
                            ['Формат', `${application ? (application?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''}
                        ${application ? (application?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}`],
                            ['Желаемые даты', `${stringToDate(application?.desiredBegin)} - ${stringToDate(application?.desiredEnd)}`],
                            ['Похожие курсы', application?.similarPrograms],
                            ['Стоимость на одного', `${application?.estimatedCostPerParticipant} рублей`]
                        ]}/>
                        <TextValueBlock textValueProps={[
                            ['Мотивация', application?.relevanceReason],
                            ['Цели обучения', application?.trainingGoals],
                            ['Приобретаемые навыки', application?.skillsToBeAcquired],
                            ['Примечания', application?.applicationNotes]
                        ]}/>
                    </div>
                    : <div className='pending-application-details'>
                        <TextValueBlock textValueProps={[
                            ['Учебный центр', course?.educationalCenter],
                            ['Название курса', course?.courseName],
                            ['Формат', `${course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} 
                            ${course ? (course?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}`],
                            ['Даты', `${stringToDate(course?.begin)} - ${stringToDate(course?.end)}`],
                            ['Стоимость на одного', course?.costPerParticipant]
                        ]}/>
                        <TextValueBlock textValueProps={[
                            ['Количество участников', course?.participantsCount],
                            ['ФИО участников', course?.participantsNames],
                            ['Департамент', course?.department],
                            ['Отдел/команда', course?.team]
                        ]}/>
                    </div> }
                {application && role && ((role===Role.admin) || userId === application?.applicationUserId || userId === application.desiredManagerId) &&
                <CommentSendField trainingApplicationId={id} applicationUserId={application?.applicationUserId} userId={userId} role={roleEnum}/>}

            </div>
            <div className='top-bottom-20'>

                {application?.comments &&
                    <Comments comments={application.comments} authorId={userId}/>}
            </div>
        </div>
    );
}


