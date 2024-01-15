import clsx from "clsx";
import {CourseStatus} from "../../calendar-utils/courseStatus.ts";

type TableCourseButtonProps = {
    children?: string;
    className?: string;
    courseStatus: CourseStatus;
    isLeftBorderRounded: boolean;
    isRightBorderRounded: boolean;
}

const ButtonVariants = {
    [CourseStatus.Confirmed]: "bg-[#FFBB4B] hover:bg-[#FFCE80] hover:border-2 hover:border-[#FFBB4B]",
    [CourseStatus.Waiting]: "bg-[#C9C9C7] hover:bg-[#C9C9C7] hover:border-2 hover:border-[#898989]",
}

export default function TableCourseButton({
                                              children,
                                              className,
                                              courseStatus,
                                              isLeftBorderRounded,
                                              isRightBorderRounded
                                          }: TableCourseButtonProps) {
    const leftBorder = isLeftBorderRounded ? "rounded-l-lg" : "";
    const rightBorder = isRightBorderRounded ? "rounded-r-lg" : "";
    const buttonClassName = clsx(
        className,
        leftBorder,
        rightBorder,
        "transition-colors h-[38px] w-full overflow-hidden text-ellipsis whitespace-nowrap px-1",
        ButtonVariants[courseStatus],
    );

    return <button className={buttonClassName}>{children}</button>;
}