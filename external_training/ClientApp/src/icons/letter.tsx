type LetterProps = {
    isHover : boolean;
}
const Letter = ({isHover}: LetterProps) => (
    <svg
        width={47}
        height={48}
        viewBox="0 0 47 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path
                d="M39.1667 8.33203H7.83341C5.67925 8.33203 3.93633 10.0945 3.93633 12.2487L3.91675 35.7487C3.91675 37.9029 5.67925 39.6654 7.83341 39.6654H39.1667C41.3209 39.6654 43.0834 37.9029 43.0834 35.7487V12.2487C43.0834 10.0945 41.3209 8.33203 39.1667 8.33203ZM39.1667 35.7487H7.83341V16.1654L23.5001 25.957L39.1667 16.1654V35.7487ZM23.5001 22.0404L7.83341 12.2487H39.1667L23.5001 22.0404Z"
                fill={isHover ? "#F59D0E" : "#913D00"}
            />
        </g>
    </svg>
);

export { Letter };