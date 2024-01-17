type HeaderAvatarProps = {
    userFullName : string;
}

export function HeaderAvatar ({userFullName} : HeaderAvatarProps) : JSX.Element {
    const userNames = userFullName.split(' ');
    const avatarText = userNames.length >= 3 ? `${userNames[1][0]}${userNames[0][0]}` : `${userNames[0][0]}`
    return (
        <div className="w-[50px] h-[50px] p-[5px] bg-orange-100 rounded-[100px] border border-amber-500 justify-center items-center inline-flex hover:shadow-lg">
            <div className="text-center text-zinc-800 text-base font-medium font-['Golos'] leading-normal tracking-tight">{avatarText}</div>
        </div>
    )
}