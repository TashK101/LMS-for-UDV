
export type textValueBlockProps = {
    textValueProps: [string, string | number | null | undefined][];
}
export function TextValueBlock({textValueProps}: textValueBlockProps): JSX.Element {
    return (<>
    <div className='top-bottom-20'>
        {textValueProps.map((t, index) =>
            t?
                <div key={index} className='two-columns'>
                    <div className='half-transparent-text'>{t[0]}</div>
                    <div className='regular-text'>{t[1]}</div>
                </div>
                :
                null
        )}
    </div>
    <hr className="solid"></hr>
    </>)
}