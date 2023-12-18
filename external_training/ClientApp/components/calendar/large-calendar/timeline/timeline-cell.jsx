import clsx from "clsx";

export default function TimelineCell({ date, weekDay }) {
  const bgColor =
    weekDay === "сб" || weekDay === "вс" ? "bg-[#FFCE80]" : "bg-[#FFE2B2]";

  return (
    <div className="w-[44px] items-center text-center text-sm">
      <div className={clsx(bgColor, "p-2 border-b border-[#2B2A29]")}>
        <div>{date}</div>
        <div>{weekDay}</div>
      </div>
    </div>
  );

  //<div className="items-stretch flex min-h-[65vh] border-[#ECECEC] border"></div>
}
