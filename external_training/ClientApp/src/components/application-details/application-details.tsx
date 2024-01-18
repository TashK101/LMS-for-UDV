import {Comments} from "../comments/comments";
import {useEffect, useState} from "react"
import {afterManagerApprovalStatuses} from "./flagStatuses";
import {ApplicationsStatusTrans} from "../pages/current-applications/current-applications-page";
import {statusesIcons} from "../current-applications-utils/application-card";
import {stringToDate} from "../../string-to-date";
import './application-details.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getApplicationDetails, getCourseDetails, getId, getRole} from "../../store/system-process/system-getters";
import {fetchApplicationDetailsAction, fetchStartConfigAction} from "../../store/api-actions/api-actions";
import {fetchCourseDetailsAction} from "../../store/api-actions/api-actions";
import {TextValueBlock} from "./text-value-block";
import {CommentSendField} from "./comment-send-field";
import {Header} from "../header/header";
import {ModeSwitchButton} from "../current-applications-utils/mode-switch-button";
import {IconNameCombo} from "./icon-name-combo";

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
    const userId = useAppSelector(getId);
    // @ts-ignore
    const status = ApplicationsStatusTrans[application?.status]
    const [dataFlag, setDataFlag] = useState(() => false);
    return (
        <div>
            <Header/>
            <div className='application-details left-5'>
                <h2 className='topic-text'>{application?.trainingTopic}</h2>
                <p className='bold-text'>Статус:</p>
                <div className='flex border-2 rounded-xl items-center w-fit pr-4'>
                    {statusesIcons[status]}
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
                { !dataFlag ?
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
                        ${application? (application?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}`],
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
                            ${course? (course?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}`],
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

                <CommentSendField trainingApplicationId={id}/>

            </div>
            <div className='top-bottom-20'>

                {application?.comments &&
                    <Comments comments={application.comments} authorId={userId}/>}
            </div>
        </div>
    );
}


