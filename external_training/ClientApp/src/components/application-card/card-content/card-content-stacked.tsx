import {ApplicationSubCardProps} from "../application-card.tsx";
import {JSX} from "react/jsx-runtime";
import {StatusIcon} from "../../current-applications-utils/icons/status-icons.tsx";

function CardContentStacked({
                                application,
                                applicationManager,
                                applicationDateStr,
                                showStackedVersionIcon,
                                showSOLOButton = false
                            }: ApplicationSubCardProps): JSX.Element {
    return (
        <div className='application-card__content application-card__content_stacked'>
            <div className='flex items-center overflow-hidden flex-grow-1'>
                {showStackedVersionIcon &&
                    <div className='mr-[12px]'>
                        <StatusIcon variant={application.status} />
                    </div>}
                <div className='max-w-[92%]'>
                    <p className='application-card__title application-card__title_stacked'>{application.title}</p>
                    <p className='application-card__info-field application-card__info-field_stacked'>{applicationManager}</p>
                </div>
            </div>
            <div className='flex-shrink-0 flex items-center flex-col justify-center'>
                <p className='application-card__info-field'>{applicationDateStr}</p>
                {showSOLOButton &&
                    <button className='application-card__button application-card__button_stacked'>Отправить в
                        Solo</button>}
            </div>
        </div>
    );
}

export default CardContentStacked;
