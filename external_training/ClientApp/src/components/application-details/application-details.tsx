import {Comments} from "../comments/comments";
//import { Header }
//import { backButton}
import {stringToDate} from "../../string-to-date";
import './application-details.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getApplicationDetails} from "../../store/selectors";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {TextValueBlock} from "./text-value-block";
import {useEffect} from "react";
import { CommentSendField} from "./comment-send-field";

export function ApplicationDetails(): JSX.Element {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(1));
    }, []);

    const application = useAppSelector(getApplicationDetails);
    return (
        <div>
            <div className='application-details'>
                <h2 className='topic-text'>{application?.trainingTopic}</h2>
                <p className='bold-text'>Статус:</p>
                {application?.status}
                <p className='bold-text'>Подал:</p>
                {application?.applicationUserName}
                {/*рук*/}
                <div className='pending-application-details'>
                    <TextValueBlock textValueProps={[
                        ['Количество участников', application?.plannedParticipantsCount],
                        ['ФИО участников', application?.plannedParticipantsNames],
                        ['Департамент', application?.department],
                        ['Отдел/команда', application?.team]
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


