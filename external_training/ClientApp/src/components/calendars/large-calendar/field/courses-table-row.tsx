import TableCourseButton from "./table-course-button.tsx";
import {ICourse} from "../../calendar-utils/universal-props.ts";
import {getCheckedCourseEndDate, isCourseStartThisMonth} from "../../calendar-utils/courses-field-utils.ts";
import {getLastDayOfChosenMonth} from "../../calendar-utils/date-utils.ts";
import clsx from "clsx";

type CoursesTableRowProps = {
    course: ICourse;
    chosenDate: Date;
}

export default function CoursesTableRow({course, chosenDate}: CoursesTableRowProps) {
    const courseStartThisMonth = isCourseStartThisMonth(
        chosenDate,
        course.startDate,
    );

    let isLeftBorderInside = course.startDate >= chosenDate;
    let isRightBorderInside = course.endDate <= getLastDayOfChosenMonth(chosenDate);

    const leftBorderPadding = isLeftBorderInside ? "pl-1" : "pl-0";
    const rightBorderPadding = isRightBorderInside ? "pr-1" : "pr-0";

    const checkedCourseEndDate = getCheckedCourseEndDate(course, chosenDate);

    if (courseStartThisMonth) {
        return (
            <tr className="h-[42px]">
                {Array(course.startDate.getDate() - 1)
                    .fill(0)
                    .map((_, i) => (
                        <td key={i}></td>
                    ))}
                <td
                    colSpan={
                        checkedCourseEndDate.getDate() - course.startDate.getDate() + 1
                    }
                    className={clsx(leftBorderPadding, rightBorderPadding, "max-w-[30px] w-auto")}
                >
                    <TableCourseButton courseStatus={course.status} isLeftBorderRounded={isLeftBorderInside}
                                       isRightBorderRounded={isRightBorderInside}>
                        {course.title}
                    </TableCourseButton>
                </td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td
                    colSpan={checkedCourseEndDate.getDate()}
                    className={clsx(leftBorderPadding, rightBorderPadding, "max-w-[30px] w-auto")}
                >
                    <TableCourseButton courseStatus={course.status} isLeftBorderRounded={isLeftBorderInside}
                                       isRightBorderRounded={isRightBorderInside}>
                        {course.title}
                    </TableCourseButton>
                </td>
            </tr>
        );
    }
}
