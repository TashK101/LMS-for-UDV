import CoursesTableRow from "./courses-table-row.tsx";
import {ICourse} from "../../calendar-utils/universal-props.ts"
import {useAppDispatch} from "../../../../hooks";
import {fetchEventsAction} from "../../../../store/api-actions/api-actions.ts";
import {useEffect} from "react";
import {getLastDayOfChosenMonth} from "../../calendar-utils/date-utils.ts";
import {ApplicationStatus} from "../../../current-applications-utils/application-status.ts";
import {EventType} from "../../../../types/event.tsx";
import {CourseStatus} from "../../calendar-utils/course-status.ts";

type CalendarCoursesTableProps = {
    currentMonthMaxDate: number;
    chosenDate: Date;
    events: EventType[];
    chosenUser: string;
    chosenFormat: string;
}

const MIN_TABLE_HEIGHT = 10;

export default function CalendarCoursesTable({
                                                 currentMonthMaxDate,
                                                 chosenDate,
                                                 events,
                                                 chosenUser,
                                                 chosenFormat
                                             }: CalendarCoursesTableProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEventsAction());
    }, []);

    console.log('Events: ',events)
    let courses: ICourse[] = [];
    if (events) {
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            courses.push({
                trainingApplicationId: event.trainingApplicationId,
                title: event.courseName,
                startDate: new Date(event.begin),
                endDate: new Date(event.end),
                status: getCourseInnerStatus(ApplicationStatus[event.status as keyof typeof ApplicationStatus]),
                userFullName: event.userFullName,
                isOnline: event.isOnline,
            })
        }
    }

    const filteredCourses = getFilteredCourses(courses, chosenFormat, chosenUser, chosenDate);
    const numCourses = filteredCourses.length;
    const height = numCourses >= MIN_TABLE_HEIGHT ? 0 : MIN_TABLE_HEIGHT - numCourses;

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

function getFilteredCourses(courses: ICourse[], chosenFormat: string, chosenUser: string, chosenDate: Date) {
    let filteredCourses: ICourse[] = courses.filter((course) => {
        return (course.startDate < chosenDate && course.endDate >= chosenDate) ||
            (course.startDate >= chosenDate && course.startDate <= getLastDayOfChosenMonth(chosenDate));
    });

    if (chosenFormat === 'Онлайн') {
        filteredCourses = filteredCourses.filter((course) => course.isOnline);
    } else if (chosenFormat === 'Оффлайн') {
        filteredCourses = filteredCourses.filter((course) => !course.isOnline);
    }

    if (chosenUser !== '') {
        filteredCourses = filteredCourses.filter((course) => course.userFullName === chosenUser);
    }

    console.log('Filtered',filteredCourses);
    filteredCourses = filteredCourses.filter((course) => course.status !== CourseStatus.Hidden);

    return filteredCourses;
}

const getCourseInnerStatus = (status: ApplicationStatus) => {
    console.log(status);
    return (
    status === ApplicationStatus.AwaitingPayment ||
    status === ApplicationStatus.AwaitingContractAndPayment ||
    status === ApplicationStatus.AwaitingTraining ||
    status === ApplicationStatus.CourseSelection
        ? CourseStatus.Waiting
        : status === ApplicationStatus.TrainingCompleted || status === ApplicationStatus.TrainingInProgress
            ? CourseStatus.Confirmed
            : CourseStatus.Hidden);
}


