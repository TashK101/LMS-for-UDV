import React, {useState} from 'react'
import {ProfileImage} from '../../common/Image';
import {H400, H700} from '../../common/Text';
import {CardIndex, CardWithColumn} from "../../common/Card";
import {CounterInput, NumberField, TextField} from '../../common/InputField';
import {RadioGroup, RadioGroupWithStatus} from '../../common/Radio';
import {SubmitButton2} from '../../common/Button';
import {StatusComponent} from '../../common/Status';
import {SmallCalendarDatePicker} from '../../calendars/small-calendar/small-calendar-datepicker';
import {Form} from '../../common/Form';
import {ModeSwitchButton} from '../../current-applications-utils/mode-switch-button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { AdminApplication } from '../../../types/admin-application';
import { postAdminApplicationAction } from '../../../store/api-actions/api-actions';
import { getApplicationDetails, getCourseDetails } from '../../../store/system-process/system-getters';
import { ApplicationsStatusToData } from '../my-applications/my-applications-page.tsx';
import { ApplicationStatus } from '../../current-applications-utils/application-status';
import {TextValueBlock} from "../../application-details/text-value-block";
import {stringToDate} from "../../../string-to-date";

export function ApplicationPage() {
    const application = useAppSelector(getApplicationDetails);
    const currentStatus = ApplicationStatus[application?.status as keyof typeof ApplicationStatus];
    const course = useAppSelector(getCourseDetails);

    const count = 3

    const [eduCenter, setEduCenter] = useState(course?.educationalCenter ?? "")
    const [courseTitle, setCourseTitle] = useState(course?.courseName ?? application?.trainingTopic ?? "")
    const [format, setFormat] = useState('')
    const [classmates, setClassmates] = useState('')
    const [price, setPrice] = useState(course?.costPerParticipant?.toString() ?? application?.estimatedCostPerParticipant?.toString() ?? "")
    const [numberOfPeople, setNumberOfPeople] = useState(course?.participantsCount ?? application?.plannedParticipantsCount ?? 0)
    const [fullName, setFullName] = useState(course?.participantsNames?? application?.plannedParticipantsNames ?? "")
    const [status, setStatus] = useState<ApplicationStatus | undefined>(undefined)
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>(new Date(course?.begin ?? application?.desiredBegin ?? ""));
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>(new Date(course?.end ?? application?.desiredEnd ?? ""));
    const [showSecond, setShowSecond] = useState(true);

    const dispatch = useAppDispatch();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        const adminApplication: AdminApplication = {
            trainingApplicationId: application?.trainingApplicationId ?? 0,
            status: (status===undefined) ? "" : ApplicationsStatusToData.get(status) ?? "",
            educationalCenter: eduCenter,
            courseName: courseTitle,
            participantsCount: +numberOfPeople,
            participantsNames: fullName,
            isTrainingOnline: format === '1',
            isCorporateTraining: classmates === '1',
            begin: firstSelectedDate?.toISOString() ?? "",
            end: secondSelectedDate?.toISOString() ?? "",
            costPerParticipant: +price
        }
        dispatch(postAdminApplicationAction(adminApplication))
    }
    return (
        <div
            className="flex flex-col mx-auto max-w-2xl gap-[40px] mt-[72px] mb-[80px]">
            <H700 text={courseTitle} />

            <div className='flex flex-row gap-[30px] items-center'>
                <p className="font-golos text-color7 text-[20px] font-[600]">Статус</p>
                <StatusComponent statusType={currentStatus} />
            </div>

            <div className='flex flex-row gap-[60px] items-center'>
                <InfoBlock label='Подал' fullName={application?.applicationUserName ?? ""} />
                <InfoBlock label='Согласовал' fullName={application?.desiredManagerName ?? ""} />
            </div>

            <ModeSwitchButton contentMode={showSecond}
                setContentMode={setShowSecond}
                leftPartText={"Исходная заявка"}
                rightPartText={"Оформление"} />

            {!showSecond &&
                <div className='pending-application-details'>
                    <TextValueBlock textValueProps={[
                        ['Количество участников', application?.plannedParticipantsCount],
                        ['ФИО участников', application?.plannedParticipantsNames],
                        ['Департамент', application?.department],
                        ['Отдел/команда', application?.team],
                        ['Согласующий руководитель', application?.desiredManagerName]
                    ]}/>
                    <TextValueBlock textValueProps={[
                        ['Формат', `${application ? (application?.isTrainingOnline ? 'Онлайн,' : 'Оффлайн,') : ''}
                        ${application? (application?.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании') : ''}`],
                        ['Желаемые даты', `${stringToDate(application?.desiredBegin)} - ${stringToDate(application?.desiredEnd)}`],
                        ['Похожие курсы', application?.similarPrograms],
                        ['Стоимость на одного', `${application?.estimatedCostPerParticipant} рублей`]
                    ]}/>
                    <TextValueBlock textValueProps={[
                        ['Мотивация', application?.relevanceReason],
                        ['Цели обучения', application?.trainingGoals],
                        ['Приобретаемые навыки', application?.skillsToBeAcquired],
                        ['Примечания', application?.applicationNotes]
                    ]}/>
                </div>
            }
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
                        {<Form label="Желаемые даты">
                            <SmallCalendarDatePicker
                                setFirstSelectedDate={setFirstSelectedDate}
                                setSecondSelectedDate={setSecondSelectedDate}
                            />
                        </Form>}
                        <NumberField label='Стоимость на одного' value={price} onChange={setPrice} />
                    </CardWithColumn>

                    <CardWithColumn>
                        <CardIndex index={2} count={count} />
                        <CounterInput label="Количество участников" value={numberOfPeople}
                            onChange={setNumberOfPeople} />
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
