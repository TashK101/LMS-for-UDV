import {JSX} from "react/jsx-runtime";
import {ApplicationSubCardProps} from "../application-card.tsx";
import {StatusIcon} from "../../current-applications-utils/icons/status-icons.tsx";

function CardContentFull({
                      application,
                      applicationManager,
                      applicationDateStr,
                      showSOLOButton = false
                  }: ApplicationSubCardProps): JSX.Element {
    return (
        <>
            <div className='application-card__content application-card__content_basic'>
                <div>
                    <p className='application-card__title application-card__title_basic'>{application.title}</p>
                    <p className='application-card__info-field application-card__info-field_basic'>{applicationManager}</p>
                    <p className='application-card__info-field application-card__info-field_basic'>{applicationDateStr}</p>
                    {showSOLOButton &&
                        <p className='application-card__info-field application-card__info-field_basic'>{application.comments_count} комментариев</p>}
                </div>
                {!showSOLOButton &&
                    <>
                        <div className='application-card__status'>
                            <StatusIcon variant={application.status} />
                            <p className={"flex items-center"}>{application.status}</p>
                        </div>
                        <p className='application-card__comments'>{application.comments_count} комментариев</p>
                    </>
                }
            </div>
            {showSOLOButton &&
                <button className='application-card__button application-card__button_basic'>Отправить в Solo</button>
            }
        </>
    );
}

export default CardContentFull;
