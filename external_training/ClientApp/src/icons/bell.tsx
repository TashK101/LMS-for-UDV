type BellProps = {
    isHover : boolean;
}

const Bell = ({isHover}: BellProps) => (
    <svg
        width={51}
        height={54}
        viewBox="0 0 51 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g>
            <path
                d="M37.5556 29.6962V23.6C37.5556 18.1311 33.7925 13.5241 28.6947 12.1386C28.1901 10.884 26.957 10 25.5 10C24.043 10 22.8099 10.884 22.3053 12.1386C17.2075 13.5258 13.4444 18.1311 13.4444 23.6V29.6962L10.5046 32.5981C10.3444 32.7557 10.2173 32.943 10.1307 33.1493C10.0441 33.3556 9.99967 33.5767 10 33.8V37.2C10 37.6509 10.1814 38.0833 10.5044 38.4021C10.8274 38.7209 11.2655 38.9 11.7222 38.9H39.2778C39.7345 38.9 40.1726 38.7209 40.4956 38.4021C40.8186 38.0833 41 37.6509 41 37.2V33.8C41.0003 33.5767 40.9559 33.3556 40.8693 33.1493C40.7827 32.943 40.6556 32.7557 40.4954 32.5981L37.5556 29.6962ZM37.5556 35.5H13.4444V34.5038L16.3843 31.6019C16.5445 31.4443 16.6716 31.257 16.7582 31.0507C16.8448 30.8444 16.8892 30.6233 16.8889 30.4V23.6C16.8889 18.9131 20.7518 15.1 25.5 15.1C30.2482 15.1 34.1111 18.9131 34.1111 23.6V30.4C34.1111 30.8522 34.2919 31.284 34.6157 31.6019L37.5556 34.5038V35.5ZM25.5 44C26.5666 44.0013 27.6071 43.6746 28.4768 43.0653C29.3466 42.4559 30.0025 41.5942 30.3532 40.6H20.6468C20.9975 41.5942 21.6534 42.4559 22.5232 43.0653C23.3929 43.6746 24.4334 44.0013 25.5 44Z"
                fill={isHover ? "#F59D0E" : "#913D00"}
            />
        </g>
    </svg>
);

export { Bell };