import {
    setclearFilter,
    setCreateProperty,
    setCreatePropertyError,
    setCreatePropertySuccess,
    setFilters,
    setProperties,
    setPropertiesError,
    setPropertiesSucces,
    setUploadImages,
    setUploadImagesError,
    setUploadImagesSucces,
    setUploadPropertiescsv,
    setUploadPropertiescsvError,
    setUploadPropertiescsvSucces,
} from "store/slice/properties";
import clientAxios from "../../../config/axios";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchAllProperties =
    (filters, categoryProperty) => async (dispatch) => {
        dispatch(setProperties());
        try {
            const response = await clientAxios(
                `/properties${
                    categoryProperty ? `?category=${categoryProperty}` : "?"
                }`,
                {
                    params: filters,
                }
            );
            dispatch(setPropertiesSucces(response.data));
        } catch (error) {
            console.log(error);
            dispatch(setPropertiesError());
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
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
        }

        let headers = {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        const test = new FormData();
        test.append("nombre", "Andres");
        test.append("Rol", "Admin");

        const result = await clientAxios.post(
            "http://localhost:4000/api/v1/admin/properties",
            test
        );

        console.log(result.data);
        dispatch(setCreatePropertySuccess());
    } catch (error) {
        dispatch(setCreatePropertyError());
        console.log(error);
    }
};
