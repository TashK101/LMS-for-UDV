
import {TextValueBlock} from "./text-value-block";
import './application-details.css'
import {Application} from "../../types/application";
import {stringToDate} from "../../helpers/string-to-date";
import {getFullNames} from "../../helpers/get-full-names"
import {useEffect} from "react";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {getApplicationDetails, getIsDataLoading} from "../../store/system-process/system-getters";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {useAppDispatch, useAppSelector} from "../../hooks";

function ApprovedApplicationDetails({ id }: {id: number}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const application : Application | undefined = useAppSelector(getApplicationDetails);
    const course = application?.selectedCourse ?? application?.desiredCourse;
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag || (!application) || (!application.participants))
        return <LoadingPage/>
    else
    return (
        <div className='pending-application-details'>
            <TextValueBlock textValueProps={[
                ['Учебный центр', course?.trainingCenter],
                ['Название курса', course?.name],
                ['Формат', `${course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} 
                ${course ? (course?.isCorporateTraining ? 
                    'только для нашей компании' : 'не только для нашей компании') : ''}`],
                ['Даты', `${stringToDate(course?.begin)} - ${stringToDate(course?.end)}`],
                ['Стоимость на одного', course?.costPerParticipant]
            ]}/>
            <TextValueBlock textValueProps={[
                ['Количество участников', application?.participants.length],
                ['ФИО участников', getFullNames(application.participants).join()]
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
