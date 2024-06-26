import {store} from "../store/store";
import {Notifications} from "./notifications";
import {Application, ApprovingManager, Course} from "./application";
import {EventType} from "./event.tsx";
import {ShortAdminPendingApplicationInfoType, ShortApplicationInfoType} from "./short-application-info.tsx";


export type SystemProcess = {
    isDataLoading: boolean;
    error: string | null;
    application: Application | undefined;
    role: string;
    userId: string;
    userFullName: string;
    userEmail: string;
    notifications: Notifications;
    events: EventType[];
    trainingApplications: ShortApplicationInfoType[];
    course: Course | undefined;

    userTrainingApplications: ShortApplicationInfoType[];
    userArchivedApplications: ShortApplicationInfoType[];
    adminPendingApplications: ShortAdminPendingApplicationInfoType[];
    adminArchivedApplications: ShortApplicationInfoType[];
    managers: ApprovingManager[];
    exportCourses: Course[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;