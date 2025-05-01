import {
  SET_DETAILS,
  SET_REC_JOIN_USER_DETAILS,
  SET_REC_SUBSCRIBED_USER_DETAILS,
  SELECTED_PROJECTS,
  SET_SEARCH_TERM,
  SELECTED_TAB,
} from "./actions";

interface State {
  selectedDetails: {};
  selectedRecJoinUserDetails: {};
  selectedRecSubscribedUserDetails: {};
  selectedproject: "";
  searchTerm: "";
  selectedtab: "sales";
}

const initialState: State = {
  selectedDetails: {},
  selectedRecJoinUserDetails: {},
  selectedRecSubscribedUserDetails: {},
  selectedproject: "",
  searchTerm: "",
  selectedtab: "sales",
};

const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_DETAILS:
      return {
        ...state,
        selectedDetails: action.payload,
      };
    case SET_REC_JOIN_USER_DETAILS:
      return {
        ...state,
        selectedRecJoinUserDetails: action.payload,
      };
    case SET_REC_SUBSCRIBED_USER_DETAILS:
      return {
        ...state,
        selectedRecSubscribedUserDetails: action.payload,
      };
    case SELECTED_PROJECTS:
      return {
        ...state,
        selectedproject: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SELECTED_TAB:
      return {
        ...state,
        selectedtab: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
