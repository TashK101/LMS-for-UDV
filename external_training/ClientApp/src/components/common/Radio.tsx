import { Form } from "./Form"
import { H400 } from "./Text"

interface IRadio {
    title: string
}

interface RadioGroupProps {
    label: string
    name: string
    required?: boolean
    radios: IRadio[]
    onChange: (value: string) => void
}

export function RadioGroup({ label, name, required = true, radios, onChange }: RadioGroupProps) {
    return (
        <Form label={label}>
            <div>
                {radios.map((radio, index) =>
                    <div key={index} className="flex gap-[20px] items-center p-3.5">
                        <input
                            type="radio"
                            name={name}
                            className='w-5 h-5 accent-amber-800 border-2'
                            required={required}
                            value={index}
                            onChange={(event) => onChange(event.target.value)}
                        />
                        <H400 text={radio.title} />
                    </div>)}
            </div>
        </Form>
    )
}

interface IRadioWithComponent {
    children: React.ReactNode
}

interface RadioGroupWithComponentProps {
    label: string
    name: string
    required?: boolean
    radios: IRadioWithComponent[]
    onChange: (value: string) => void
}

export function RadioGroupWithComponent({ label, name, required = true, radios, onChange }: RadioGroupWithComponentProps) {
    return (
        <Form label={label}>
            <div>
                {radios.map((radio, index) =>
                    <div key={index} className="flex gap-[20px] items-center p-3.5">
                        <input
                            type="radio"
                            name={name}
                            className='w-5 h-5 accent-amber-800 border-2'
                            required={required}
                            value={index}
                            onChange={(event) => onChange(event.target.value)}
                        />
                        {radio.children}
                    </div>)}
            </div>
        </Form>
    )
}
