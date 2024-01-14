import CoursesTableRow from "./courses-table-row.tsx";
import {ICourse} from "../../calendar-utils/universal-props.ts"
import {CourseStatus} from "../../calendar-utils/courseStatus.ts";
import {getLastDayOfChosenMonth} from "../../calendar-utils/date-utils.ts";

type CalendarCoursesTableProps = {
    currentMonthMaxDate: number;
    chosenDate: Date;
}


const courses: ICourse[] = [
    {
        title: "Компьютерное зрение",
        startDate: new Date(2024, 0, 10),
        endDate: new Date(2024, 0, 18),
        status: CourseStatus.Confirmed,
    },
    {
        title: "Основы web-разработки",
        startDate: new Date(2024, 0, 2),
        endDate: new Date(2024, 0, 24),
        status: CourseStatus.Waiting,
    },
    {
        title:
            "Прекрасные и замечательные пределы, а также удивительные метаморфозы математического анализа",
        startDate: new Date(2023, 0, 23),
        endDate: new Date(2023, 2, 2),
        status: CourseStatus.Confirmed,
    },
    {
        title: "PYTHON OLIMPYCS",
        startDate: new Date(2024, 3, 30),
        endDate: new Date(2024, 4, 3),
        status: CourseStatus.Waiting,
    },
];

export default function CalendarCoursesTable({currentMonthMaxDate, chosenDate}: CalendarCoursesTableProps) {
    const minTableHeight = 10;
    const filteredCourses: ICourse[] = courses.filter((c: ICourse) => {
        return (c.startDate < chosenDate && c.endDate >= chosenDate) ||
            (c.startDate >= chosenDate && c.startDate <= getLastDayOfChosenMonth(chosenDate));
    })
    const numCourses = filteredCourses.length;
    const height = numCourses >= minTableHeight ? 0 : minTableHeight - numCourses;

    return (
        <div className="">
            <table className="text-xs m-auto">
                <colgroup>
                    {Array(currentMonthMaxDate)
                        .fill(1)
                        .map((_, i) => (
                            <col
                                key={i}
                                className="border-[#ECECEC] border w-[42px] flex-shrink-0 flex-grow-0 basis-auto h-[42px]"
                            />
                        ))}
                </colgroup>
                <tbody>
                {Array(numCourses)
                    .fill(1)
                    .map((_, i) => (
                        <CoursesTableRow
                            key={i}
                            course={filteredCourses[i]}
                            chosenDate={chosenDate}
                        />
                    ))}
                {Array(height)
                    .fill(0)
                    .map((_, i) => (
                        <tr key={i} className="h-[42px]"></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

