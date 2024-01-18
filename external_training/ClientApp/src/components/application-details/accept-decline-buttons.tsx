import './application-details.css'
import React from 'react'
import {SubmitButton, SubmitButton2, SubmitButton3} from '../common/Button';
import {acceptAction, declineAction} from '../../store/api-actions/api-actions'
import {useAppDispatch} from "../../hooks";

export type AcceptDeclineProps = {
    TrainingApplicationId: number;
}

export function AcceptDeclineButton({trainingApplicationId}: AcceptDeclineProps): JSX.Element {
    const dispatch = useAppDispatch();
    const acceptHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const decision: AcceptDeclineProps = {
            TrainingApplicationId: trainingApplicationId,
        }
        dispatch(acceptAction(decision));
        //window.location.reload();
    }

    const declineHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const decision: AcceptDeclineProps = {
            TrainingApplicationId: trainingApplicationId,
        }
        dispatch(declineAction(decision));
        //window.location.reload();
    }

    return (
        <div className='flex'>
        <form
            onSubmit={acceptHandler}
            className='flex flex-col'>
            <div className='mt-[10px]'>
                <SubmitButton2 text='Принять'/>
            </div>
        </form>
        <form
            onSubmit={declineHandler}
            className='flex flex-col gap-[30px]'>
            <div className='mt-[10px] ml-[40px] bg-white'>
                <SubmitButton3 text='Отклонить'/>
            </div>
        </form>
        </div>
    );
}
