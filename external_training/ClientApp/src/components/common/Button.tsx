import { H400 } from "./Text"
import {useNavigate} from "react-router-dom";

interface SubmitButtonProps {
    text: string
}

export function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <button type="submit" className="w-[120px] h-[40px] rounded-[100px] bg-color5 hover:bg-color6 border-[1px] border-color8">
            <p className="font-golos text-color7 text-[14px] font-[500]">{text}</p>
        </button>
    )
}

export function SubmitButton2({ text }: SubmitButtonProps) {
    return (
        <button type="submit" className="w-[153px] h-[54px] border-[2px] border-color6 rounded-[100px] bg-color6 hover:bg-[#FFB439]  hover:border-[#C56907]">
            <H400 text={text} fontSize={20} />
        </button>
    )
}

export function SubmitButton3({ text }: SubmitButtonProps) {
    return (
        <button type="submit" className="w-[153px] h-[54px] rounded-[100px] bg-color5 hover:bg-color6">
            <H400 text={text} fontSize={20} />
        </button>
    )
}

export function SubmitButton4({ text }: SubmitButtonProps) {
     const redirect = useNavigate()
    return (
        <button type="submit" className="w-[153px] h-[54px] rounded-[100px] bg-color5 hover:bg-color6" onClick={() => redirect('/details')}>
            <H400 text={text} fontSize={20} />
        </button>
    )
}

export function SubmitButton5({ text }: SubmitButtonProps) {
    const redirect = useNavigate();
    return (
        <button type="submit" className="w-[153px] h-[54px] rounded-[100px] bg-color6 hover:bg-color5" onClick={() => redirect('/inprogress_applications')}>
            <H400 text={text} fontSize={20} />
        </button>
    )
}