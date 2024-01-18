import {State} from "../../../../types/state.tsx";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useEffect, useState} from "react";
import {fetchAdminPendingApplicationsAction} from "../../../../store/api-actions/api-actions.ts";
import {ApplicationsStatusTrans} from "../../current-applications/current-applications-page.tsx";
import {AdminPendingApplicationCard} from "./admin-pending-application-card.tsx";
import {ApplicationStatus} from "../../../current-applications-utils/application-status.ts";

export type CurrentAdminPendingApplicationType = {
    id: number,
    title: string,
    date: Date,
    status: ApplicationStatus,
    comments_count: number,
    created_name: string,
}

export function AdminPendingApplications() {
    const [radioValue, setRadioValue] = useState<string>(() => "agreement");
    const getPendingApplications = (state: State) => state.adminPendingApplications
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAdminPendingApplicationsAction());
    }, []);
    const pendingApplications = useAppSelector(getPendingApplications);
    let applications: CurrentAdminPendingApplicationType[] = []

    if (pendingApplications) {
        for (let i = 0; i < pendingApplications.length; i++) {
            let trAppl = pendingApplications[i];
            applications.push({
                id: trAppl.trainingApplicationId,
                title: trAppl.trainingTopic,
                date: new Date(trAppl.createdAt),
                // @ts-ignore
                status: ApplicationsStatusTrans[trAppl.status],
                comments_count: trAppl.commentsCount,
                created_name: trAppl.userFullName,
            })
        }
    }

    const agreementApplications = applications.filter((appl) => appl.status === ApplicationStatus.AwaitingManagerApproval);
    const courseSelectionApplications = applications.filter((appl) => appl.status === ApplicationStatus.CourseSelection);
    const contractApplications = applications.filter((appl) => appl.status === ApplicationStatus.AwaitingContract);
    const paymentApplications = applications.filter((appl) => appl.status === ApplicationStatus.AwaitingPayment);

    switch (radioValue) {
        case "agreement":
            applications = agreementApplications;
            break;
        case "courseSelection":
            applications = courseSelectionApplications;
            break;
        case "contract":
            applications = contractApplications;
            break;
        case "payment":
            applications = paymentApplications;
            break;
        default:
            applications = [];
            break;
    }

    const onChangeHandler = (ev: any) => setRadioValue(() => ev.target.value);

    const labelClassName = "box-border inline-block cursor-pointer h-[40px] flex items-center px-4 rounded-b-md"
    const inputClassName = "hidden [&+label]:checked:bg-[#FFEDCF] [&+label]:checked:border-t-[2px] [&+label]:checked:border-black [&+label]:hover:bg-[#FFEDCF]"
    return (
        <div className={"mt-[30px]"}>
            <div className={"border-y border-black flex justify-around items-center box-border"}>
                <div className="inline-block text-center">
                    <input onChange={onChangeHandler} id="radio-1" type="radio" name="radio" value="agreement"
                           className={inputClassName} defaultChecked/>
                    <label htmlFor="radio-1" className={labelClassName}>Согласование
                        - {agreementApplications ? agreementApplications.length : 0}</label>
                </div>

                <div className="inline-block">
                    <input onChange={onChangeHandler} id="radio-2" type="radio" name="radio" value="courseSelection"
                           className={inputClassName}/>
                    <label htmlFor="radio-2" className={labelClassName}>Подбор курса
                        - {courseSelectionApplications ? courseSelectionApplications.length : 0}</label>
                </div>

                <div className="inline-block">
                    <input onChange={onChangeHandler} id="radio-3" type="radio" name="radio" value="contract"
                           className={inputClassName}/>
                    <label htmlFor="radio-3" className={labelClassName}>Договор
                        - {contractApplications ? contractApplications.length : 0}</label>
                </div>

                <div className="inline-block">
                    <input onChange={onChangeHandler} id="radio-4" type="radio" name="radio" value="payment"
                           className={inputClassName}/>
                    <label htmlFor="radio-4" className={labelClassName}>Оплата
                        - {paymentApplications ? paymentApplications.length : 0}</label>
                </div>
            </div>

            <div className={"flex justify-center mx-[125px] mt-[30px]"}>
                <div className={"flex flex-wrap w-[1185px]"}>
                    {applications.map((appl, i) => (
                        <AdminPendingApplicationCard key={i} application={appl}/>
                    ))}
                </div>
            </div>
        </div>
    )
}