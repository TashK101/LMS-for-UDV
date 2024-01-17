import DropDownMenuElement from './drop-down-menu-element';

const menuElementsLabels = [
    {
        label: 'Мои заявки',
        path: '/cur_applications'
    },
    {
        label: 'Календарь',
        path:  '/calendar',
    },
    {
        label: 'Настройки',
        path: '/settings',
    },
    {
        label: 'Выход',
        path: '/'
    }
]

type DropDownMenuProps = {
    isVisible: boolean;
}
export default function DropDownMenu({isVisible} : DropDownMenuProps) : JSX.Element {
    const visibility = isVisible ? 'visible' : 'hidden';
    return (
        <>
            <div className={`${visibility} w-screen h-screen fixed top-[80px] backdrop-opacity-10 backdrop-invert bg-black/30`}/>
            <div className={`${visibility} w-[200px] h-60 fixed right-0 top-[80px] bg-white rounded-b-lg shadow-md justify-start items-start inline-flex`}>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    {menuElementsLabels.map((element) => (<DropDownMenuElement key={element.label} elementLabel={element.label} path={element.path}></DropDownMenuElement>))}
                </div>
            </div>
        </>
    );
}