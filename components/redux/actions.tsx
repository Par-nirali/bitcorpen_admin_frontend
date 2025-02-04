export const SET_PROJECTS = "SET_PROJECTS";

export const setProjectss = (value: any) => ({
  type: SET_PROJECTS,
  payload: value,
});

export const SELECTED_PROJECTS = "SELECTED_PROJECTS";

export const selectedProjects = (value: any) => ({
  type: SELECTED_PROJECTS,
  payload: value,
});

export const All_PROJECTS = "ALL_PROJECTS";

export const allProjects = (value: any) => ({
  type: All_PROJECTS,
  payload: value,
});

export const TEAM_All_LEADER_PROJECTS = "team leader all projects";

export const teamAllProjects = (value: any) => ({
  type: TEAM_All_LEADER_PROJECTS,
  payload: value,
});

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setSearchTerm = (term: any) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const SET_DESIGNATION_ID = "SET_DESIGNATION_ID";

export const setDesignationId = (value: any) => ({
  type: SET_DESIGNATION_ID,
  payload: value,
});

export const EMP_BUDGETS = "EMP_BUDGETS";

export const setEmpBudgets = (value: any) => ({
  type: EMP_BUDGETS,
  payload: value,
});

export const SET_MANAGER_SCORES = "SET_MANAGER_SCORES";

// export const setManagerScores = (newScores: any[]) => ({
//   type: SET_MANAGER_SCORES,
//   payload: newScores,
// });
// Define the action creator to return an object
export const setManagerScores = (
  newScores: any[]
): { type: string; payload: any[] } => {
  return {
    type: "SET_MANAGER_SCORES", // Action type
    payload: newScores, // Payload with the scores
  };
};

export const CEO_DEPARTMENT = "CEO_DEPARTMENT";

export const setCeodepartment = (value: any) => ({
  type: CEO_DEPARTMENT,
  payload: value,
});

export const PREV_VALUE = "PREV_VALUE";

export const setPrevvalue = (value: any) => ({
  type: PREV_VALUE,
  payload: value,
});

export const SELECTED_TAB = "SELECTED_TAB";

export const setSelectedTab = (value: any) => ({
  type: SELECTED_TAB,
  payload: value,
});

export const SELECTED_EMP = "SELECTED_EMP";

export const setSelectedEmpl = (value: any) => ({
  type: SELECTED_EMP,
  payload: value,
});

export const SHOW_EMP = "SHOW_EMP";

export const setShowEmp = (value: any) => ({
  type: SHOW_EMP,
  payload: value,
});
export const ALL_NOTIFICATION = "ALL_NOTIFICATION";

export const setShowNotification = (value: any) => ({
  type: ALL_NOTIFICATION,
  payload: value,
});

export const SET_NOTIFICATION_STATUS = "SET_NOTIFICATION_STATUS";

export const setNotificationStatus = (hasNotifications: boolean) => ({
  type: SET_NOTIFICATION_STATUS,
  payload: hasNotifications,
});

export const SET_NOTIFICATION_STATUS_BACKEND =
  "SET_NOTIFICATION_STATUS_BACKEND";

export const setNotificationStatusBackend = (hasNotificationsBackend: boolean) => ({
  type: SET_NOTIFICATION_STATUS_BACKEND,
  payload: hasNotificationsBackend,
});

export const SET_COMMENT = "SET_COMMENT";

export const setComment = (notificationId: any, comment: any) => ({
  type: SET_COMMENT,
  payload: { notificationId, comment },
});
