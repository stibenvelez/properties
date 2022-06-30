import clientAxios from "config/axios";
import Swal from "sweetalert2";
import {
    resetIsSent,
    setContactMe,
    setContactMeError,
    setContactMeSucces,
    setGetToContact,
    setGetToContactError,
    setGetToContactSuccess,
} from ".";

export const contactMeAction = (contact) => async (dispatch) => {
    dispatch(setContactMe());
    try {
        const response = await clientAxios.post(`/contact/contactme`, contact);
        dispatch(setContactMeSucces(response.data));
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Los datos se han registrado con exito",
            icon: "success",
        });
        setTimeout(() => {
            dispatch(resetIsSent());
        }, 1000);
    } catch (error) {
        console.log(error);
        dispatch(setContactMeError());
    }
};

export const getAllToContactAction = () => async (dispatch) => {
    dispatch(setGetToContact());
    try {
        const response = await clientAxios.get(`/contact/to-contact`);
        dispatch(setGetToContactSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setGetToContactError());
    }
};
