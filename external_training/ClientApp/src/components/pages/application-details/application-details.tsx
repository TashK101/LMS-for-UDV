//import { Comment }
//import { Header }
//import { backButton}
import {Application} from "../../../types/application";
import './application-details.css'
// export default function ApplicationDetails({elementLabel} : ApplicationDetailsProps) : JSX.Element {
//     return (
//         <div className="self-stretch h-14 flex-col justify-start items-start flex hover:bg-[#EDEDED]">
//             <div className="self-stretch h-14 px-3 py-2 justify-start items-center gap-3 inline-flex">
//                 <div className="w-6 h-6 relative" />
//                 <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
//                     <div className="self-stretch text-zinc-900 text-base font-normal font-['Golos']">{elementLabel}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export function ApplicationDetails(application: Application): JSX.Element {
    return (
        <div>
            <div className='application-details'>
                <h2 className='topic-text'>{application.trainingTopic}</h2>
                <p className='bold-text'>Статус:</p>
                {application.status}
                <p className='bold-text'>Подал:</p>
                {application.applicationUserName}

                <div className='pending-application-details'>
                    <div className='top-bottom-20'>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Количество участников</div>
                            <div className='regular-text'>{application.plannedParticipantsCount}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>ФИО участников</div>
                            <div className='regular-text'>{application.plannedParticipantsNames}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Департамент</div>
                            <div className='regular-text'>{application.department}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Отдел/команда</div>
                            <div className='regular-text'>{application.team}</div>
                        </div>
                        {/*рук*/}
                    </div>
                    <hr className="solid"></hr>
                    <div className='top-bottom-20'>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Формат</div>
                            <div className='regular-text'>{application.isTrainingOnline ? 'Онлайн' : 'Оффлайн'}, {application.isCorporateTraining ? 'только для нашей компании' : 'не только для нашей компании'}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Желаемые даты</div>
                            <div className='regular-text'>{application.desiredBegin} - {application.desiredEnd}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Похожие курсы</div>
                            <div className='regular-text'>{application.similarPrograms}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Стоимость на одного</div>
                            <div className='regular-text'>{application.estimatedCostPerParticipant} рублей</div>
                        </div>
                    </div>
                    <hr className="solid"></hr>
                    <div className='top-bottom-20'>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Мотивация</div>
                            <div className='regular-text'>{application.relevanceReason}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Цели обучения</div>
                            <div className='regular-text'>{application.trainingGoals}</div>
                        </div>
                        <div className='two-columns'>
                            <div className='half-transparent-text'>Приобретаемые навыки</div>
                            <div className='regular-text'>{application.skillsToBeAcquired}</div>
                        </div>
                        {application.applicationNotes ?
                            <div className='two-columns'>
                                <div className='half-transparent-text'>Примечания</div>
                                <div className='regular-text'>{application.applicationNotes}</div>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <hr className="solid"></hr>
                </div>
            </div>
        </div>
    );
}

