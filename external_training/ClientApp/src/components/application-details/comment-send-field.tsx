import './application-details.css'
import React, {useId, useState} from 'react'
import {SubmitButton2} from '../common/Button';
import {
    postUserCommentAction
} from '../../store/api-actions/api-actions'
import {SentCommentType} from "../../types/comments";
import {useAppDispatch} from "../../hooks";

interface CreateCommentProps {
    trainingApplicationId:number
}

export function CommentSendField({trainingApplicationId}: CreateCommentProps): JSX.Element {
    const dispatch = useAppDispatch();

    const [comment, setComment] = useState("");
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const newComment: SentCommentType = {
            trainingApplicationId: trainingApplicationId,
            comment: comment
        }
        dispatch(postUserCommentAction(newComment));
        window.location.reload();

    }

    return (
        <form
            onSubmit={submitHandler}
            className='flex flex-col gap-[30px]'>

            <div className="relative">
                <textarea id="floating_outlined"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          className="border-2 w-[600px] h-[200px] block px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-700 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                          // placeholder=" "
                />
                <label htmlFor="floating_outlined"
                       className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Комментарий
                </label>
            </div>


            <div className='mt-[10px] button-cont'>
                <SubmitButton2 text='Отправить'/>
            </div>
        </form>
    );
}
