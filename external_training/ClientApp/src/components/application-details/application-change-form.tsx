import React, {useEffect, useState} from 'react';
import {NumberField, TextField} from '../common/InputField';
import {RadioGroup, RadioGroupWithStatus} from '../common/Radio';
import {SubmitButton2} from '../common/Button';
import {SmallCalendarDatePicker} from '../calendars/small-calendar/small-calendar-datepicker';
import {Form} from '../common/Form';
import {ApplicationStatus} from '../current-applications-utils/application-status';
import {Application, Course} from "../../types/application";
import {
    fetchApplicationDetailsAction,
    postAdminChangeStatus, postAdminEditDesiredCourse,
    postAdminEditSelectedCourse
} from "../../store/api-actions/api-actions";
import {getApplicationDetails, getIsDataLoading} from "../../store/system-process/system-getters";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getFullNames} from "../../helpers/get-full-names";
import {CardIndex, CardWithColumn} from "../common/Card";
import {ApplicationsStatusToData} from "../pages/my-applications/my-applications-page";
import {State} from "../../types/state";
import {noManagerApprovalStatuses} from "./flagStatuses";

const getManagers = (state: State) => state.managers;
const getEmployees = (state: State) => state.employees;

export function ApplicationChangeForm({ id }) {
    const application : Application = useAppSelector(getApplicationDetails);
    
    const dcourse = application?.desiredCourse;
    let scourse = !noManagerApprovalStatuses.includes(application.status) && application?.selectedCourse ? 
        application?.selectedCourse : application?.desiredCourse;
    
    const count = 2;

    const [eduCenter, setEduCenter] = useState(scourse?.trainingCenter ?? dcourse?.trainingCenter ?? "");
    const [courseTitle, setCourseTitle] = useState(scourse?.name ?? dcourse?.name ?? "");
    const [format, setFormat] = useState('');
    const [classmates, setClassmates] = useState('');
    const [price, setPrice] = useState(scourse?.costPerParticipant?.toString() ?? dcourse?.costPerParticipant?.toString() ?? "");
    const [numberOfPeople, setNumberOfPeople] = useState(application?.participants.length ?? 1);
    const [fullName, setFullName] = useState(getFullNames(application.participants).join() ?? "");
    const [status, setStatus] = useState<ApplicationStatus | undefined>(ApplicationStatus[application?.status as keyof typeof ApplicationStatus]);
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date(scourse?.begin ?? dcourse?.begin ?? ""));
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date(scourse?.end ?? dcourse?.end ?? ""));
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const submitHandler = (event, formData) => {
        event.preventDefault();

        const adminApplicationStatus = (formData.status === undefined) ? application.status : ApplicationsStatusToData.get(formData.status) ?? "";
        const adminCourse: Course = {
            courseId: scourse?.courseId ?? application.desiredCourse.courseId,
            trainingApplicationId: id,
            name: formData.courseTitle ?? courseTitle,
            isTrainingOnline: formData.format ? formData.format === '0' 
                : scourse?.isTrainingOnline ?? dcourse?.isTrainingOnline ?? false,
            isCorporateTraining: formData.classmates ? formData.classmates === '0' 
                : scourse?.isCorporateTraining ?? dcourse?.isCorporateTraining ?? false,
            trainingCenter: formData.eduCenter ?? eduCenter,
            costPerParticipant: +formData.price,
            totalCost: formData.price*formData.numberOfPeople,
            begin: formData.firstSelectedDate?.toISOString() ?? firstSelectedDate,
            end: formData.secondSelectedDate?.toISOString() ?? secondSelectedDate,
            category: "",
            description: "",
            participantFullNames: application.participants.map((part) => part.fullName),
        };

        if (status === ApplicationStatus.Editing) 
            dispatch(postAdminEditDesiredCourse(adminCourse))
        else
            dispatch(postAdminEditSelectedCourse(adminCourse));
        
        dispatch(postAdminChangeStatus({applicationId:id, status:adminApplicationStatus}))
            .then(() => dispatch(fetchApplicationDetailsAction(id)))
    };
    
    
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag || (!application))
        return <LoadingPage/>
    else
    return (
        <div className="flex flex-col mx-auto w-50 gap-[40px]">
                <form onSubmit={(event) => submitHandler(event, {
                    eduCenter,
                    courseTitle,
                    format,
                    classmates,
                    price,
                    numberOfPeople,
                    fullName,
                    status,
                    firstSelectedDate,
                    secondSelectedDate
                })} className='flex flex-col gap-[30px]'>
                    
                    
                    <CardWithColumn>
                        <CardIndex index={1} count={count} />
                        <TextField label='Учебный центр' value={eduCenter} onChange={setEduCenter} required={false}/>
                        <TextField label='Название курса' value={courseTitle} onChange={setCourseTitle} required={false}/>
                        <RadioGroup
                            label='Формат'
                            name='Формат'
                            radios={[
                                { title: 'Онлайн' },
                                { title: 'Оффлайн' }
                            ]}
                            onChange={setFormat}
                            required={false}
                        />
                        <RadioGroup
                            label='Однокурсники'
                            name='Однокурсники'
                            radios={[
                                { title: 'Только коллеги' },
                                { title: 'Люди из других компаний' }
                            ]}
                            onChange={setClassmates}
                            required={false}
                        />
                        <Form label="Даты">
                            <SmallCalendarDatePicker
                                setFirstSelectedDate={setFirstSelectedDate}
                                setSecondSelectedDate={setSecondSelectedDate}
                            />
                        </Form>
                        <NumberField label='Стоимость на одного' value={price} onChange={setPrice} required={false} />
                    </CardWithColumn>

                    <CardWithColumn>
                        <CardIndex index={2} count={count} />
                        <RadioGroupWithStatus
                            label='Изменить статус'
                            name='Изменить статус'
                            radios={ status === ApplicationStatus.Editing ? 
                                [ApplicationStatus.Editing]
                                :
                                [
                                ApplicationStatus.CourseSelection,
                                ApplicationStatus.AwaitingContractAndPayment,
                                ApplicationStatus.AwaitingPayment,
                                ApplicationStatus.AwaitingTraining,
                                ]}
                            onChange={setStatus}
                            required={false}
                        />
                    </CardWithColumn>

                    <div className='mt-[10px]'>
                        <SubmitButton2 text='Оформить' />
                    </div>
                </form>
        </div>
    );
}

