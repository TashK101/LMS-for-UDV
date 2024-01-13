import React from 'react'
import { H400 } from './Text';

interface CardProps {
    children: React.ReactNode
}

export function Card({ children }: CardProps) {
    return (
        <div className="
        bg-white 
        border border-gray-300 
        rounded-[10px] shadow-lg
        p-7">
            {children}
        </div>
    );
}

export function CardWithColumn({ children }: CardProps) {
    return (
        <Card>
            <div className='flex flex-col gap-[35px]'>
                {children}
            </div>
        </Card>
    );
}

interface CardIndexProps {
    index: number,
    count: number
}

export function CardIndex({ index, count }: CardIndexProps) {
    return (
        <H400 text={`${index} из ${count}`} fontSize={14} color='color3' />
    )
}
