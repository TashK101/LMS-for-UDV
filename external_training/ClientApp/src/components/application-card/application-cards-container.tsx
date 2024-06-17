import {ApplicationCard} from "./application-card.tsx";
import {MAX_CARDS_NOT_TO_STACK} from "../../const.ts";
import clsx from "clsx";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import {useState} from "react";
import DateFilter from "../date-filter/date-filter.tsx";
import ExcelImportButton from "../excel-importer/excel-import-button.tsx";

type ApplicationCardsContainerProps = {
    applications: CurrentApplicationType[];
    showStackedVersionIcon?: boolean;
    showDatePicker?: boolean;
    showImportButtonInDatePicker?: boolean;
    showSOLOButtonIfNeed?: boolean;
}

function ApplicationCardsContainer({
                                       applications,
                                       showStackedVersionIcon = false,
                                       showDatePicker = false,
                                       showImportButtonInDatePicker = false,
                                       showSOLOButtonIfNeed = false,
                                   }: ApplicationCardsContainerProps) {
    const [firstSelectedDate, setFirstSelectedDate] = useState<Date | undefined>();
    const [secondSelectedDate, setSecondSelectedDate] = useState<Date | undefined>();

    let filteredApplications = applications
    filteredApplications = firstSelectedDate ? filteredApplications.filter((app) => new Date(app.date.toDateString()) >= firstSelectedDate) : filteredApplications;
    filteredApplications = secondSelectedDate ? filteredApplications.filter((app) => new Date(app.date.toDateString()) <= secondSelectedDate) : filteredApplications;
    filteredApplications.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)

    const stacked = filteredApplications.length > MAX_CARDS_NOT_TO_STACK;
    const containerClassName = clsx({
        'flex': true,
        'flex-col flex-grow-1 gap-[8px]': stacked,
        'flex-wrap gap-[32px]': !stacked
    })

    return (
        <>
            {showDatePicker &&
                <div className='flex justify-between items-center mt-[36px] mx-[48px]'>
                    <DateFilter setFirstSelectedDate={setFirstSelectedDate}
                                setSecondSelectedDate={setSecondSelectedDate}
                                firstSelectedDate={firstSelectedDate}
                                secondSelectedDate={secondSelectedDate}/>
                    {showImportButtonInDatePicker &&
                        <ExcelImportButton firstSelectedDate={firstSelectedDate}
                                           secondSelectedDate={secondSelectedDate}/>
                    }
                </div>
            }
            <div className={"flex mx-[48px] mt-[30px] justify-start items-center"}>
                <div className={containerClassName}>
                    {filteredApplications.map((app) => (
                        <ApplicationCard key={app.id}
                                         application={app}
                                         stacked={stacked}
                                         showStackedVersionIcon={showStackedVersionIcon}
                                         showSOLOButtonIfNeed={showSOLOButtonIfNeed}/>
                    ))}
                </div>
            </div>

        </>
    );
}

export default ApplicationCardsContainer;
