import {CommentAvatar} from "../avatar/comment-avatar";
import {CommentType} from "../../types/comments";
import {stringToDate} from "../../helpers/string-to-date";

type CommentProps = {
    comment: CommentType;
    authorId: string;
}
export function Comment({comment, authorId} : CommentProps) : JSX.Element {
    const bg = authorId === comment.userId ? 'bg-stone-300' : 'bg-white';
    return(
        <div className={`w-full px-[60px] justify-start flex`}>
            <div className="flex flex-col w-2/3 items-start gap-2.5">
                <div className="py-[5px] gap-2.5 inline-flex">
                    <CommentAvatar userFullName={comment.userFullName}/>
                    <div className="flex-col justify-center items-start gap-2.5 inline-flex">
                        <p className="text-center text-zinc-800 text-xl font-normal font-['Golos']">{comment.userFullName}</p>
                        <p className="text-zinc-500 text-base font-normal font-['Golos']">{stringToDate(comment.createdAt)}</p>
                    </div>
                </div>
                <div className={`px-[30px] py-5 ${bg} rounded-[5px] shadow border border-stone-300 justify-center flex-col items-end flex`}>
                    <p className=" text-zinc-800 text-base text-wrap break-all font-normal font-['Golos']">{comment.content}</p>
                </div>
            </div>
        </div>
    )
}

