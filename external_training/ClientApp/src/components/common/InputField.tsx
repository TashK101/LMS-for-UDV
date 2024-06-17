import { useState } from "react"
import { Form } from "./Form"
import { DecrementIcon, HidePasswordIcon, IncrementIcon, ShowPasswordIcon } from "./Icons"

interface InputProps {
    label?: string,
    placeholder?: string,
    required?: boolean,
    value: string
    onChange: (value: string) => void
}

export function TextField({ label = "", placeholder = "", required = true, value, onChange }: InputProps) {
    return (
        <Form label={label}>
            <input
                type="text"
                className="font-golos font-normal 
                text-base placeholder:text-color3 
                w-full max-w-sm 
                outline-0 border-[1px] border-color2 rounded 
                h-[56px] p-[16px]
                focus:border-color6
                "
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </Form>
    )
}

export function NumberField({ label = "", placeholder = "", required = true, value, onChange }: InputProps) {
    return (
        <Form label={label}>
            <input
                type="number"
                className="font-golos font-normal 
                text-base placeholder:text-color3 
                w-full max-w-sm 
                outline-0 border-[1px] border-color2 rounded 
                h-[56px] p-[16px]
                focus:border-color6
                "
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </Form>
    )
}

export function TextArea({ label = "", placeholder = "", required = true, value, onChange }: InputProps) {
    return (
        <Form label={label}>
            <textarea
                className='font-golos font-normal 
                text-base placeholder:text-color3 
                w-full max-w-sm 
                outline-0 border-[1px] border-color2 rounded
                h-[101px] p-[16px]
                focus:border-color6'
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(event) => onChange(event.target.value)} />
        </Form>
    )
}

export function PasswordField({ label = "", placeholder = "", required = true, value, onChange }: InputProps) {
    return (
        <Form label={label}>
            <PasswordInput placeholder={placeholder} required={required} value={value} onChange={onChange} />
        </Form>
    )
}

interface PasswordInputProps {
    placeholder: string,
    required: boolean,
    value: string
    onChange: (value: string) => void
}

function PasswordInput({ placeholder, required, value, onChange }: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className="relative w-full max-w-sm">
            <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={placeholder}
                className="font-golos font-normal 
          text-base placeholder:text-color3 
          w-full max-w-sm 
          outline-0 border-[1px] border-color2 rounded 
          h-[56px] p-[16px]
          focus:border-color6"
                required={required}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
            >
                {isPasswordVisible ? (
                    <HidePasswordIcon />
                ) : (
                    <ShowPasswordIcon />
                )}
            </button>
        </div>
    );
}

interface CounterInputProps {
    label?: string,
    placeholder?: string,
    required?: boolean,
    value: number
    onChange: (value: number) => void
}

export function CounterInput({ label = "", required = true, value, onChange }: CounterInputProps) {
    return (
        <Form label={label}>
            <div className='relative flex items-center gap-[9px]'>
                <button type='button' onClick={() => {
                    const number = value - 1
                    if (number < 1) return
                    onChange(number)
                }}>
                    <DecrementIcon />
                </button>

                <input
                    type="text"
                    className="font-golos font-normal 
                text-base text-center placeholder:text-color3 
                outline-0 border-[1px] border-color2 rounded-[5px] 
                w-[49px] h-42[px] p-[8px]
                focus:border-color6
                "
                    required={required}
                    value={value}
                    onChange={(event) => {
                        const value = event.target.value
                        if (value.length === 0) {
                            onChange(0)
                            return
                        }
                        const number = parseInt(value)
                        if (!isNaN(number)) {
                            onChange(number)
                        }
                    }}
                />

                <button type='button' onClick={() => onChange(value + 1)}>
                    <IncrementIcon />
                </button>
            </div>
        </Form>
    )
}

