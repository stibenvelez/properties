import clientAxios from "config/axios";
import { setLogin, setLoginError, setLoginSuccess } from ".";


export const loginAction = (user) => async (dispatch) => {
    dispatch(setLogin());
    try {
        const response = await clientAxios.post("/users/login", user);
        dispatch(setLoginSuccess(response.data[0]));
    } catch (error) {
        dispatch(setLoginError(error.response.data.msg));
    }
}
