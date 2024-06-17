import React, {useEffect, useState} from "react";
import {CardIndex, CardWithColumn} from "../../common/Card";
import {CounterInput, NumberField, TextArea, TextField} from '../../common/InputField';
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
import {ManagerDropDownMenu} from "../../common/ManagerDropDownMenu";
import {Application, ApprovingManager, Course, Participant} from "../../../types/application";
import {INewApplication} from "../../../types/new-application";
import AutocompleteField, {
    AutocompleteOptionObject
} from "../../calendars/large-calendar/calendar-filters/autocomplete-field";
import {getFullNames} from "../../../helpers/get-full-names";
import {H400} from "../../common/Text";

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
    const people : Participant[] = useAppSelector(getEmployees);

    const count = 5;
    const [topic, setTopic] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState(0)

    const [manager, setManager] = useState<AutocompleteOptionObject<number> | null>(null);
    const [employee, setEmployee] = useState<AutocompleteOptionObject<number> | null>(null);
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

    const autocompleteEmployeeOptions = people?.toSorted().map((m, index): AutocompleteOptionObject<string> => ({
        uniqueValue: m.soloPersonId,
        label: getFullNames([m]).join(),
    }));

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const newApplication: INewApplication = {
            trainingTopic: topic,
            similarPrograms: sameCourses,
            approvingManagerSoloAppointmentIds: [manager?.uniqueValue.toString()],
            participantSoloPersonIds: [employee?.uniqueValue.toString()],
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
                totalCost: price * numberOfPeople
            }
        }

        dispatch(postNewApplicationAction(newApplication))

        onSubmit()
        window.location.reload();
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
                <CounterInput label="Количество участников" value={numberOfPeople} onChange={setNumberOfPeople}/>
                
                <H400 text={"ФИО Участников"} />
                <AutocompleteField<string>
                    options={autocompleteEmployeeOptions}
                    setOption={setEmployee}
                    uniqueKey={autocompleteUniqueKey}/>
                <button type="submit" className="bg-orange-50 text-black px-4 py-2 rounded">
                    Добавить участника
                </button>
                
                <H400 text={"Согласующий руководитель"} />
                <AutocompleteField<string>
                    options={autocompleteManagerOptions}
                    setOption={setManager}
                    uniqueKey={autocompleteUniqueKey}/>
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
