import clientAxios from "config/axios";
import {
    setCreateUser,
    setCreateUserError,
    setCreateUserSucces,
    setDeleteUser,
    setDeleteUserError,
    setDeleteUserSucces,
    setGetUser,
    setGetUserError,
    setGetUsers,
    setGetUsersError,
    setGetUsersSucces,
    setGetUserSucces,
    setUpdateUser,
    setUpdateUserError,
    setUpdateUserSucces,
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
        const response = await clientAxios.get("/users", { headers });
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

export const updateUserAction = (user) => async (dispatch) => {
    dispatch(setUpdateUser());
    try {
        const token = localStorage.getItem("token");
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await clientAxios.put(`/users/${user.idUser}`, user, {
            headers,
        });
        dispatch(setUpdateUserSucces(response.data));
        Swal.fire({
            title: "Usuario actualizado",
            text: "El usuario se ha actualizado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setUpdateUserError(error.response.data.msg));
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}

//DELETE USER (change state)
export const deleteUserAction = (id) => async (dispatch) => {
    dispatch(setDeleteUser());
    try {
        const token = localStorage.getItem("token");
        let headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await clientAxios.put(`/users/delete/${id}`, {
            headers,
        });
        dispatch(setDeleteUserSucces(response.data));
        Swal.fire({
            title: "Usuario eliminado",
            text: "El usuario se ha eliminado con exito",
            icon: "success",
            confirmButtonText: "Ok",
        });
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setDeleteUserError(error.response.data.msg));
        Swal.fire({
            title: "Hubo un error",
            text: error.response.data.msg,
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
}
