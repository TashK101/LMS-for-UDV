import { ApplicationStatus } from "../current-applications-utils/application-status"
import { Form } from "./Form"
import { StatusComponent } from "./Status"
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

interface RadioGroupWithStatusProps {
    label: string
    name: string
    required?: boolean
    radios: ApplicationStatus[]
    onChange: (value: ApplicationStatus) => void
}

export function RadioGroupWithStatus({ label, name, required = true, radios, onChange }: RadioGroupWithStatusProps) {
    return (
        <Form label={label}>
            <div>
                {radios.map((status, index) =>
                    <div key={index} className="flex gap-[20px] items-center p-3.5">
                        <input
                            type="radio"
                            name={name}
                            className='w-5 h-5 accent-amber-800 border-2'
                            required={required}
                            onChange={() => onChange(status)}
                        />
                        <StatusComponent statusType={status} />
                    </div>)}
            </div>
        </Form>
    )
}
