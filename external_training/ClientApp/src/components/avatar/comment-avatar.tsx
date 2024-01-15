type CommentAvatarProps = {
    userFullName : string;
}

export function CommentAvatar ({userFullName} : CommentAvatarProps) : JSX.Element {
    const userNames = userFullName.split(' ');
    const avatarText = userNames.length >= 3 ? `${userNames[0][0]}${userNames[2][0]}` : `${userNames[0][0]}`
    return (
        <div className="w-[60px] h-[60px] p-2.5 bg-orange-100 rounded-[100px] border border-amber-500 justify-center items-center flex">
            <div className="text-center text-zinc-800 text-base font-medium font-['Golos'] leading-normal tracking-tight">{avatarText}</div>
        </div>
    )
}