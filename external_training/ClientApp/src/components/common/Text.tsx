interface HProps {
    text: string,
    fontWeight: number,
    fontSize: number,
    color?: string
}

function H({ text, fontWeight, fontSize, color = 'color7' }: HProps) {
    const fontWeightClass = `font-[${fontWeight}]`
    const fontSizeClass = `text-[${fontSize}px]`
    const colorClass = `text-${color}`
    const classes = ['font-golos', fontWeightClass, fontSizeClass, colorClass]
    
    return (
        <p className={classes.join(' ')}>{text}</p>
    )
}

interface HFontProps {
    text: string,
    fontSize?: number,
    color?: string
}

export function H400({ text, fontSize = 20, color }: HFontProps) {
    return (
        <p className="font-golos text-color7 text-[20px] font-[400]">{text}</p>
    )
}

export function H500({ text, fontSize = 24, color }: HFontProps) {
    return (
        <p className="font-golos text-color7 text-[24px] font-[500]">{text}</p>
    )
}

export function H600({ text, fontSize = 28, color }: HFontProps) {
    return (
        <p className="font-golos text-color7 text-[28px] font-[600]">{text}</p>
    )
}

export function H700({ text, fontSize = 28, color }: HFontProps) {
    return (
        <p className="font-golos text-color7 text-[28px] font-[700]">{text}</p>
    )
}
