import { SET_LOGIN } from "../types";

export const loginAction = (email, password, callback) =>
  async (dispatch) => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          console.log(response)
          if (response.success) {
            dispatch({
              type: SET_LOGIN,
              payload: response,
            })
            callback(true);
          } else {
            callback(false);
          }
        });
    } catch (err) {
      console.log(err);
      callback(false);
    }
  };

export const googleLogin = (credential, callback) =>
  async (dispatch) => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/user/socialmedialogin`, {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credential,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            dispatch({
              type: SET_LOGIN,
              payload: response,
            })
            callback(true);
            return;
          } else {

            if (response?.message === "Auth failed") {
              callback(401);
            }
            callback(false);
          }
        });
    } catch (err) {
      console.log(err);
      callback(false);
    }
  };

export const googleSignUp = (credential, callback) =>
  async (dispatch) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/user/socialmediasignup`, {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credential,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          console.log(response)
          if (response.success) {
            dispatch({
              type: SET_LOGIN,
              payload: response,
            })
            callback(true);
          } else {
            callback(false);
          }
        });
    } catch (err) {
      console.log(err);
      callback(false);
    }
  };