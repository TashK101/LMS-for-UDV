import {Comments} from "../comments/comments";
import { useState } from "react"
import { Form } from "./Form"
import {ApplicationsStatusTrans} from "../pages/current-applications/current-applications-page";
import {statusesIcons} from "../current-applications-utils/application-card";
import {stringToDate} from "../../string-to-date";
import './application-details.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import { getApplicationDetails} from "../../store/system-process/system-getters";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {TextValueBlock} from "./text-value-block";
import {useEffect} from "react";
import { CommentSendField} from "./comment-send-field";
import {Header} from "../header/header";
import {ApplicationDetailsAvatar} from "../avatar/header-avatar";
import {flash} from "react-awesome-reveal/dist/animations/attention_seekers";

export type ApplicationDetailsProps={
    id: number;
}
export function ApplicationDetails({id}:ApplicationDetailsProps): JSX.Element {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const application = useAppSelector(getApplicationDetails);
    // @ts-ignore
    const status = ApplicationsStatusTrans[application?.status]
    return (
        <div>
            <Header/>
            <div className='application-details'>
                <h2 className='topic-text'>{application?.trainingTopic}</h2>
                <p className='bold-text'>Статус:</p>
                <div className='flex border-2 rounded-xl items-center w-fit pr-4'>
                    {statusesIcons[status]}
                    {status}
                </div>
                <p className='bold-text'>Подал:</p>
                <div className='flex items-center gap-[10px]'>{application?.applicationUserName &&
                <ApplicationDetailsAvatar userFullName={application?.applicationUserName}/>}
                    {application?.applicationUserName}</div>
                <div className='pending-application-details'>
                    <TextValueBlock textValueProps={[
                        ['Количество участников', application?.plannedParticipantsCount],
                        ['ФИО участников', application?.plannedParticipantsNames],
                        ['Департамент', application?.department],
                        ['Отдел/команда', application?.team],
                        ['Согласующий руководитель', application?.desiredManagerName]
                    ]}/>
                    <TextValueBlock textValueProps={[
                        ['Формат', `${application?.isTrainingOnline ? 'Онлайн' : 'Оффлайн'}, ${application?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании'}`],
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
                <CommentSendField/>
            </div>
            <div className='top-bottom-20'>

                {application?.comments &&
                    <Comments comments={application.comments} authorId={application.applicationUserName}/>}
            </div>
        </div>
    );
}


