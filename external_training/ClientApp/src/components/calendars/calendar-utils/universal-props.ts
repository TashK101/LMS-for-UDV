import {CourseStatus} from "./courseStatus.ts";

export type UniversalClassAndChildrenProps = {
    children?: string;
    className?: string;
}

export interface ICourse {
    trainingApplicationId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: CourseStatus;
}