import {ICourse} from "./universal-props.ts";

export function isCourseStartThisMonth(chosenDate: Date, courseStartDate: Date) {
    let res = (chosenDate.getTime() - courseStartDate.getTime());
    return res <= 0;
}

export function getCheckedCourseEndDate(course: ICourse, chosenDate: Date) {
    const lastChosenDate = new Date(
        chosenDate.getFullYear(),
        chosenDate.getMonth() + 1,
        0,
    );

    return course.endDate.getTime() - lastChosenDate.getTime() <= 0 ? course.endDate : lastChosenDate;
}