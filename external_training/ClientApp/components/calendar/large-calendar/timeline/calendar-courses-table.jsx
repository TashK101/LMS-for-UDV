import clsx from "clsx";
import CoursesTableRow from "./courses-table-row";

const coursesStatus = {
  confirmed: "confirmed",
  waiting: "waiting",
};

const courses = [
  {
    title: "Компьютерное зрение",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 18),
    status: coursesStatus.confirmed,
  },
  {
    title: "Основы web-разработки",
    startDate: new Date(2023, 11, 30),
    endDate: new Date(2024, 0, 24),
    status: coursesStatus.waiting,
  },
  {
    title:
      "Прекрасные и замечательные пределы, а также удивительные метаморфозы математического анализа",
    startDate: new Date(2024, 0, 23),
    endDate: new Date(2024, 2, 2),
    status: coursesStatus.confirmed,
  },
  {
    title: "PYTHON OLIMPYCS",
    startDate: new Date(2024, 0, 3),
    endDate: new Date(2024, 0, 6),
    status: coursesStatus.waiting,
  },
];

export default function CalendarCoursesTable({
  currentMonthMaxDate,
  chosenDate,
}) {
  const minTableHeight = 10;
  const numCourses = courses.length;
  const height = numCourses >= minTableHeight ? 0 : minTableHeight - numCourses;

  return (
    <div className="flex justify-center">
      <table className="text-xs">
        <colgroup>
          {Array(currentMonthMaxDate)
            .fill(1)
            .map((_, i) => (
              <col
                key={i}
                className="border-[#ECECEC] border w-[44px] h-[42px]"
              />
            ))}
        </colgroup>
        <tbody>
          {Array(numCourses)
            .fill(1)
            .map((_, i) => (
              <CoursesTableRow
                key={i}
                course={courses[i]}
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

//<div className="items-stretch flex min-h-[65vh] border-[#ECECEC] border"></div>
