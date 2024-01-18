import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchManagerArchivedApplicationsAction} from "../../../../store/api-actions/api-actions.ts";
import {State} from "../../../../types/state.tsx";
import {UniversalArchivedApplications} from "../../../current-applications-utils/universal-archived-applications.tsx";

export function ManagerArchivedApplications() {
    const getArchivedApplications = (state: State) => state.managerArchivedApplications;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchManagerArchivedApplicationsAction());
    }, []);
    const archivedApplications = useAppSelector(getArchivedApplications);

    return <UniversalArchivedApplications archivedApplications={archivedApplications}/>
}