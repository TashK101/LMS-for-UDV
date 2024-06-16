// export enum ApplicationStatus {
//     Approved = "Утверждено",
//     NotApproved = "Не согласовано",
//     AwaitingManagerApproval = "Ждёт согласования руководителя",
//     CourseSelection = "Идёт подбор курса",
//     AwaitingPayment = "Ждёт оплату",
//     AwaitingContractAndPayment = "Ждёт договор и оплату",
//     AwaitingContract = "Ждёт договор",
// }

export enum ApplicationStatus {
    Editing = 'Редактирование',
    AwaitingManagerApproval = 'Ждёт согласования руководителя',
    CourseSelection = 'В работе',
    AwaitingPayment = 'Ждёт оплату',
    AwaitingContractAndPayment = 'Ждёт договор и оплату',
    AwaitingTraining = 'Ждёт обучение',
    TrainingInProgress = 'Идёт обучение',
    TrainingCompleted = 'Обучение пройдено',
    TrainingCanceled = 'Обучение отменено',
    NotApproved = 'Не согласовано',
}