import clientAxios from "config/axios";
import { setCreateUser, setCreateUserError, setCreateUserSucces } from ".";


export const createUserAction = (user) => async dispatch => {
    dispatch(setCreateUser());
    try {
        const res = await clientAxios.post("/users", user);
        console.log(res.data)
        dispatch(setCreateUserSucces());
    } catch (error) {
        console.log(error);
        dispatch(setCreateUserError());
    }
};

    