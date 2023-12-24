import DropDownMenuElement from './drop-down-menu-element';

const menuElementsLabels = [
    'Мои заявки',
    'Календарь',
    'Настройки',
    'Выход'
]

type DropDownMenuProps = {
    isVisible: boolean;
}
export default function DropDownMenu({isVisible} : DropDownMenuProps) : JSX.Element {
    const visibility = isVisible ? 'visible' : 'hidden';
    return (
        <div className={`${visibility} w-[200px] h-60 fixed top-20 right-0 py-2 bg-white rounded-b-lg shadow justify-start items-start inline-flex`}>
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                {menuElementsLabels.map((label) => (<DropDownMenuElement key={label} elementLabel={label}></DropDownMenuElement>))}
            </div>
        </div>
    );
}