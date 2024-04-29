export type CommentType = {
    content: string,
    createdAt: string,
    userId: string,
    userFullName: string
}

export type SentCommentType = {
    trainingApplicationId: number,
    comment: string
}

export type CommentsType = CommentType[];