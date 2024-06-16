import {stringToDate} from "../../string-to-date";
import {TextValueBlock} from "./text-value-block";
import './application-details.css'

function ApprovedApplicationDetails({ course, application }) {
    return (
        <div className='pending-application-details'>
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
                ['ФИО участников', course?.participantsNames]
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

export default ApprovedApplicationDetails;
