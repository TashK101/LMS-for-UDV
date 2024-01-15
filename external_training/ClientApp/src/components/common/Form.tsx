import { H400 } from "./Text"

interface FormProps {
    label: string
    children: React.ReactNode
}

export function Form({ label, children }: FormProps) {
    return (
        <div className='flex flex-col gap-[20px]'>
            <H400 text={label} />
            {children}
        </div>
    )
}
