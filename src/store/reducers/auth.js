import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  isChecked: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}; 



const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    error: action.error,
  });
};

const forgotPassword = (state, action) => {
  return state;
};

const fpSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    msg: action.msg,
    loading: false,
  });
};

const fpFail = (state, action) => {
  return updateObject(state, {
    msg: action.msg,
    loading: false,
  });
}; 

const changePassword=(state,action)=>{
  return state
}
const cpSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    msgCP: action.msgCP,
    loading: false,
  });
};

const cpFail = (state, action) => {
  return updateObject(state, {
    msgCP: action.msgCP,
    loading: false,
  });
}; 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FORGOT_PASSWORD:
      return forgotPassword(state, action);
      case actionTypes.FORGOT_PASSWORD_FAIL:
        return fpFail(state, action);
      case actionTypes.FORGOT_PASSWORD_SUCCESS:
        return fpSuccess(state,action);
        case actionTypes.CHANGE_PASSWORD:
      return changePassword(state, action);
      case actionTypes.CHANGE_PASSWORD_FAIL:
        return cpFail(state, action);
      case actionTypes.CHANGE_PASSWORD_SUCCESS:
        return cpSuccess(state,action);
    default:
      return state;
  }
};

export default reducer;
