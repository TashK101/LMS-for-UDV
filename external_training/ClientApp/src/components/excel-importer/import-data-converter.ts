import {Course} from "../../types/application.tsx";

const Excel = require('exceljs');

type DataConverterController = {
    courses: Course[];
    firstSelectedDate: Date | undefined;
    secondSelectedDate: Date | undefined;
}

// Формат: HEX без символа '#'
const HEADER_BACKGROUND_COLOR = '70AD47';
const HEADER_TEXT_COLOR = 'FFFFFF';
const HEADER_TEXT_SIZE = 13;
const TABLE_BORDERS_COLOR = '9B9B9B';
const TABLE_CONTRAST_BACKGROUND_COLOR = 'E2EFDA';
const WORKSHEET_NAME = 'Обучение Интегратор';

export function importDataConverter({
                                        courses,
                                        firstSelectedDate,
                                        secondSelectedDate
                                    }: DataConverterController): boolean {
    const filteredCourses = skipEmptyApps(courses);

    if (filteredCourses.length === 0) {
        return false;
    }

    const fileName = firstSelectedDate && secondSelectedDate
        ? `Обучение ${firstSelectedDate?.toLocaleDateString()} - ${secondSelectedDate?.toLocaleDateString()}.xlsx`
        : 'Обучение за все время.xlsx'

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(WORKSHEET_NAME, {
        pageSetup: {paperSize: 9, orientation: 'landscape', fitToPage: true}
    });

    const headers = [
        {header: 'Учебный центр', key: 'educationCenter', width: 43},
        {header: 'Курс', key: 'courseName', width: 57},
        {header: 'Тип', key: 'trainingType', width: 15},
        {header: 'Участники', key: 'participantsNames', width: 43},
        {header: 'Затраты', key: 'totalCost', width: 20},
        {header: 'Департамент', key: 'department', width: 20},
        {header: 'Отдел / команда', key: 'team', width: 43},
        {header: 'ЮЛ', key: 'legalEntity', width: 15},
        {header: 'Даты', key: 'dates', width: 18},
        {header: 'Стоимость на 1 чел.', key: 'costPerPerson', width: 18},
        {header: 'Направление обучения', key: 'studyDirection', width: 18},
    ];
    worksheet.columns = headers;

    filteredCourses.forEach((app) => {
        worksheet.addRow({
            educationCenter: app.trainingCenter,
            courseName: app.name,
            onlineTraining: (app.isTrainingOnline ? 'Онлайн' : 'Оффлайн').concat(app.isCorporateTraining ? ', только для нашей компании' : ', для всех желающих'),
            participantsNames: getFormattedParticipantsNames(app.participantFullNames),
            totalCost: app.totalCost,
            department: 'Unknown',
            team: 'Unknown',
            legalEntity: '',
            dates: getTrainingDates(app.begin, app.end),
            costPerPerson: app.costPerParticipant,
            studyDirection: ''
        })
    })

    headers.forEach((_, index) => {
        const column = worksheet.getColumn(index + 1);
        column.alignment = {wrapText: true, vertical: 'middle', horizontal: 'left'};
        const borderColor = `FF${TABLE_BORDERS_COLOR}`
        column.border = {
            top: {style: 'thin', color: {argb: borderColor}},
            left: {style: 'thin', color: {argb: borderColor}},
            bottom: {style: 'thin', color: {argb: borderColor}},
            right: {style: 'thin', color: {argb: borderColor}}
        };

        const rowCell = worksheet.getRow(1).getCell(index + 1);
        rowCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: `FF${HEADER_BACKGROUND_COLOR}`}
        };
        rowCell.font = {
            name: 'Calibri',
            size: HEADER_TEXT_SIZE,
            color: {argb: `FF${HEADER_TEXT_COLOR}`}
        };
    })

    // В этой строке раскрасим каждую вторую строку с данными в контрастный цвет чтоб
    filteredCourses.forEach((_, index) => {
        if ((index + 2) % 2 !== 0) {
            worksheet.getRow(index + 2).eachCell(function (cell: any) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {argb: `FF${TABLE_CONTRAST_BACKGROUND_COLOR}`}
                };
            });
        }
    })

    worksheet.getRow(1).alignment = {wrapText: true, vertical: 'middle', horizontal: 'center'}
    worksheet.views = [{zoomScale: 85}];
    worksheet.autoFilter = 'A1:K1';


    workbook.xlsx.writeBuffer().then(function (data: any) {
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        window.URL.revokeObjectURL(url);
    });

    return true;
}

function getFormattedParticipantsNames(participants: string[]): string {
    return participants.join(',');
}

function skipEmptyApps(applications: Course[]): Course[] {
    const withoutEmpty: Course[] = [];
    applications.forEach((app) => {
        if (app) {
            withoutEmpty.push(app);
        }
    })

    return withoutEmpty;
}

function getTrainingDates(from: string, to: string): string {
    return `${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`
}