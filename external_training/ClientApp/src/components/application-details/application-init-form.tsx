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
import {H400} from "../common/Text";
import {ApplicationDetailsAvatar} from "../avatar/header-avatar";

function ApplicationInitForm({ id }: {id: number}) {
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
                <H400 text={"Количество участников"}/>
                <p>{application?.participants.length}</p>
                <br/>

                <H400 text={"ФИО участников"}/>
                {getFullNames(application.participants).map((name, index) => (
                    <div className='flex items-center gap-[15px] m-b4'>
                    <ApplicationDetailsAvatar userFullName={name} /> 
                    <p key={index}>{name}</p>
                    </div>
                ))}
                <br/>

                <H400 text={"Формат"}/>
                <p>{course ? (course?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''} {course ? (course?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}</p>
                <br/>
                
                <H400 text={"Даты"}/>
                <p>{stringToDate(course?.begin)} - {stringToDate(course?.end)}</p>
                <br/>
                
                <H400 text={"Похожие курсы"}/>
                <p>{application?.similarPrograms}</p>
                <br/>
                
                <H400 text={"Стоимость на одного"}/>
                <p>{course?.costPerParticipant} рублей</p>
                <br/>

                <H400 text={"Мотивация"}/>
                <p>{application?.relevanceReason}</p>
                <br/>
                
                <H400 text={"Цели обучения"}/>
                <p>{application?.trainingGoals}</p>
                <br/>
                
                <H400 text={"Приобретаемые навыки"}/>
                <p>{application?.skillsToBeAcquired}</p>
                <br/>
                
                <H400 text={"Примечания"}/>
                <p>{application?.applicationNotes}</p>
            </div>
        );
}

export default ApplicationInitForm;

