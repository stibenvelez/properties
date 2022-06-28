import clientAxios from "config/axios";
import {
    setAuth,
    setAuthError,
    setAuthSuccess,
    setLogin,
    setLoginError,
    setLoginSuccess,
    setNotAuth,
    setSignOut,
    setSignOutError,
    setSignOutSucces,
} from ".";

export const authAction = () => async (dispatch) => {
    dispatch(setAuth());
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
            dispatch(setNotAuth());
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await clientAxios.get("/users/profile", config);
        dispatch(setAuthSuccess(data));
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setAuthError());
    }
};

export const loginAction = (user) => async (dispatch) => {
    dispatch(setLogin());
    try {
        const { data } = await clientAxios.post("/users/login", user);
        localStorage.setItem("token", data.token);
        dispatch(setLoginSuccess(data));
    } catch (error) {
        dispatch(setLoginError(error.response.data.msg));
    }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
    try {
        const result = clientAxios.post("/users/forget-password", { email });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export const singOutAction = () => {
    return async (dispatch) => {
        dispatch(setSignOut());
        try {
            localStorage.removeItem("token");
            dispatch(setSignOutSucces());
        } catch (error) {
            dispatch(setSignOutError());
        }
    };
};
