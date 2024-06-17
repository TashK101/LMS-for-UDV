import {TextValueBlock} from "./text-value-block";
import './application-details.css'
import {stringToDate} from "../../helpers/string-to-date";
import {getFullNames} from "../../helpers/get-full-names"
import {Application, Course} from "../../types/application";
import {useEffect} from "react";
import {
    fetchApplicationDetailsAction,
} from "../../store/api-actions/api-actions";
import {getApplicationDetails, getIsDataLoading} from "../../store/system-process/system-getters";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {LoadingPage} from "../pages/loading-page/loading-page";

function PendingApplicationDetails({ id }: {id: number}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const application : Application = useAppSelector(getApplicationDetails);
    const course = application?.desiredCourse;
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag || (!application))
        return <LoadingPage/>
    else
    return (
        <div className='pending-application-details'>
            <TextValueBlock textValueProps={[
                ['Количество участников', application?.participants.length],
                ['ФИО участников', getFullNames(application.participants).join()],
            ]}/>
            <TextValueBlock textValueProps={[
                ['Формат', `${course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} 
                ${course ? (course?.isCorporateTraining ?
                    'только для нашей компании' : 'не только для нашей компании') : ''}`],
                ['Даты', `${stringToDate(course?.begin)} - ${stringToDate(course?.end)}`],
                ['Похожие курсы', application?.similarPrograms],
                ['Стоимость на одного', `${course?.costPerParticipant } рублей`]
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
