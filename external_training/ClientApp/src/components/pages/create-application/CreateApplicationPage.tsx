import { useState } from "react";
import { CardIndex, CardWithColumn} from "../../common/Card";
import { CounterInput, TextArea, TextField } from '../../common/InputField';
import { RadioGroup } from '../../common/Radio';
import { SubmitButton } from '../../common/Button';

export function CreateApplicationPage() {
  const count = 5;

  const [topic, setTopic] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [team, setTeam] = useState('')
  const [manager, setManager] = useState('')
  const [price, setPrice] = useState('')
  const [sameCourses, setSameCourses] = useState('')
  const [motivation, setMotivation] = useState('')
  const [goals, setGoals] = useState('')
  const [skills, setSkills] = useState('')
  const [note, setNote] = useState('')
  const [format, setFormat] = useState('')
  const [classmates, setClassmates] = useState('')


  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("hello")
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
        <TextField label="Департамент" value={department} onChange={setDepartment} />
        <TextField label="Отдел/команда" value={team} onChange={setTeam} />
        <TextField label="Согласующий руководитель" value={manager} onChange={setManager} />
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

        <TextField label="Стоимость на одного" value={price} onChange={setPrice} />
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
        <TextArea label="Примечания к заявке (не обязательно)" value={note} onChange={setNote} />
      </CardWithColumn>

      <div className="mt-[15px]">
        <SubmitButton text="Отправить" />
      </div>
    </form>
  )
}
