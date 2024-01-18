import {CommentsType} from "../../types/comments";
import {Comment} from "./comment";

type CommentsProps = {
    comments : CommentsType;
    authorId : string;
}
export function Comments({comments, authorId} : CommentsProps) : JSX.Element {
    return(
        <div className="flex flex-col w-full pl-[100px]">
            <div className="w-2/3 flex flex-col justify-center items-start gap-[50px] inline-flex">
                {comments.map((comment) => <Comment key={comment.createdAt} comment={comment} authorId={authorId}/>)}
            </div>
        </div>
    )
}