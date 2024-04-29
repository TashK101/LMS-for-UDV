import {State} from "../../../../types/state.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useEffect} from "react";
import {
    fetchAdminArchivedApplicationsAction
} from "../../../../store/api-actions/api-actions.ts";
import {UniversalArchivedApplications} from "../../../current-applications-utils/universal-archived-applications.tsx";

export function AdminArchivedApplications() {
    const getArchivedApplications = (state: State) => state.adminArchivedApplications;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAdminArchivedApplicationsAction());
    }, []);
    const archivedApplications = useAppSelector(getArchivedApplications);

    return <UniversalArchivedApplications archivedApplications={archivedApplications}/>
}