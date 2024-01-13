import { H400, H500 } from "./Text"

interface SubmitButtonProps {
    text: string
}

export function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <button type="submit" className="w-[120px] h-[40px] rounded-[100px] bg-color5 border border-color8">
            <H500 text={text} fontSize={14} />
        </button>
    )
}

export function SubmitButton2({ text }: SubmitButtonProps) {
    return (
        <button type="submit" className="w-[153px] h-[54px] rounded-[100px] bg-color6">
            <H400 text={text} fontSize={20} />
        </button>
    )
}
