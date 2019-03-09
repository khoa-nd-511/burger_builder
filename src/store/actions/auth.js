import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (localId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: localId,
    idToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignup) => {
  let baseURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtkavyF3oI4_2ireKJ3TWNTmmOIlB4B5o`;
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    if (isSignup) {
      baseURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAtkavyF3oI4_2ireKJ3TWNTmmOIlB4B5o`;
    }

    try {
      const res = await axios.post(baseURL, authData);
      if (await res && res.status === 200) {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        await dispatch(authSuccess(res.data.localId, res.data.idToken));
        await dispatch(authLogout(res.data.expiresIn));
      }
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authLogout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, +expirationTime * 1000);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(logout());

    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (expirationDate <= new Date()) return dispatch(logout());

    const userId = localStorage.getItem("userId");
    dispatch(authSuccess(userId, token));
    dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
  };
};
