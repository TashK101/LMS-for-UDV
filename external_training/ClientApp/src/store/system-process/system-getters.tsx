import {State} from '../../types/state';

export const getIsDataLoading = (state: State) => state.isDataLoading;
export const getApplication = (state: State) => state.application;
export const getRole = (state: State) => state.role;
export const getNotifications = (state: State) => state.notifications;
export const getfullName = (state: State) => state.userFullName;
export const getId = (state: State) => state.userId;
export const getApplicationDetails = (state: State) => state.application;
export const getCourseDetails = (state: State) => state.course;