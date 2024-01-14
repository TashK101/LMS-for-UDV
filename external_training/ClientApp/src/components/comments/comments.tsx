import {Comments} from "../../types/comments";
import {Comment} from "./comment";

type CommentsProps = {
    comments : Comments;
    authorId : string;
}
export function Comments({comments, authorId} : CommentsProps) : JSX.Element {
    return(
        <div className="w-[974px] h-[387px] relative">
            {comments.map((comment) => <Comment comment={comment} authorId={authorId}/>)}
        </div>
    )
}