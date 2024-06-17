import clsx from "clsx";
import {useAppDispatch} from "../../hooks";
import {
    fetchAdminPendingApplicationsAction,
    fetchUserTrainingApplicationsAction,
    postApplicationToSoloAction
} from "../../store/api-actions/api-actions.ts";

type PostToSoloButtonProps = {
    applicationId: number,
    variant: 'big' | 'small';
    stacked?: boolean;
}

function PostToSoloButton({applicationId, variant, stacked = false}: PostToSoloButtonProps): JSX.Element {
    const dispatch = useAppDispatch();

    const className = clsx('application-card__button shadow-md active:shadow-none',
        {
            'application-card__button_basic': !stacked,
            'application-card__button_stacked': stacked,
            'application-card__button_small': variant === 'small',
            'application-card__button_big': variant === 'big',
        })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(postApplicationToSoloAction(applicationId))
            .then(() => dispatch(fetchAdminPendingApplicationsAction()))
            .then(() => dispatch(fetchUserTrainingApplicationsAction()));
        event.stopPropagation();
    }

    return (
        <button className={className} onClick={handleClick}>Отправить в Solo</button>
    );
}

export default PostToSoloButton;
