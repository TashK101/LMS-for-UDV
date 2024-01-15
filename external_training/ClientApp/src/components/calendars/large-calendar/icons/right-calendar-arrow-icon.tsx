type RightCalendarArrowIconProps = {
    className?: string;
}

export default function RightCalendarArrowIcon({className}: RightCalendarArrowIconProps): JSX.Element {
    return (
        <svg className={className} width="14" height="28" viewBox="0 0 14 28" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M0.666668 0.667969L14 14.0013L0.666668 27.3346V0.667969Z" fill="currentColor"/>
        </svg>
    );
}
