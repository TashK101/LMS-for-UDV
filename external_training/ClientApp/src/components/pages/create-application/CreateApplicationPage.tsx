import React, {useEffect, useState} from "react";
import {CardIndex, CardWithColumn} from "../../common/Card";
import {NumberField, TextArea, TextField} from '../../common/InputField';
import {RadioGroup} from '../../common/Radio';
import {SubmitButton} from '../../common/Button';
import {Form} from "../../common/Form";
import {SmallCalendarDatePicker} from "../../calendars/small-calendar/small-calendar-datepicker";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
    fetchEmployeesAction,
    fetchManagersAction,
    postNewApplicationAction
} from "../../../store/api-actions/api-actions";
import {State} from "../../../types/state";
import {ApprovingManager, Participant} from "../../../types/application";
import {INewApplication} from "../../../types/new-application";
import AutocompleteField, {
    AutocompleteOptionObject
} from "../../autocomplete-field/autocomplete-field.tsx";
import {getFullNames} from "../../../helpers/get-full-names";
import {H400} from "../../common/Text";
import {ApplicationDetailsAvatar} from "../../avatar/header-avatar.tsx";
import DeleteUserIcon from "../../application-details/delete-user-icon.tsx";
import clsx from "clsx";

const getManagers = (state: State) => state.managers;
const getEmployees = (state: State) => state.employees;

interface CreateApplicationPageProps {
    onSubmit: () => void
}

