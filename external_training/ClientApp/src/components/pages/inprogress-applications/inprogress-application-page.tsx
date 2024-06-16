import {Header} from "../../header/header.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchStartConfigAction} from "../../../store/api-actions/api-actions.ts";
import {getRole} from "../../../store/system-process/system-getters.tsx";
import {Navigate} from "react-router-dom";
import {AdminApplications} from "./admin/admin-applications.tsx";


export function InprogressApplicationPage(): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStartConfigAction());
    }, []);

    const role = useAppSelector(getRole);
    let toRenderElement: JSX.Element = <></>;
    switch (role) {
        case "User":
            toRenderElement = <Navigate to={'/my_applications'} />
            break;
        case "Admin":
            toRenderElement = <AdminApplications />;
            break;
    }

    return (
        <div>
            <Header/>
            {toRenderElement}
        </div>
    );
}