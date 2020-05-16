import { actionTypes } from "./actionTypes"
import axios from "axios"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("userId")

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart())

    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh9OYSwhN4z-kYCmf8WQfkB5a3D2R2ldI"

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh9OYSwhN4z-kYCmf8WQfkB5a3D2R2ldI"
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res.data)
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000,
        )
        localStorage.setItem("token", res.data.idToken)
        localStorage.setItem("expirationDate", expirationDate)
        localStorage.setItem("userId", res.data.localId)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch((error) => {
        console.log(error)
        dispatch(authFail(error.response.data.error))
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token")
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId")
        dispatch(authSuccess(token, userId))
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
          ),
        )
      } else {
        dispatch(logout())
      }
    }
  }
}
