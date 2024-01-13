import { H500, H600 } from "./Text"

interface ProfileImageProps {
    name: string,
    surname: string
}

function createText(name: string, surname: string) {
    return name.slice(0, 1) + surname.slice(0, 1)
}

export function ProfileImageLarge({ name, surname }: ProfileImageProps) {
    return (
        <div className="
        relative inline-flex items-center justify-center 
        w-[114px] h-[114px] 
        overflow-hidden bg-color5 
        rounded-full
        border-2 border-color6
        "
        >
            <H600 text={createText(name, surname)} />
        </div>
    )
}

export function ProfileImage({ name, surname }: ProfileImageProps) {
    return (
        <div className="
        relative inline-flex items-center justify-center 
        w-[50px] h-[50px] 
        overflow-hidden bg-color5 
        rounded-full
        border border-color6
        ">
            <H500 fontSize={16} text={createText(name, surname)} />
        </div>
    )
}
