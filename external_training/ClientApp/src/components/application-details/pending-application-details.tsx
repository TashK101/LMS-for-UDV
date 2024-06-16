
import {TextValueBlock} from "./text-value-block";
import './application-details.css'
import {stringToDate} from "../../helpers/string-to-date";
import {Application} from "../../types/application";

function PendingApplicationDetails({ application }: {application: Application}) {
    const course = application.desiredCourse;
    return (
        <div className='pending-application-details'>
            <TextValueBlock textValueProps={[
                ['Количество участников', application.participants.length],
                ['ФИО участников', getFullNames(application.participants)],
            ]}/>
            <TextValueBlock textValueProps={[
                ['Формат', `${course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} 
                ${course ? (course?.isCorporateTraining ?
                    'только для нашей компании' : 'не только для нашей компании') : ''}`],
                ['Даты', `${stringToDate(course?.begin)} - ${stringToDate(course?.end)}`],
                ['Похожие курсы', application?.similarPrograms],
                ['Стоимость на одного', `${course.costPerParticipant} рублей`]
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
