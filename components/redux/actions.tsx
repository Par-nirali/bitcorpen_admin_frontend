export const SET_DETAILS = "SET_DETAILS";

export const selectedDetails = (value: any) => ({
  type: SET_DETAILS,
  payload: value,
});

export const SET_REC_JOIN_USER_DETAILS = "SET_REC_JOIN_USER_DETAILS";

export const selectedRecJoinUserDetails = (value: any) => ({
  type: SET_REC_JOIN_USER_DETAILS,
  payload: value,
});

export const SET_REC_SUBSCRIBED_USER_DETAILS =
  "SET_REC_SUBSCRIBED_USER_DETAILS";

export const selectedRecSubscribedUserDetails = (value: any) => ({
  type: SET_REC_SUBSCRIBED_USER_DETAILS,
  payload: value,
});

export const SELECTED_PROJECTS = "SELECTED_PROJECTS";

export const selectedProjects = (value: any) => ({
  type: SELECTED_PROJECTS,
  payload: value,
});

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setSearchTerm = (term: any) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const SELECTED_TAB = "SELECTED_TAB";

export const setSelectedTab = (value: any) => ({
  type: SELECTED_TAB,
  payload: value,
});
