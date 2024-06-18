import React, {useEffect, useState} from 'react';
import {NumberField, TextField} from '../common/InputField';
import {RadioGroup, RadioGroupWithStatus} from '../common/Radio';
import {SubmitButton2} from '../common/Button';
import {SmallCalendarDatePicker} from '../calendars/small-calendar/small-calendar-datepicker';
import {Form} from '../common/Form';
import {ApplicationStatus} from '../current-applications-utils/application-status';
import {Application, ApprovingManager, Course, Participant} from "../../types/application";
import {
    fetchApplicationDetailsAction,
    postAdminChangeStatus,
    postAdminEditSelectedCourse
} from "../../store/api-actions/api-actions";
import {getApplicationDetails, getIsDataLoading} from "../../store/system-process/system-getters";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getFullNames} from "../../helpers/get-full-names";
import {CardIndex, CardWithColumn} from "../common/Card";
import {ApplicationsStatusToData} from "../pages/my-applications/my-applications-page";
import {AutocompleteOptionObject} from "../calendars/large-calendar/calendar-filters/autocomplete-field";
import {State} from "../../types/state";

const getManagers = (state: State) => state.managers;
const getEmployees = (state: State) => state.employees;

export function ApplicationChangeForm({ id }) {
    const application : Application = useAppSelector(getApplicationDetails);
    
    const dcourse = application?.desiredCourse;
    let scourse = application?.selectedCourse;
    if (application.status === "Редактирование") scourse = application?.desiredCourse;
    
    const count = 2;

    const [eduCenter, setEduCenter] = useState(scourse?.trainingCenter ?? "");
    const [courseTitle, setCourseTitle] = useState(scourse?.name ?? dcourse?.name ?? "");
    const [format, setFormat] = useState('');
    const [classmates, setClassmates] = useState('');
    const [price, setPrice] = useState(scourse?.costPerParticipant?.toString() ?? dcourse?.costPerParticipant?.toString() ?? "");
    const [numberOfPeople, setNumberOfPeople] = useState(application?.participants.length ?? 1);
    const [fullName, setFullName] = useState(getFullNames(application.participants).join() ?? "");
    const [status, setStatus] = useState<ApplicationStatus | undefined>( undefined);
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date(scourse?.begin ?? dcourse?.begin ?? ""));
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date(scourse?.end ?? dcourse?.end ?? ""));
    
    const dispatch = useAppDispatch();

    

    const managers: ApprovingManager[] = useAppSelector(getManagers);
    const people: Participant[] = useAppSelector(getEmployees);

    const [manager, setManager] = useState<AutocompleteOptionObject<string> | null>(null);
    const [depManager, setDepManager] = useState<AutocompleteOptionObject<string> | null>(null);
    const [employee, setEmployee] = useState<AutocompleteOptionObject<Participant> | null>(null);
    const [autocompleteUniqueKey, setAutocompleteUniqueKey] = useState<string>(new Date().toISOString());

    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<(Participant | undefined)[]>([]);

    const autocompleteManagerOptions = managers?.toSorted().map((m, index): AutocompleteOptionObject<string> => ({
        uniqueValue: m.appointmentId,
        label: getFullNames([m]).join(),
    }));

    const autocompleteDepManagerOptions = managers?.toSorted().map((m, index): AutocompleteOptionObject<string> => ({
        uniqueValue: m.appointmentId,
        label: getFullNames([m]).join(),
    }));

    const autocompleteEmployeeOptions = !people ? [] : people?.toSorted().map((m): AutocompleteOptionObject<Participant> => ({
        uniqueValue: m,
        label: getFullNames([m]).join(),
    }));

    const handleEmployeesChange = (newOptionValue: (typeof employee)) => {
        setSelectedEmployeeIds((prevState) => {
            if (!prevState.includes(newOptionValue?.uniqueValue)) {
                return [...prevState, newOptionValue?.uniqueValue];
            } else {
                return [...prevState];
            }

        });
        setEmployee(() => null);
        setAutocompleteUniqueKey(() => new Date().toISOString());
    }
    
    useEffect(() => {
        dispatch(fetchApplicationDetailsAction(id));
    }, []);

    const submitHandler = (event, formData) => {
        event.preventDefault();

        const adminApplicationStatus = (formData.status === undefined) ? application.status : ApplicationsStatusToData.get(formData.status) ?? "";
        const adminCourse: Course = {
            courseId: application.selectedCourse.courseId === null ? application.desiredCourse.courseId : application.selectedCourse.courseId,
            trainingApplicationId: id,
            name: formData.courseTitle ?? courseTitle,
            isTrainingOnline: formData.format === '1',
            isCorporateTraining: formData.classmates === '1',
            trainingCenter: formData.eduCenter ?? eduCenter,
            costPerParticipant: +formData.price,
            totalCost: formData.price*formData.numberOfPeople,
            begin: formData.firstSelectedDate?.toISOString() ?? firstSelectedDate,
            end: formData.secondSelectedDate?.toISOString() ?? secondSelectedDate,
            category: "",
            description: "",
            participantFullNames: application.participants.map((part) => part.fullName),
        };

        dispatch(postAdminEditSelectedCourse(adminCourse));
        dispatch(postAdminChangeStatus({applicationId:id, status:adminApplicationStatus}))
            .then(() => dispatch(fetchApplicationDetailsAction(id)))
        console.log(adminApplicationStatus)
        
    };
    
    
    let loadingFlag = useAppSelector(getIsDataLoading);
    if (loadingFlag || (!application))
        return <LoadingPage/>
    else
    return (
        <div className="flex flex-col mx-auto max-w-96 gap-[40px]">
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
                            radios={[
                                ApplicationStatus.CourseSelection,
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

