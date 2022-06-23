import clientAxios from "config/axios";
import {
    setCreateUser,
    setCreateUserError,
    setCreateUserSucces,
    setGetUser,
    setGetUserError,
    setGetUsers,
    setGetUsersError,
    setGetUsersSucces,
    setGetUserSucces,
} from ".";
import Swal from "sweetalert2";

export const createUserAction = (user) => async (dispatch) => {
    dispatch(setCreateUser());
    try {
        await clientAxios.post("/users", user);
        dispatch(setCreateUserSucces());
        Swal.fire({
            title: "Usuario creado",
            text: "El usuario se ha creado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error);
        dispatch(setCreateUserError());
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
};

export const getAllUsersAction = () => async (dispatch) => {
    dispatch(setGetUsers());
    try {
        const token = localStorage.getItem("token");
        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
        const response = await clientAxios.get("/users", {headers});
        dispatch(setGetUsersSucces(response.data));
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setGetUsersError(error.response.data.msg));
    }
};

export const getUserAction = (id) => async (dispatch) => {
    dispatch(setGetUser());
    try {
        const token = localStorage.getItem("token");
        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };
        const response = await clientAxios.get(`/users/getuser/${id}`, {
            headers,
        });
        dispatch(setGetUserSucces(response.data));
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setGetUserError(error.response.data.msg));
    }
}
