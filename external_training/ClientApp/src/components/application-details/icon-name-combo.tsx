import {ApplicationDetailsAvatar} from "../avatar/header-avatar";
export type IconNameComboType = {
    name: string,
    action: string
}

export function IconNameCombo({name, action}:IconNameComboType): JSX.Element {
    return (
        <div>
            <p className='bold-text'>{action}:</p><br/>
            <div className='flex items-center gap-[15px]'>{name &&
                <ApplicationDetailsAvatar userFullName={name}/>}
                {name}
            </div>
        </div>
    )
}