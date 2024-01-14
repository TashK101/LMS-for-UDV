import {WeekDays} from "./enums.ts";

const weekDays = [
    WeekDays.Sunday,
    WeekDays.Monday,
    WeekDays.Tuesday,
    WeekDays.Wednesday,
    WeekDays.Thursday,
    WeekDays.Friday,
    WeekDays.Saturday
];

export function getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getTimelineDays(chosenDate: Date) {
    const result = new Array(getDaysInMonth(chosenDate));
    const offset = chosenDate.getDay();

    for (let i = 0; i < getDaysInMonth(chosenDate); i++) {
        result[i] = weekDays[(i + offset) % 7];
    }

    return result;
}

export function getLastDayOfChosenMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}