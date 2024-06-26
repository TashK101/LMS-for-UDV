import { useEffect, useState } from 'react';
import { Card, CardWithColumn } from "../../common/Card";
import { H400, H500, H600 } from '../../common/Text';
import { ProfileImageLarge } from '../../common/Image';
import { PasswordField, TextField } from '../../common/InputField';
import { RadioGroup } from '../../common/Radio';
import {Header} from "../../header/header";
import { SubmitButton } from '../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchStartConfigAction } from '../../../store/api-actions/api-actions';
import { State } from '../../../types/state';

const getUserFullName = (state: State) => state.userFullName;
const getUserEmail = (state: State) => state.userEmail;

export function SettingsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStartConfigAction());
  }, []);

  const userFullName = useAppSelector(getUserFullName);
  const userEmail = useAppSelector(getUserEmail);
  
  const [surname, setSurname] = useState(userFullName.split(" ")[0])
  const [name, setName] = useState(userFullName.split(" ")[1])
  const [patronymic, setPatronymic] = useState(userFullName.split(" ")[2])
  const [department, setDepartment] = useState('')
  const [team, setTeam] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [manager, setManager] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [gender, setGender] = useState('')

  return (
      <>
    <Header/>
    <form className="flex flex-col mx-auto max-w-2xl gap-[50px] py-16">
      <Card>
        <div className='flex items-center gap-[40px]'>
          <ProfileImageLarge name={name} surname={surname} />
          <div className='flex flex-col gap-[20px]'>
            <H600 text={userFullName} />
            <H400 text={userEmail}/>
          </div>
        </div>
      </Card>

      <CardWithColumn>
        <H500 text='Личные данные' />
        <TextField label='Фамилия' placeholder='Иванов' value={surname} onChange={setSurname} />
        <TextField label='Имя' placeholder='Иван' value={name} onChange={setName} />
        <TextField label='Отчество' placeholder='Иванович' value={patronymic} onChange={setPatronymic} />
        <RadioGroup
          label='Пол'
          name='Пол'
          radios={[
            { title: 'Мужской' },
            { title: 'Женский' }
          ]}
          onChange={setGender}
        />
      </CardWithColumn>

      <CardWithColumn>
        <H500 text='Данные в организации' />
        <TextField label='Департамент' placeholder='UI/UX' value={department} onChange={setDepartment} />
        <TextField label='Отдел/команда' placeholder='Команда разработки «Во!»' value={team} onChange={setTeam} />
        <TextField label='Должность' placeholder='ui/ux дизайнер junior' value={jobTitle} onChange={setJobTitle} />
        <TextField label='Руководитель' placeholder='Петров Пётр Петрович' value={manager} onChange={setManager} />
      </CardWithColumn>

      <CardWithColumn>
        <H500 text='Сменить пароль' />
        <PasswordField label='Текущий пароль' value={currentPassword} onChange={setCurrentPassword} />
        <PasswordField label='Новый пароль' value={newPassword} onChange={setNewPassword} />
        <PasswordField label='Повторите пароль' value={repeatPassword} onChange={setRepeatPassword} />
      </CardWithColumn>
      <SubmitButton text="Отправить" />
    </form>
      </>);
}
