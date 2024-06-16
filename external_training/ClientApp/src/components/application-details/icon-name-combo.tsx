import {ApplicationDetailsAvatar} from "../avatar/header-avatar";
export type IconNameComboType = {
    names: string[],
    action: string
}

export function IconNameCombo({names, action}:IconNameComboType): JSX.Element {
    return (
        <div>
            <p className='bold-text'>{action}:</p><br/>
            {names.length > 0 && names.map((name, index) => (
                <div key={index} className='flex items-center gap-[15px] m-b4'>
                    <ApplicationDetailsAvatar userFullName={name} />
                    {name}
                </div>
            ))}
        </div>
    )
}