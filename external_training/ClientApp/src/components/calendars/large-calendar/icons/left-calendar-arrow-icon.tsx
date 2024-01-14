type LeftCalendarArrowIconProps = {
    className?: string;
}

export default function LeftCalendarArrowIcon({className} : LeftCalendarArrowIconProps) : JSX.Element {
    return (
        <svg className={className} width="14" height="28" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 0.667969L0 14.0013L13.3333 27.3346V0.667969Z" fill="currentColor"/>
        </svg>

    );
}
