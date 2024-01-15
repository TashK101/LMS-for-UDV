import React, { useState } from 'react'
import { ProfileImage } from '../../common/Image';
import { H400, H700 } from '../../common/Text';
import { CardIndex, CardWithColumn } from "../../common/Card";
import { CounterInput, TextField } from '../../common/InputField';
import { RadioGroup, RadioGroupWithComponent } from '../../common/Radio';
import { SubmitButton2 } from '../../common/Button';
import { StatusComponent, StatusType } from '../../common/Status';
import SmallCalendarDatePicker from '../../calendars/small-calendar/small-calendar-datepicker';
import { Form } from '../../common/Form';
import { ModeSwitchButton } from '../../current-applications-utils/mode-switch-button';

export function ApplicationPage() {
  const count = 3

  const [eduCenter, setEduCenter] = useState('')
  const [courseTitle, setCourseTitle] = useState('')
  const [format, setFormat] = useState('')
  const [classmates, setClassmates] = useState('')
  const [price, setPrice] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [fullName, setFullName] = useState('Иванов Иван Иванович')
  const [department, setDepartment] = useState('UX/UI')
  const [team, setTeam] = useState("Команда 29")
  const [status, setStatus] = useState('')
  const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>();
  const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>();
  const [showSecond, setShowSecond] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("hello")
  }

  return (
    <div
      className="flex flex-col mx-auto max-w-2xl gap-[40px] mt-[72px] mb-[80px]">
      <H700 text='Компьютерное зрение' />

      <div className='flex flex-row gap-[30px] items-center'>
        <p className="font-golos text-color7 text-[20px] font-[600]">Статус</p>
        <StatusComponent statusType={StatusType.COURSE_SELECTION} />
      </div>

      <div className='flex flex-row gap-[60px] items-center'>
        <InfoBlock label='Подал' fullName='Иванов Иван Иванович' />
        <InfoBlock label='Согласовал' fullName='Петров Пётр Петрович' />
      </div>

      <ModeSwitchButton contentMode={showSecond}
        setContentMode={setShowSecond}
        leftPartText={"Исходная заявка"}
        rightPartText={"Оформление"} />

      {showSecond &&
        <form
          onSubmit={submitHandler}
          className='flex flex-col gap-[30px]'>
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
            <TextField label='Стоимость на одного' value={price} onChange={setPrice} />
          </CardWithColumn>

          <CardWithColumn>
            <CardIndex index={2} count={count} />
            <CounterInput label="Количество участников" value={numberOfPeople} onChange={setNumberOfPeople} />
            <TextField label='ФИО участников' value={fullName} onChange={setFullName} />
            <TextField label="Департамент" value={department} onChange={setDepartment} />
            <TextField label="Отдел/команда" value={team} onChange={setTeam} />
          </CardWithColumn>

          <CardWithColumn>
            <CardIndex index={3} count={count} />
            <RadioGroupWithComponent
              label='Изменить статус'
              name='Изменить статус'
              radios={[
                { children: <StatusComponent statusType={StatusType.AWAIT_CONTRACT_AND_PAYMENT} /> },
                { children: <StatusComponent statusType={StatusType.AWAIT_PAYMENT} /> },
                { children: <StatusComponent statusType={StatusType.APPROVED} /> }
              ]}
              onChange={setStatus}
            />
          </CardWithColumn>

          <div className='mt-[10px]'>
            <SubmitButton2 text='Оформить' />
          </div>
        </form>
      }
    </div>
  )
}

interface InfoBlockProps {
  label: string,
  fullName: string
}

function InfoBlock({ label, fullName }: InfoBlockProps) {
  const words: string[] = fullName.split(' ');
  return (
    <div className='flex flex-col gap-[30px]'>
      <p className="font-golos text-color7 text-[20px] font-[600]">{label}</p>
      <div className='flex flex-row gap-[15px] items-center'>
        <ProfileImage name={words[0]} surname={words[1]} />
        <H400 fontSize={16} text={fullName} />
      </div>
    </div>
  )
}
