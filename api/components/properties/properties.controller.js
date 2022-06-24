import { propertyById } from "./properties.DAL.js";
import {
    getAllPropertiesService,
    addNewPropertyService,
    getPropertyByIdService,
    importPopertiesCSVService,
    getPropertiesByUserIdService,
    getPropertyByIdByUserIdService,
    updatePropertyService,
    deletePropertyService,
} from "./properties.services.js";

export const getAllProperties = async (req, res) => {
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
    const body = req.body;
    const files = req.files;
    const user = req.user;

    try {
        await addNewPropertyService(body, files, user);
        res.json("Propiedad registrada");
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") {
            const error = new Error(
                "Propiedad contiene campos duplicados, verifique que la referencia no esté duplicada"
            );
            return res.status(400).json({ msg: error.message });
        }

        res.status(400).json({ msg: "error al registrar la propiedad" });
    }
};

export const importProperties = async (req, res) => {
    try {
        const result = await importPopertiesCSVService(req.file);
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
    } catch (error) {}
};

export const getPropertiesByUser = async (req, res) => {
    try {
        const user = req.user;
        const result = await getPropertiesByUserIdService(user);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export const getPropertyByIdByUserId = async (req, res) => {
    try {
        const property = await getPropertyByIdByUserIdService(req, res);
        if (!property) {
            return res.status(400).json({ msg: "No se encontro el proyecto" });
        }
        res.json(property);
    } catch (error) {
        console.log(error);
        res.json(400).json({ msg: "eror al obtener la propiedad" });
    }
};

export const updateProperty = async (req, res) => {
    try {
        await updatePropertyService(req, res);
        res.json("Propiedad actualizada");
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "error al editar la propiedad" });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        await deletePropertyService(req, res);
        res.json("Propiedad eliminada");
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "error al eliminar la propiedad" });
    }
};
