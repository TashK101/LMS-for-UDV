type DownSelectArrowIconProps = {
    className?: string;
}

export default function DownSelectArrowIcon({className} : DownSelectArrowIconProps) : JSX.Element {
    return (
        <svg
            className={className}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#2B2A29"/>
        </svg>
    );
}