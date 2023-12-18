import UiTableCourseButton from "../../../uikit/ui-table-course-button";

function isCourseStartThisMonth(chosenDate, courseStartDate) {
  return chosenDate - courseStartDate <= 0;
}

function getCheckedCourseEndDate(course, chosenDate) {
  const lastChosenDate = new Date(
    chosenDate.getFullYear(),
    chosenDate.getMonth() + 1,
    0,
  );

  return course.endDate - lastChosenDate <= 0 ? course.endDate : lastChosenDate;
}

export default function CoursesTableRow({ course, chosenDate }) {
  const courseStartThisMonth = isCourseStartThisMonth(
    chosenDate,
    course.startDate,
  );

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
          className="max-w-[44px] px-1"
        >
          <UiTableCourseButton variant={course.status}>
            {course.title}
          </UiTableCourseButton>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td
          colSpan={checkedCourseEndDate.getDate()}
          className="max-w-[44px] px-1"
        >
          <UiTableCourseButton variant={course.status}>
            {course.title}
          </UiTableCourseButton>
        </td>
      </tr>
    );
  }
}
