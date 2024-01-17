import TableCourseButton from "./table-course-button.tsx";
import {ICourse} from "../../calendar-utils/universal-props.ts";
import {getLastDayOfChosenMonth} from "../../calendar-utils/date-utils.ts";
import clsx from "clsx";

type CoursesTableRowProps = {
    course: ICourse;
    chosenDate: Date;
}

export default function CoursesTableRow({course, chosenDate}: CoursesTableRowProps) {


    let isLeftBorderInside = course.startDate >= chosenDate;
    let isRightBorderInside = course.endDate <= getLastDayOfChosenMonth(chosenDate);

    const leftBorderPadding = isLeftBorderInside ? "pl-1" : "pl-0";
    const rightBorderPadding = isRightBorderInside ? "pr-1" : "pr-0";

    const tdsToRenderCount = isLeftBorderInside ? course.startDate.getDate() - 1 : 0;
    const colSpanCount = isRightBorderInside
        ? (isLeftBorderInside
            ? course.endDate.getDate() - course.startDate.getDate() + 1
            : course.endDate.getDate())
        : (isLeftBorderInside
            ? getLastDayOfChosenMonth(chosenDate).getDate() - course.startDate.getDate() + 1
            : getLastDayOfChosenMonth(chosenDate).getDate());

    return (
        <tr className="h-[42px]">
            {Array(tdsToRenderCount)
                .fill(0)
                .map((_, i) => (
                    <td key={i}></td>
                ))}
            <td
                colSpan={colSpanCount}
                className={clsx(leftBorderPadding, rightBorderPadding, "max-w-[30px] w-auto")}
            >
                <TableCourseButton
                    courseId={course.trainingApplicationId}
                    courseStatus={course.status}
                    isLeftBorderRounded={isLeftBorderInside}
                    isRightBorderRounded={isRightBorderInside}>
                    {course.title}
                </TableCourseButton>
            </td>
        </tr>);
}
