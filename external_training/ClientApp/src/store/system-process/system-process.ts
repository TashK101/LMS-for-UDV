import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';
import {SystemProcess} from '../../types/state';
import {Notifications} from "../../types/notifications";
import {Application, ApprovingManager, Course, Participant} from "../../types/application";
import {EventType} from "../../types/event.tsx";
import {StartConfig} from "../../types/startConfig";
import {ShortAdminPendingApplicationInfoType, ShortApplicationInfoType} from "../../types/short-application-info.tsx";

const initialState: SystemProcess = {
    error: null,
    isDataLoading: false,
    notifications: [],
    application: undefined,
    role: '',
    userId: '',
    userFullName: '',
    events: [],
    trainingApplications: [],
    course: undefined,
    userTrainingApplications: [],
    userArchivedApplications: [],
    adminPendingApplications: [],
    adminArchivedApplications: [],
    exportCourses: [],
    managers: [],
    userEmail: '',
};

export const systemProcess = createSlice({
    name: 'SYSTEM',
    initialState,
    reducers: {
        setError : (state, action : PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setLoadingStatus : (state, action : PayloadAction<boolean>) => {
            state.isDataLoading = action.payload;
        },
        loadNotifications : (state, action : PayloadAction<Notifications>) => {
            state.notifications = action.payload;
        },
        loadStartConfig : (state, action : PayloadAction<StartConfig>) => {
            state.role = action.payload.roleName;
            state.userFullName = action.payload.userFullName;
            state.userId = action.payload.userId;
            state.userEmail = action.payload.userEmail;
        },
        loadCourseDetails : (state, action : PayloadAction<Course>) => {
            state.course = action.payload;
        },
        loadApplicationDetails : (state, action : PayloadAction<Application>) => {
            state.application = action.payload;
        },
        loadEvents : (state, action : PayloadAction<EventType[]>) => {
            state.events = action.payload;
        },
        loadUserTrainingApplications : (state, action : PayloadAction<ShortApplicationInfoType[]>) => {
            state.userTrainingApplications = action.payload;
        },
        loadUserArchivedApplications : (state, action : PayloadAction<ShortApplicationInfoType[]>) => {
            state.userArchivedApplications = action.payload;
        },
        loadAdminPendingApplications : (state, action : PayloadAction<ShortAdminPendingApplicationInfoType[]>) => {
            state.adminPendingApplications = action.payload;
        },
        loadAdminArchivedApplications : (state, action : PayloadAction<ShortApplicationInfoType[]>) => {
            state.adminArchivedApplications = action.payload;
        },
        loadManagers: (state, action: PayloadAction<ApprovingManager[]>) => {
            state.managers = action.payload;
        },
        loadExportCourses: (state, action) => {
            state.exportCourses = action.payload;
        },
        loadEmployees: (state, action: PayloadAction<Participant[]>) => {
            state.employees = action.payload;
        }
    }
});
export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const {
    setLoadingStatus,
    setError,
    loadNotifications,
    loadEvents,
    loadStartConfig,
    loadCourseDetails,
    loadUserTrainingApplications,
    loadUserArchivedApplications,
    loadApplicationDetails,
    loadManagers,
    loadEmployees,
    loadAdminPendingApplications,
    loadAdminArchivedApplications,
    loadExportCourses
} = systemProcess.actions;
