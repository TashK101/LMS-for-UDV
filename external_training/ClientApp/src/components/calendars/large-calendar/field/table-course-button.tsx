import clsx from "clsx";
import {CourseStatus} from "../../calendar-utils/course-status.ts";
import {useNavigate} from "react-router-dom";

type TableCourseButtonProps = {
    children?: string;
    className?: string;
    courseStatus: CourseStatus;
    courseId: number;
    isLeftBorderRounded: boolean;
    isRightBorderRounded: boolean;
    colsSpanCount?: number;
}

const ButtonVariants = {
    [CourseStatus.Confirmed]: "bg-[#FFBB4B] border-[2px] border-[#FFBB4B] hover:bg-[#FFCE80] hover:border-2 hover:border-[#FFBB4B]",
    [CourseStatus.Waiting]: "bg-[#C9C9C7] border-[2px] border-[#C9C9C7] hover:bg-[#C9C9C7] hover:border-2 hover:border-[#898989]",
}

export default function TableCourseButton({
                                              children,
                                              className,
                                              courseStatus,
                                              courseId,
                                              isLeftBorderRounded,
                                              isRightBorderRounded,
                                          }: TableCourseButtonProps
) {
    const leftBorder = isLeftBorderRounded ? "rounded-l-lg" : "";
    const rightBorder = isRightBorderRounded ? "rounded-r-lg" : "";
    const buttonClassName = clsx(
        className,
        leftBorder,
        rightBorder,
        "transition-colors h-[38px] w-full overflow-hidden text-ellipsis whitespace-nowrap px-1",
        ButtonVariants[courseStatus],
    );

    const navigate = useNavigate();
    const onClickRedirectHandler = () => navigate(`/application_details/${courseId}`);

    // <div className={clsx("flex justify-center", phraseLen > maxPhraseLen ? "[&_p]:hover:flex" : "")}>
    // <p
    //     ref={el}
    //     onClick={onClickRedirectHandler}
    //     className={clsx(
    //         "items-center hidden absolute h-[38px] rounded-lg overflow-hidden",
    //         "text-ellipsis whitespace-nowrap px-4 border-2 bg-red-500 cursor-pointer"
    //     )}>{children}</p>

    return (
        <button
            onClick={onClickRedirectHandler}
            className={buttonClassName}>
            {children}
        </button>
    );
}
