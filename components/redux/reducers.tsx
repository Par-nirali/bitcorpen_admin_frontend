import {
  SET_PROJECTS,
  SELECTED_PROJECTS,
  All_PROJECTS,
  SET_SEARCH_TERM,
  SET_DESIGNATION_ID,
  EMP_BUDGETS,
  SET_MANAGER_SCORES,
  CEO_DEPARTMENT,
  PREV_VALUE,
  SELECTED_TAB,
  SELECTED_EMP,
  SHOW_EMP,
  SET_NOTIFICATION_STATUS,
  SET_NOTIFICATION_STATUS_BACKEND,
  SET_COMMENT,
} from "./actions";

interface State {
  projectss: any[];
  selectedproject: "";
  allprojects: [];
  searchTerm: "";
  designationid: "";
  empbudget: [];
  managerScore: [];
  ceodepartmentid: "";
  prevselected: "";
  selectedtab: "sales";
  selectedemp: [];
  showemp: false;
  hasNotifications: boolean;
  hasNotificationsBackend: boolean;
  comments: {};
}

const initialState: State = {
  projectss: [],
  selectedproject: "",
  allprojects: [],
  searchTerm: "",
  designationid: "",
  empbudget: [],
  managerScore: [],
  ceodepartmentid: "",
  prevselected: "",
  selectedtab: "sales",
  selectedemp: [],
  showemp: false,
  hasNotifications: false,
  hasNotificationsBackend: false,
  comments: {},
};

const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projectss: action.payload,
      };
    case SELECTED_PROJECTS:
      return {
        ...state,
        selectedproject: action.payload,
      };
    case All_PROJECTS:
      return {
        ...state,
        allprojects: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SET_DESIGNATION_ID:
      return {
        ...state,
        designationid: action.payload,
      };
    case EMP_BUDGETS:
      return {
        ...state,
        empbudget: action.payload,
      };
    case SET_MANAGER_SCORES:
      return {
        ...state,
        managerScore: action.payload,
      };
    case CEO_DEPARTMENT:
      return {
        ...state,
        ceodepartmentid: action.payload,
      };
    case PREV_VALUE:
      return {
        ...state,
        prevselected: action.payload,
      };
    case SELECTED_TAB:
      return {
        ...state,
        selectedtab: action.payload,
      };
    case SELECTED_EMP:
      return {
        ...state,
        selectedemp: action.payload,
      };
    case SHOW_EMP:
      return {
        ...state,
        showemp: action.payload,
      };
    case SET_NOTIFICATION_STATUS:
      return {
        ...state,
        hasNotifications: action.payload,
      };
    case SET_NOTIFICATION_STATUS_BACKEND:
      return {
        ...state,
        hasNotificationsBackend: action.payload,
      };
    case SET_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.notificationId]: action.payload.comment,
        },
      };
    default:
      return state;
  }
};

export default reducer;
