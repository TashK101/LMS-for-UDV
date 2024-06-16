
import {TextValueBlock} from "./text-value-block";
import './application-details.css'
import {Application, Course} from "../../types/application";
import {stringToDate} from "../../helpers/string-to-date";

function ApprovedApplicationDetails({ application }: {application: Application}) {
    const course = application.selectedCourse;
    return (
        <div className='pending-application-details'>
            <TextValueBlock textValueProps={[
                ['Учебный центр', course.trainingCenter],
                ['Название курса', course?.name],
                ['Формат', `${course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} 
                ${course ? (course?.isCorporateTraining ? 
                    'только для нашей компании' : 'не только для нашей компании') : ''}`],
                ['Даты', `${stringToDate(course?.begin)} - ${stringToDate(course?.end)}`],
                ['Стоимость на одного', course?.costPerParticipant]
            ]}/>
            <TextValueBlock textValueProps={[
                ['Количество участников', application.participants.length],
                ['ФИО участников', getFullNames(application.participants)]
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
