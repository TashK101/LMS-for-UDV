import {
    ApplicationsStatusTrans,
    CurrentApplicationType
} from "../pages/current-applications/current-applications-page.tsx";
import {SmallCalendarSingleDatePickerWithInput} from "../calendars/small-calendar/small-calendar-datepicker.tsx";
import {ApplicationCard} from "./application-card.tsx";
import {useState} from "react";
import {ShortApplicationInfoType} from "../../types/short-application-info.tsx";

export function UniversalArchivedApplications({archivedApplications}: {
    archivedApplications: ShortApplicationInfoType[]
}) {
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>();
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>();
    const applications: CurrentApplicationType[] = []

    if (archivedApplications) {
        for (let i = 0; i < archivedApplications.length; i++) {
            let trAppl = archivedApplications[i];
            applications.push({
                id: trAppl.trainingApplicationId,
                title: trAppl.trainingTopic,
                date: new Date(trAppl.createdAt),
                // @ts-ignore
                status: ApplicationsStatusTrans[trAppl.status],
                comments_count: trAppl.commentsCount,
            })
        }
    }

    let filteredApplications = applications
    filteredApplications = firstSelectedDate ? filteredApplications.filter((appl) => new Date(appl.date.toDateString()) >= firstSelectedDate) : filteredApplications;
    filteredApplications = secondSelectedDate ? filteredApplications.filter((appl) => new Date(appl.date.toDateString()) <= secondSelectedDate) : filteredApplications;


    return (
        <div>
            <div className={"ml-[55px] mt-[30px] flex gap-[20px]"}>
                <SmallCalendarSingleDatePickerWithInput inRangeFrom={true} setSelectedDate={setFirstSelectedDate}
                                                        maxDate={secondSelectedDate}/>
                <SmallCalendarSingleDatePickerWithInput setSelectedDate={setSecondSelectedDate} inRangeFrom={false}
                                                        minDate={firstSelectedDate}/>
            </div>

            <div className={"flex justify-center mt-[30px] mx-[55px]"}>
                <div className={"flex flex-wrap w-full"}>
                    {filteredApplications.map((appl, i) => (
                        <ApplicationCard key={i} application={appl}/>
                    ))}
                </div>
            </div>
        </div>
    )
    // flex flex-wrap w-[1185px]
}