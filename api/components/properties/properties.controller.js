import { propertyById } from "./properties.DAL.js";
import {
    getAllPropertiesService,
    addNewPropertyService,
    getPropertyByIdService,
    importPopertiesCSVService,
    getPropertiesByUserIdService,
} from "./properties.services.js";

export const getAllProperties = async (req, res) => {
    console.log(req.query);
    const properties = await getAllPropertiesService(req.query);
    res.json(properties);
};

export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getPropertyByIdService(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json(400).json({ msg: "eror al obtener la propiedad" });
    }
};

export const addNewProperty = async (req, res) => {
    try {
        await addNewPropertyService(req.body);
        res.json("Propiedad registrada");
    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {
            const error = new Error(
                "Propiedad contiene campos duplicados, verifique que la referencia no se repita"
            );
            return res.status(400).json({ msg: error.message });
        }

        res.status(400).json({ msg: "error al registrar la propiedad"});
    }

};

export const editProperty = async (req, res) => {
}

export const deletProperty = async (req, res) => {};

export const importProperties = async (req, res) =>  {
    try {
        const result = await importPopertiesCSVService(req.file)
        res.json({
            msg: "las propiedades fueron importadas con exito",
            result,
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const importImagesProperties = async (req, res) => {
    try {
        res.json(req.files);
    } catch (error) {
        
    }
}

export const getPropertiesByUser = async (req, res) => {
    try {
        const user = req.user
        const result = await getPropertiesByUserIdService(user.idUser);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}