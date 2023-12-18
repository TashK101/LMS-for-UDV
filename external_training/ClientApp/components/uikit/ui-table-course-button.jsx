import clsx from "clsx";

export default function UiTableCourseButton({ children, className, variant }) {
  const buttonClassName = clsx(
    className,
    "transition-colors h-[38px] px-1 w-full rounded overflow-hidden text-ellipsis whitespace-nowrap",
    {
      confirmed:
        "bg-[#FFBB4B] hover:bg-[#FFCE80] hover:border-2 hover:border-[#FFBB4B]",
      waiting:
        "bg-[#C9C9C7] hover:bg-[#C9C9C7] hover:border-2 hover:border-[#898989]",
    }[variant],
  );

  return <button className={buttonClassName}>{children}</button>;
}
