import clsx from "clsx";
import { useState } from "react";
import CalendarCoursesTable from "./calendar-courses-table";
import TimelineCell from "./timeline-cell";

const weekDays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getTimelineDays(chosenDate) {
  const result = new Array(getDaysInMonth(chosenDate));
  const offset = chosenDate.getDay();

  for (let i = 0; i < getDaysInMonth(chosenDate); i++) {
    result[i] = weekDays[(i + offset) % 7];
  }

  return result;
}

export default function CalendarField({ children, className }) {
  const [chosenDate, setChosenDate] = useState(() => new Date(2024, 0));
  const timelineDays = getTimelineDays(chosenDate);
  //"items-stretch flex min-h-[70vh] border-black border-2 mx-20",

  return (
    <div className="px-16">
      <div className="flex justify-center">
        {timelineDays.map((weekDay, i) => (
          <TimelineCell key={i} date={i + 1} weekDay={weekDay} />
        ))}
      </div>
      <CalendarCoursesTable
        currentMonthMaxDate={getDaysInMonth(chosenDate)}
        chosenDate={chosenDate}
      />
    </div>
  );
}
