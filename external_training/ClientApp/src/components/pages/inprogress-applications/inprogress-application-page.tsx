import {Header} from "../../header/header.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchStartConfigAction} from "../../../store/api-actions/api-actions.ts";
import {getRole} from "../../../store/system-process/system-getters.tsx";
import {useNavigate} from "react-router-dom";
import {ManagerApplicationsField} from "./manager/manager-applications-field.tsx";
import {AdminApplicationsField} from "./admin/admin-applications-field.tsx";


export function InprogressApplicationPage(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchStartConfigAction());
    }, []);

    const role = useAppSelector(getRole);
    let toRenderElement: JSX.Element = <></>;
    switch (role) {
        case "User":
            navigate('/cur_applications');
            break;
        case "Manager":
            toRenderElement = <ManagerApplicationsField />;
            break;
        case "Admin":
            toRenderElement = <AdminApplicationsField />;
            break;
    }

    // <div className={"ml-10 mt-[50px] flex gap-[20px]"}>
    //     <SmallCalendarSingleDatePickerWithInput inRangeFrom={true} setSelectedDate={setFirstSelectedDate}
    //                                             maxDate={secondSelectedDate}/>
    //     <SmallCalendarSingleDatePickerWithInput setSelectedDate={setSecondSelectedDate} inRangeFrom={false}
    //                                             minDate={firstSelectedDate}/>
    // </div>

    return (
        <div>
            <Header/>
            {toRenderElement}
        </div>
    );
}