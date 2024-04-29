import CoursesTableRow from "./courses-table-row.tsx";
import {ICourse} from "../../calendar-utils/universal-props.ts"
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchEventsAction} from "../../../../store/api-actions/api-actions.ts";
import {useEffect} from "react";
import {State} from "../../../../types/state.tsx";
import {getLastDayOfChosenMonth} from "../../calendar-utils/date-utils.ts";
import {CourseStatus} from "../../calendar-utils/courseStatus.ts";

type CalendarCoursesTableProps = {
    currentMonthMaxDate: number;
    chosenDate: Date;
}


const getEvents = (state: State) => state.events;

export default function CalendarCoursesTable({currentMonthMaxDate, chosenDate}: CalendarCoursesTableProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEventsAction());
    }, []);

    const events = useAppSelector(getEvents);
    let courses: ICourse[] = [];
    if (events) {
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            courses.push({
                trainingApplicationId: event.trainingApplicationId,
                title: event.courseName,
                startDate: new Date(event.begin),
                endDate: new Date(event.end),
                status: event.status === "Approved" ? CourseStatus.Confirmed : CourseStatus.Waiting
            })
        }
    }

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

