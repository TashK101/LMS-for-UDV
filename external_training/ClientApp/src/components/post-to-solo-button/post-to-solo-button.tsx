import clsx from "clsx";
import {useAppDispatch} from "../../hooks";
import {
    fetchAdminPendingApplicationsAction,
    fetchUserTrainingApplicationsAction,
    postApplicationToSoloAction
} from "../../store/api-actions/api-actions.ts";

type PostToSoloButtonProps = {
    applicationId: number,
    stacked?: boolean;
}

function PostToSoloButton({applicationId, stacked = false}: PostToSoloButtonProps): JSX.Element {
    const dispatch = useAppDispatch();

    const className = clsx('application-card__button',
        {
            'application-card__button_basic': !stacked,
            'application-card__button_stacked': stacked
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
