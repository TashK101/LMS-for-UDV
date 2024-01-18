import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchUserArchivedApplicationsAction} from "../../store/api-actions/api-actions.ts";
import {State} from "../../types/state.tsx";
import {UniversalArchivedApplications} from "./universal-archived-applications.tsx";

const getArchivedApplications = (state: State) => state.userArchivedApplications;

export function ArchivedApplicationsField() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserArchivedApplicationsAction());
    }, []);

    const archivedApplications = useAppSelector(getArchivedApplications);
    return <UniversalArchivedApplications archivedApplications={archivedApplications}/>
}