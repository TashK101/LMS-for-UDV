export const customLocale = {
    months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ],

    weekDays: [
        {
            name: 'Понедельник',
            short: 'Пн',
        },
        {
            name: 'Вторник',
            short: 'Вт',
        },
        {
            name: 'Среда',
            short: 'Ср',
        },
        {
            name: 'Четверг',
            short: 'Чт',
        },
        {
            name: 'Пятница',
            short: 'Пт',
        },
        {
            name: 'Суббота',
            short: 'Сб',
            isWeekend: true,
        },
        {
            name: 'Воскресенье', // used for accessibility
            short: 'Вс', // displayed at the top of days' rows
            isWeekend: true,
        },
    ],
    weekStartingIndex: 6,

    getToday(gregorainTodayObject: any) {
        return gregorainTodayObject;
    },

    toNativeDate(date: any) {
        return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: any) {
        return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: any) {
        return digit;
    },
    nextMonth: 'Следующий месяц',
    previousMonth: 'Предыдущий месяц',
    openMonthSelector: 'Выбор месяца',
    openYearSelector: 'Выбор года',
    closeMonthSelector: 'Закрыть выбор месяца',
    closeYearSelector: 'Закрыть выбор года',
    defaultPlaceholder: 'Выбор дат...',
    from: 'с',
    to: 'по',
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
    isRtl: false,
}