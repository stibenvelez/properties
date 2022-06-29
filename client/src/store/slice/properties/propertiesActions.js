import {
    setclearFilter,
    setCreateProperty,
    setCreatePropertyError,
    setCreatePropertySuccess,
    setDeleteProperty,
    setDeletePropertyError,
    setDeletePropertySuccess,
    setFilters,
    setProperties,
    setPropertiesError,
    setPropertiesSucces,
    setPropertyByUser,
    setPropertyByUserError,
    setPropertyByUserSucces,
    setUpdateProperty,
    setUpdatePropertyError,
    setUpdatePropertySuccess,
    setUploadImages,
    setUploadImagesError,
    setUploadImagesSucces,
    setUploadPropertiescsv,
    setUploadPropertiescsvError,
    setUploadPropertiescsvSucces,
} from "store/slice/properties";
import clientAxios from "../../../config/axios";
import Swal from "sweetalert2";

export const fetchAllProperties =
    (filters, categoryProperty) => async (dispatch) => {
        dispatch(setProperties());
        try {
            const token = localStorage.getItem("token");
            let headers = {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            };

            const response = await clientAxios(
                `/properties${
                    categoryProperty ? `?category=${categoryProperty}` : "?"
                }`,
                { headers, params: filters }
            );
            dispatch(setPropertiesSucces(response.data));
        } catch (error) {
            console.log(error);
            dispatch(setPropertiesError());
        }
    };

export const fetchAllPropertiesByUser =
    (filters, categoryProperty) => async (dispatch) => {
        dispatch(setProperties());
        try {
            const token = localStorage.getItem("token");
            let headers = {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            };

            const response = await clientAxios(
                `/admin/properties${
                    categoryProperty ? `?category=${categoryProperty}` : "?"
                }`,
                { headers, params: filters }
            );

            dispatch(setPropertiesSucces(response.data));
        } catch (error) {
            console.log(error);
            dispatch(setPropertiesError());
        }
    };

export const getPropertyByIdByUserId = (idProperty) => async (dispatch) => {
    dispatch(setPropertyByUser());
    try {
        const token = localStorage.getItem("token");
        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const response = await clientAxios(`/admin/properties/${idProperty}`, {
            headers,
        });
        dispatch(setPropertyByUserSucces(response.data));
    } catch (error) {
        console.log(error);
        dispatch(setPropertyByUserError());

        Swal.fire({
            title: "Error",
            text: "Error al obtener la propiedad",
            icon: "error",
            confirmButtonText: "Ok",
        });
    }
};

export const readFilters = (filters) => async (dispatch) => {
    try {
        dispatch(setFilters(filters));
    } catch (error) {
        console.log(error);
        dispatch(setPropertiesError());
    }
};

export const clearFilter = () => async (dispatch) => {
    try {
        dispatch(setclearFilter());
    } catch (error) {
        console.log(error);
    }
};

export const uploadPropertiescsvAction = (file) => async (dispatch) => {
    dispatch(setUploadPropertiescsv());

    try {
        const res = await clientAxios.post(
            "/properties/upload/properties",
            file
        );
        Swal.fire(
            res.data.msg,
            "Las propiedades se importaron correctamente",
            "success"
        );

        dispatch(setUploadPropertiescsvSucces("msg"));
    } catch (error) {
        dispatch(setUploadPropertiescsvError(error.response.data));
        Swal.fire(
            error.response.data.msg,
            error.response.data.text || "",
            "error"
        );
    }
};

export const uploadImagesAction = (files) => async (dispatch) => {
    dispatch(setUploadImages());

    try {
        const res = await clientAxios.post("/properties/upload/images", files);
        Swal.fire(
            res.data.msg,
            "Las imagenes se importaron correctamente",
            "success"
        );

        dispatch(setUploadImagesSucces("msg"));
    } catch (error) {
        dispatch(setUploadImagesError(error.response.data));
        Swal.fire(
            error.response.data.msg,
            error.response.data.text || "",
            "error"
        );
    }
};

export const createPropertyAction = (property) => async (dispatch) => {
    dispatch(setCreateProperty());
    try {
        let data = new FormData();

        Object.entries(property).forEach(([key, value]) => {
            data.append(key, value);
        });

        property.files.forEach((file) => {
            data.append("files", file);
        });

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
        }

        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const result = await clientAxios.post("/admin/properties", data, {
            headers,
        });

        Swal.fire({
            icon: "success",
            title: "Inmueble registrado",
            text: "Se ha registrado el inmueble correctamente",
        });
        dispatch(setCreatePropertySuccess());
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: error.response.data.msg,
        });
        dispatch(setCreatePropertyError());
        console.log(error);
    }
};


export const updatePropertyAction = (property) => async (dispatch) => {
    dispatch(setUpdateProperty());
    const IMAGES_ALLOWED = [
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
];
    try {
        console.log('llegua', property);
        let data = new FormData();

        Object.entries(property).forEach(([key, value]) => {
            data.append(key, value);
        });

        //process img string
        property.galleryImgs.forEach((file, index) => {
            console.log("file", file, index);
            if (typeof file === "string") {                
                data.append(`images`, file);
              
            }
            if (typeof file === "object") {
                data.append(`files`, file);
                return;
            }
            
        });
        
        
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
            return 
        }

        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const result = await clientAxios.put(
            `/admin/properties/${property.idProperty}`,
            data,
            { headers }
        );

        Swal.fire({
            icon: "success",
            title: "Inmueble actualizado",
            text: "Se ha actualizado el inmueble correctamente",
        });
        
        dispatch(setUpdatePropertySuccess());
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: error.response.data.msg,
        });
        dispatch(setUpdatePropertyError());
        console.log(error);
    }
}

export const deletePropertyAction = (idProperty) => async (dispatch) => {
    dispatch(setDeleteProperty());
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
            return 
        }

        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        await clientAxios.put(`/admin/properties/delete/${idProperty}`);

        Swal.fire({
            icon: "success",
            title: "Inmueble eliminado",
            text: "Se ha eliminado el inmueble correctamente",
        });
        dispatch(setDeletePropertySuccess());
        dispatch(fetchAllPropertiesByUser());
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: error.response.data.msg,
        });
        dispatch(setDeletePropertyError());
        console.log(error);
    }
}