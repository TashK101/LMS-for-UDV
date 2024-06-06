import {useState} from "react";
import {Course} from "../../types/application.tsx";
import {CurrentApplicationType} from "../pages/my-applications/my-applications-page.tsx";
import clsx from "clsx";
import {importDataConverter} from "./import-data-converter.ts";
import './excel-import-button.css';


type ExcelImportButtonProps = {
    applications: CurrentApplicationType[];
    firstSelectedDate: Date | undefined;
    secondSelectedDate: Date | undefined;
}

function ExcelImportButton({applications, firstSelectedDate, secondSelectedDate}: ExcelImportButtonProps) {
    // const [detailsToImport, setDetailsToImport] = useState<Course[]>([]);
    const [loadButtonDisabled, setLoadButtonDisabled] = useState<boolean>(false);
    const [importFailed, setImportFailed] = useState<boolean>(false);

    const handleLoadClick = () => {
        setLoadButtonDisabled(() => true);
        // HARDCODE! WIP
        const token = localStorage.getItem('external_traininguser:https://localhost:44441:external_training')?.match(/"access_token":"(.*)","token_type/)?.[1];
        const promises = applications.map((app) =>
            fetch(new Request(
                `api/user/course?trainingApplicationId=${app.id}`,
                {headers: {Authorization: `Bearer ${token}`}})));

        const detailedApps: Course[] = [];
        Promise.all(promises)
            .then((responses) => Promise.all(responses.map((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })))
            .then((data) => data.forEach((app) => detailedApps.push(app)))
            // .then(() => setDetailsToImport(() => getSorted(detailedApps)))
            .then(() => {
                const importSuccess = importDataConverter({courses: detailedApps, firstSelectedDate, secondSelectedDate});
                if (!importSuccess) {
                    setImportFailed(() => true)
                    setTimeout(() => setImportFailed(() => false), 1400);
                }
            })
            .then(() => setLoadButtonDisabled(() => false));

    }


    // const getSorted = (arr: Course[]) => arr.toSorted((a, b) => {
    //     const topic1 = a.trainingTopic;
    //     const topic2 = b.trainingTopic;
    //     return topic1 > topic2 ? 1 : topic1 < topic2 ? -1 : 0;
    // });

    const buttonClassName = clsx('import-button',
        {'shaking': importFailed});

    return (
        <button
            className={buttonClassName}
            onClick={handleLoadClick} disabled={loadButtonDisabled || importFailed}>
            {!importFailed ? 'Выгрузить в Excel' : 'Ошибка!'}
        </button>
    );
}

export default ExcelImportButton;