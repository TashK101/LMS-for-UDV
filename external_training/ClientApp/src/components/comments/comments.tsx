import {CommentsType} from "../../types/comments";
import {Comment} from "./comment";

type CommentsProps = {
    comments : CommentsType;
    authorId : string;
}
export function Comments({comments, authorId} : CommentsProps) : JSX.Element {
    return(
        <div className="flex flex-col gap-[50px] px-[50px]">
            {comments.map((comment) => <Comment key={comment.createdAt} comment={comment} authorId={authorId}/>)}
        </div>
    )
}