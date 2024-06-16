import { useEffect, useState } from "react";
import { CardIndex, CardWithColumn } from "../../common/Card";
import { CounterInput, NumberField, TextArea, TextField } from '../../common/InputField';
import { RadioGroup } from '../../common/Radio';
import { SubmitButton } from '../../common/Button';
import { Form } from "../../common/Form";
import { SmallCalendarDatePicker } from "../../calendars/small-calendar/small-calendar-datepicker";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchManagersAction, postNewApplicationAction } from "../../../store/api-actions/api-actions";
import { State } from "../../../types/state";
import {ManagerDropDownMenu} from "../../common/ManagerDropDownMenu";
import {Application, ApprovingManager, Course} from "../../../types/application";
import {INewApplication} from "../../../types/new-application";

// const managers: Manager[] = [
//   { managerId: "1", fullName: "Николай Николаевич" },
//   { managerId: "2", fullName: "Алексей Алексеевич" }
// ]

const getManagers = (state: State) => state.managers;

interface CreateApplicationPageProps {
  onSubmit: () => void
}

export function CreateApplicationPage({ onSubmit }: CreateApplicationPageProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchManagersAction());
  }, []);

  const managers: ApprovingManager[] = useAppSelector(getManagers);

  const count = 5;
  const [topic, setTopic] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [name, setName] = useState('')
  const [manager, setManager] = useState<ApprovingManager | undefined>(undefined) //(managers?.length === 0) ? undefined : managers[0]
  const [price, setPrice] = useState('')
  const [sameCourses, setSameCourses] = useState('')
  const [motivation, setMotivation] = useState('')
  const [goals, setGoals] = useState('')
  const [skills, setSkills] = useState('')
  const [note, setNote] = useState('')
  const [format, setFormat] = useState('')
  const [classmates, setClassmates] = useState('')
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date("2024-01-15"));
  const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date("2024-01-17"));


  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    const newApplication: INewApplication = {
        trainingTopic: topic,
        similarPrograms: sameCourses,
        approvingManagerSoloAppointmentIds: [manager?.appointmentId],
        participantSoloPersonIds: [manager?.appointmentId],
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
        <CardIndex index={1} count={count} />
        <TextField label="Тема заявки" value={topic} onChange={setTopic} />
      </CardWithColumn>

      <CardWithColumn>
        <CardIndex index={2} count={count} />
        <CounterInput label="Количество участников" value={numberOfPeople} onChange={setNumberOfPeople} />
        <TextField label="ФИО участников" value={name} onChange={setName} />
        <Form label="Согласующие руководители">
          <ManagerDropDownMenu
            managers={managers}
            selectedManager={manager}
            onClick={value => setManager(managers?.find(i => i.appointmentId === value))}
          />
        </Form>
      </CardWithColumn>

      <CardWithColumn>
        <CardIndex index={3} count={count} />

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

        {<Form label="Желаемые даты">
          <SmallCalendarDatePicker
            setFirstSelectedDate={setFirstSelectedDate}
            setSecondSelectedDate={setSecondSelectedDate}
          />
        </Form>}

        <NumberField label="Стоимость на одного" value={price} onChange={setPrice} />
        <TextField label="Похожие курсы (если есть)" required={false} value={sameCourses} onChange={setSameCourses} />
      </CardWithColumn>

      <CardWithColumn>
        <CardIndex index={4} count={count} />
        <TextArea label="Мотивация - почему этот курс актуален именно сейчас?" value={motivation} onChange={setMotivation} />
        <TextArea label="Цели обучения" value={goals} onChange={setGoals} />
        <TextArea label="Приобретаемые навыки" value={skills} onChange={setSkills} />
      </CardWithColumn>

      <CardWithColumn>
        <CardIndex index={5} count={count} />
        <TextArea required={false} label="Примечания к заявке (не обязательно)" value={note} onChange={setNote} />
      </CardWithColumn>

      <div className="mt-[15px]">
        <SubmitButton text="Отправить" />
      </div>
    </form>
  )
}
