import { propertyById } from "./properties.DAL.js";
import {
    getAllPropertiesService,
    addNewPropertyService,
    getPropertyByIdService,
    importPopertiesCSVService,
} from "./properties.services.js";

export const getAllProperties = async (req, res) => {
    console.log(req.query);
    const properties = await getAllPropertiesService(req.query);
    res.json(properties);
};

export const getAllPropertyById = async (req, res) => {
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
        res.json("Property was creaded");
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error al ingresar la propiedad" });
    }

};

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