import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: "Incorrect Credentials",
  };
};

export const logout = () => {
  localStorage.removeItem('token');

  return {
    type: actionTypes.AUTH_LOGOUT,
    error: "Successfully Logged Out",
  };
};

export const authLogin = (user_id, password, isChecked) => {
  return (dispatch) => {
    dispatch(authStart());   // console.log(user_id)
    // console.log(password)
    // console.log(isChecked)
    axios
      .post('http://127.0.0.1:8000/api/login/', {
        user_id: user_id,
        password: password,
      })
      .then((res) => {
       
        const token = res.data.token;
        if (isChecked) {
          localStorage.setItem("token", token);
        }
        dispatch(authSuccess(token));
      })
       .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      //dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};

export const fpSuccess = (token) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_SUCCESS,
    token: token,
    msg:"Email Sent"
  };
};

export const fpFail = (error) => {
  return {
    type: actionTypes.FORGOT_PASSWORD_FAIL,
    msg: "Invalid Email",
  };
};


export const forgotPassword = (email) => {
  return (dispatch) => {
    axios
      .put('http://127.0.0.1:8000/api/password_reset', {
        email: email,
      })
      .then((res) => {
        const token = res.data.token;

        dispatch(fpSuccess(token));
      })
      .catch((err) => {
        dispatch(fpFail(err));
      });
  };
};
export const changePassword=(oldPassword,newPassword)=>{
  return (dispatch)=>{
    console.log("Before Axios")
    console.log(oldPassword)
    console.log(newPassword)
axios.put('',{
old_Password:oldPassword,
new_Password: newPassword
}).then((res)=>{
console.log(res)
const token = res.data.token;

dispatch(cpSuccess(token));

}).catch((err)=>{
  console.log(err)
  dispatch(cpFail(err));

})
  }
}

export const cpFail = (error) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAIL,
    msgCP: "Invalid Value",
  };
};
export const cpSuccess = (token) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    msgCP: "Password Changed",
    token:token
  };
};
