import {CommentAvatar} from "../avatar/comment-avatar";
import {Comment} from "../../types/comments";

type CommentProps = {
    comment: Comment;
    authorId: string;
}
export function Comment({comment} : CommentProps) : JSX.Element {
    return(
        <div className="left-[544px] top-[243px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="py-[5px] justify-center items-center gap-2.5 inline-flex">
                <CommentAvatar userFullName={comment.userFullName}/>
                <div className="flex-col justify-center items-start gap-2.5 inline-flex">
                    <div className="text-center text-zinc-800 text-xl font-normal font-['Golos']">{comment.userFullName}</div>
                    <div className="text-zinc-500 text-base font-normal font-['Golos']">{comment.createdAt}</div>
                </div>
            </div>
            <div className="px-[30px] py-5 bg-stone-300 rounded-[5px] shadow border border-stone-300 flex-col justify-center items-end gap-2.5 flex">
                <div className="w-[370px] text-zinc-800 text-xl font-normal font-['Golos']">{comment.content}</div>
            </div>
        </div>
    )
}
