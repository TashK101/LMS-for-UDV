type HeaderAvatarProps = {
    userFullName : string;
}

export function HeaderAvatar ({userFullName} : HeaderAvatarProps) : JSX.Element {
    const userNames = userFullName.split(' ');
    const avatarText = userNames.length >= 3 ? `${userNames[1][0]}${userNames[0][0]}` : `${userNames[0][0]}`
    return (
        <div className="w-[50px] h-[50px] p-[5px] bg-orange-100 rounded-[100px] !border-[#F59D0E] border-[1px] justify-center items-center inline-flex hover:outline outline-[12px] outline-[#E4E4E3]">
            <div className="text-center text-zinc-800 text-base font-medium font-['Golos'] leading-normal tracking-tight">{avatarText}</div>
        </div>
    )
}

export function ApplicationDetailsAvatar ({userFullName} : HeaderAvatarProps) : JSX.Element {
    const userNames = userFullName.split(' ');
    const avatarText = userNames.length >= 3 ? `${userNames[0][0]}${userNames[2][0]}` : `${userNames[0][0]}`
    return (
        <div className="w-[50px] h-[50px] p-[5px] bg-orange-100 rounded-[100px] border-[1px] border-amber-500 justify-center items-center inline-flex">
            <div className="text-center text-zinc-800 text-base font-medium font-['Golos'] leading-normal tracking-tight">{avatarText}</div>
        </div>
    )
}