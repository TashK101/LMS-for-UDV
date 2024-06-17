import {useEffect, useState} from 'react';
import { CounterInput, NumberField, TextField } from '../common/InputField';
import { RadioGroup, RadioGroupWithStatus } from '../common/Radio';
import { SubmitButton2 } from '../common/Button';
import { SmallCalendarDatePicker } from '../calendars/small-calendar/small-calendar-datepicker';
import { Form } from '../common/Form';
import { ApplicationStatus } from '../current-applications-utils/application-status';
import {Application, Course} from "../../types/application";
import {fetchApplicationDetailsAction} from "../../store/api-actions/api-actions";
import {getApplicationDetails, getIsDataLoading} from "../../store/system-process/system-getters";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getFullNames} from "../../helpers/get-full-names";
import {CardIndex, CardWithColumn} from "../common/Card";

export function ApplicationChangeForm({ id }) {
    const application : Application = useAppSelector(getApplicationDetails);
    const dcourse = application?.desiredCourse;
    const scourse = application?.selectedCourse;
    const count = 3;

    const [eduCenter, setEduCenter] = useState(scourse?.trainingCenter ?? "");
    const [courseTitle, setCourseTitle] = useState(scourse?.name ?? dcourse?.name ?? "");
    const [format, setFormat] = useState('');
    const [classmates, setClassmates] = useState('');
    const [price, setPrice] = useState(scourse?.costPerParticipant?.toString() ?? dcourse?.costPerParticipant?.toString() ?? "");
    const [numberOfPeople, setNumberOfPeople] = useState(application?.participants.length ?? 1);
    const [fullName, setFullName] = useState(getFullNames(application.participants).join() ?? "");
    const [status, setStatus] = useState<ApplicationStatus | undefined>(undefined);
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date(scourse?.begin ?? dcourse?.begin ?? ""));
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date(scourse?.end ?? dcourse?.end ?? ""));
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const submitHandler = (event, formData) => {
        event.preventDefault();

        const adminApplication: AdminApplication = {
            trainingApplicationId: application?.trainingApplicationId ?? 0,
            status: (formData.status === undefined) ? "" : ApplicationsStatusToData.get(formData.status) ?? "",
            educationalCenter: formData.eduCenter,
            courseName: formData.courseTitle,
            participantsCount: +formData.numberOfPeople,
            participantsNames: formData.fullName,
            isTrainingOnline: formData.format === '1',
            isCorporateTraining: formData.classmates === '1',
            begin: formData.firstSelectedDate?.toISOString() ?? "",
            end: formData.secondSelectedDate?.toISOString() ?? "",
            costPerParticipant: +formData.price
        };

        dispatch(postAdminApplicationAction(adminApplication));
    };

   
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag || (!application))
        return <LoadingPage/>
    else
    return (
        <div className="flex flex-col mx-auto max-w-2xl gap-[40px] mt-[72px] mb-[80px]">
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
                        <TextField label='Учебный центр' value={eduCenter} onChange={setEduCenter} />
                        <TextField label='Название курса' value={courseTitle} onChange={setCourseTitle} />
                        <RadioGroup
                            label='Формат'
                            name='Формат'
                            radios={[
                                { title: 'Онлайн' },
                                { title: 'Оффлайн' }
                            ]}
                            onChange={setFormat}
                        />
                        <RadioGroup
                            label='Однокурсники'
                            name='Однокурсники'
                            radios={[
                                { title: 'Только коллеги' },
                                { title: 'Люди из других компаний' }
                            ]}
                            onChange={setClassmates}
                        />
                        <Form label="Желаемые даты">
                            <SmallCalendarDatePicker
                                setFirstSelectedDate={setFirstSelectedDate}
                                setSecondSelectedDate={setSecondSelectedDate}
                            />
                        </Form>
                        <NumberField label='Стоимость на одного' value={price} onChange={setPrice} />
                    </CardWithColumn>

                    <CardWithColumn>
                        <CardIndex index={2} count={count} />
                        <CounterInput label="Количество участников" value={numberOfPeople} onChange={setNumberOfPeople} />
                        <TextField label='ФИО участников' value={fullName} onChange={setFullName} />
                    </CardWithColumn>

                    <CardWithColumn>
                        <CardIndex index={3} count={count} />
                        <RadioGroupWithStatus
                            label='Изменить статус'
                            name='Изменить статус'
                            radios={[
                                ApplicationStatus.AwaitingContractAndPayment,
                                ApplicationStatus.AwaitingPayment,
                                ApplicationStatus.AwaitingTraining,
                            ]}
                            onChange={setStatus}
                        />
                    </CardWithColumn>

                    <div className='mt-[10px]'>
                        <SubmitButton2 text='Оформить' />
                    </div>
                </form>
        </div>
    );
}