export function CreateApplicationPage({onSubmit}: CreateApplicationPageProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchManagersAction());
        dispatch(fetchEmployeesAction())
    }, []);

    const managers: ApprovingManager[] = useAppSelector(getManagers);
    const people: Participant[] = useAppSelector(getEmployees);

    const count = 5;
    const [topic, setTopic] = useState('')

    const [manager, setManager] = useState<AutocompleteOptionObject<string> | null>(null);
    const [employee, setEmployee] = useState<AutocompleteOptionObject<Participant> | null>(null);
    const [autocompleteUniqueKey, setAutocompleteUniqueKey] = useState<string>(new Date().toISOString());

    const [price, setPrice] = useState('')
    const [sameCourses, setSameCourses] = useState('')
    const [motivation, setMotivation] = useState('')
    const [goals, setGoals] = useState('')
    const [skills, setSkills] = useState('')
    const [note, setNote] = useState('')
    const [format, setFormat] = useState('')
    const [classmates, setClassmates] = useState('')

    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date("2024-06-15"));
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date("2024-06-17"));

    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<(Participant | undefined)[]>([]);

    const autocompleteManagerOptions = managers?.toSorted().map((m, index): AutocompleteOptionObject<string> => ({
        uniqueValue: m.appointmentId,
        label: getFullNames([m]).join(),
    }));

    /*const addField = () => {
        setFields([...fields, { key: new Date().toISOString(), value: null }]);
    };*/

    /*const handleOptionChange = (index: number, option: AutocompleteOptionObject<number> | null) => {
        const newFields = [...fields];
        newFields[index].value = option ? option.uniqueValue : null;
        setFields(newFields);

        const newSelectedIds = new Set(selectedIds);
        if (option && option.uniqueValue !== null) {
            newSelectedIds.add(option.uniqueValue);
        }
        setSelectedIds(newSelectedIds);
        console.log(Array.from(newSelectedIds))
    };*/

    const autocompleteEmployeeOptions = !people ? [] : people?.toSorted().map((m): AutocompleteOptionObject<Participant> => ({
        uniqueValue: m,
        label: getFullNames([m]).join(),
    }));

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const newApplication: INewApplication = {
            trainingTopic: topic,
            similarPrograms: sameCourses,
            approvingManagerSoloAppointmentIds: [manager?.uniqueValue ?? ''],
            participantSoloPersonIds: selectedEmployeeIds.map((employee) => employee ? employee.soloPersonId : ''),
            relevanceReason: motivation,
            trainingGoals: goals,
            skillsToBeAcquired: skills,
            applicationNotes: note,

            desiredCourse: {
                name: topic,
                isTrainingOnline: format === '1',
                isCorporateTraining: classmates === '1',
                begin: firstSelectedDate?.toISOString() ?? "",
                end: secondSelectedDate?.toISOString() ?? "",
                costPerParticipant: +price,
                totalCost: price * selectedEmployeeIds.length
            }
        }

        dispatch(postNewApplicationAction(newApplication))

        onSubmit()
        window.location.reload();
    }

    const handleEmployeesChange = (newOptionValue: (typeof employee)) => {
        setSelectedEmployeeIds((prevState) => {
            if (!prevState.includes(newOptionValue?.uniqueValue)) {
                return [...prevState, newOptionValue?.uniqueValue];
            } else {
                return [...prevState];
            }

        });
        setEmployee(() => null);
        setAutocompleteUniqueKey(() => new Date().toISOString())
    }

    return (
        <form
            onSubmit={submitHandler}
            className="flex flex-col mx-auto max-w-[600px] gap-[25px] py-[61px]">
            <CardWithColumn>
                <CardIndex index={1} count={count}/>
                <TextField label="Тема заявки" value={topic} onChange={setTopic}/>
            </CardWithColumn>

            <CardWithColumn>
                <CardIndex index={2} count={count}/>
                <div className='text-[24px] flex items-center gap-[20px]'>
                    <p>Количество участников:</p>
                    {<div className='relative'>
                        <label id='soloUsersCount' className={
                            clsx('text-[20px] pl-[10px] text-center p-2 bg-[#FFEDCF] border-[1px] border-[#F59D0E] w-[40px] h-[40px] flex justify-center items-center rounded-full',
                                {'bg-red-300': selectedEmployeeIds.length === 0})}>
                            {selectedEmployeeIds.length}
                        </label>
                        <input
                            placeholder=''
                            id='soloUsersCount'
                            type='number'
                            required
                            min={1}
                            value={selectedEmployeeIds.length < 1 ? undefined : selectedEmployeeIds.length}
                            className='bg-transparent absolute z-[-1] text-center p-2 bg-[#FFEDCF] border-[1px] border-[#F59D0E] w-[40px] h-[40px] top-0'/>
                    </div>}
                </div>

                <H400 text={"ФИО Участников"}/>
                {selectedEmployeeIds.length > 0 && <div className='flex flex-column gap-[8px]'>
                    {selectedEmployeeIds.map((emp, index) => (
                        <div key={index} className='pl-[8px] py-[4px] flex justify-between items-center pr-[20px]'>
                            <div className='flex items-center gap-[10px]'>
                                <ApplicationDetailsAvatar userFullName={emp?.fullName ?? ''}/>
                                <p>{emp?.fullName}</p>
                            </div>
                            <button className='float-right right-0' onClick={(evt) => {
                                evt.preventDefault();
                                setSelectedEmployeeIds((prevState) => prevState.toSpliced(prevState.indexOf(emp), 1))
                            }}>
                                <DeleteUserIcon/>
                            </button>
                        </div>
                    ))}
                </div>}
                <AutocompleteField<Participant>
                    uniqueKey={autocompleteUniqueKey}
                    options={autocompleteEmployeeOptions}
                    setOption={setEmployee}
                    onChange={handleEmployeesChange}/>

                <H400 text={"Согласующий руководитель"}/>
                <AutocompleteField<string>
                    options={autocompleteManagerOptions}
                    setOption={setManager}/>
                <button className="bg-orange-50 text-black px-4 py-2 rounded">
                    Добавить согласующего руководителя
                </button>
            </CardWithColumn>

            <CardWithColumn>
                <CardIndex index={3} count={count}/>

                <RadioGroup
                    label='Формат'
                    name='Формат'
                    radios={[
                        {title: 'Онлайн'},
                        {title: 'Оффлайн'}
                    ]}
                    onChange={setFormat}
                />

                <RadioGroup
                    label='Однокурсники'
                    name='Однокурсники'
                    radios={[
                        {title: 'Только коллеги'},
                        {title: 'Люди из других компаний'}
                    ]}
                    onChange={setClassmates}
                />

                {<Form label="Желаемые даты">
                    <SmallCalendarDatePicker
                        setFirstSelectedDate={setFirstSelectedDate}
                        setSecondSelectedDate={setSecondSelectedDate}
                    />
                </Form>}

                <NumberField label="Стоимость на одного" value={price} onChange={setPrice}/>
                <TextField label="Похожие курсы (если есть)" required={false} value={sameCourses}
                           onChange={setSameCourses}/>
            </CardWithColumn>

            <CardWithColumn>
                <CardIndex index={4} count={count}/>
                <TextArea label="Мотивация - почему этот курс актуален именно сейчас?" value={motivation}
                          onChange={setMotivation}/>
                <TextArea label="Цели обучения" value={goals} onChange={setGoals}/>
                <TextArea label="Приобретаемые навыки" value={skills} onChange={setSkills}/>
            </CardWithColumn>

            <CardWithColumn>
                <CardIndex index={5} count={count}/>
                <TextArea required={false} label="Примечания к заявке (не обязательно)" value={note}
                          onChange={setNote}/>
            </CardWithColumn>

            <div className="mt-[15px]">
                <SubmitButton text="Отправить"/>
            </div>
        </form>
    )
}
