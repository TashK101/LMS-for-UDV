
import {stringToDate} from "../../string-to-date";
import {TextValueBlock} from "./text-value-block";
import './application-details.css'

function PendingApplicationDetails({ application }) {
    return (
        <div className='pending-application-details'>
            <TextValueBlock textValueProps={[
                ['Количество участников', application?.plannedParticipantsCount],
                ['ФИО участников', application?.plannedParticipantsNames],
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
    );
}

export default PendingApplicationDetails;
