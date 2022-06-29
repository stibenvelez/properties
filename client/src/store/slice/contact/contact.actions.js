import clientAxios from "config/axios";
import Swal from "sweetalert2";
import { resetIsSent, setContactMe, setContactMeError, setContactMeSucces } from ".";

export const contactMeAction = (contact) => async (dispatch) => {
    dispatch(setContactMe());
    try {
        const response = await clientAxios.post(`/contact/contactme`, contact);
        dispatch(setContactMeSucces(response.data));
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Los datos se han registrado con exito",
            icon: "success",
        })
        setTimeout(() => {
            dispatch(resetIsSent());            
        }, 1000);
    } catch (error) {
        console.log(error);
        dispatch(setContactMeError());
    }
};
