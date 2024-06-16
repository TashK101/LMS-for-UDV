import {useState} from "react";
import clsx from "clsx";
import {importDataConverter} from "./import-data-converter.ts";
import './excel-import-button.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchExportCoursesAction} from "../../store/api-actions/api-actions.ts";
import {getExportCourses} from "../../store/system-process/system-getters.tsx";


type ExcelImportButtonProps = {
    firstSelectedDate: Date | undefined;
    secondSelectedDate: Date | undefined;
}

function ExcelImportButton({firstSelectedDate, secondSelectedDate}: ExcelImportButtonProps) {
    // const [detailsToImport, setDetailsToImport] = useState<Course[]>([]);
    const dispatch = useAppDispatch();
    const [loadButtonDisabled, setLoadButtonDisabled] = useState<boolean>(false);
    const [importFailed, setImportFailed] = useState<boolean>(false);
    const exportCourses = useAppSelector(getExportCourses);

    const handleLoadClick = () => {
        setLoadButtonDisabled(() => true);
        dispatch(fetchExportCoursesAction())
            .then(() => {
                const importSuccess = importDataConverter({courses: exportCourses, firstSelectedDate, secondSelectedDate});
                if (!importSuccess) {
                    setImportFailed(() => true)
                    setTimeout(() => setImportFailed(() => false), 1400);
                }
            })
            .then(() => setLoadButtonDisabled(() => false))

        // HARDCODE! WIP
        // const token = localStorage.getItem('external_traininguser:https://localhost:44441:external_training')?.match(/"access_token":"(.*)","token_type/)?.[1];
        // const promises = applications.map((app) =>
        //     fetch(new Request(
        //         `api/user/course?trainingApplicationId=${app.id}`,
        //         {headers: {Authorization: `Bearer ${token}`}})));

        // const detailedApps: Course[] = [];
        // Promise.all(promises)
        //     .then((responses) => Promise.all(responses.map((res) => {
        //         if (res.status === 200) {
        //             return res.json();
        //         }
        //     })))
        //     .then((data) => data.forEach((app) => detailedApps.push(app)))
        //     // .then(() => setDetailsToImport(() => getSorted(detailedApps)))
        //     .then(() => {
        //         const importSuccess = importDataConverter({courses: detailedApps, firstSelectedDate, secondSelectedDate});
        //         if (!importSuccess) {
        //             setImportFailed(() => true)
        //             setTimeout(() => setImportFailed(() => false), 1400);
        //         }
        //     })
        //     .then(() => setLoadButtonDisabled(() => false));
    }


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