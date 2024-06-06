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

export function getWeekEdgesByOneDate(date: Date) {
    const weekDay = ( date.getDay() + 6 ) % 7;

    return {
        weekStarts: new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay),
        weekEnds: new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - weekDay)),
    }
}

export function getMonthEdgesByDate(date: Date) {
    return {
        monthStarts: new Date(date.getFullYear(), date.getMonth(), 1),
        monthEnds: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    }
}

export function getMonthAndYearDateString(date: Date | undefined) {
    const str = date?.toLocaleString("ru", {
        month: 'long',
        year: "numeric"
    }).replace(' г.', '');

    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}