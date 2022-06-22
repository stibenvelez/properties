import {
    allProperties,
    allPropertiesByUserId,
    importPorperties,
    insertProperty,
    propertyById,
    propertyByIdByUserId,
    uploadProperty,
} from "./properties.DAL.js";
import csvtojson from "csvtojson";
import { findUserById } from "../user/user.DAL.js";

const COLUMNS_REQUIRED = [
    "reference",
    "title",
    "description",
    "price",
    "address",
    "building",
    "contactName",
    "email",
    "phone",
    "antiquityYears",
    "published",
    "lastAdminprice",
    "neighborhood",
    "propertyTypeId",
    "offerId",
    "area",
    "stratum",
    "bedrooms",
    "numElevators",
    "numFloor",
    "bathrooms",
    "garage",
    "parking",
    "remodelation",
    "latitude",
    "longitude",
    "city",
    "contact",
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
    "saleOff",
];

const FIELDS_REQUIRED = [
    "title",
    "description",
    "price",
    "address",
    "city",
    "propertyTypeId",
    "offerId",
];

export const getAllPropertiesService = async (query) => {
    const [rows] = await allProperties(query);
    const addGalleryImgs = rows.map((property) => {
        const images = [
            "image1",
            "image2",
            "image3",
            "image4",
            "image5",
            "image6",
        ];

        let galleryImgs = [];

        images.map((image) => {
            if (property[image]) {
                galleryImgs.push(`${property.reference}-${image}.jpg`);
            }
        });

        if (galleryImgs.length === 0) {
            galleryImgs = [];
        }

        delete property.createdAt;
        delete property.updateAt;
        delete property.createBy;
        delete property.image1;
        delete property.image2;
        delete property.image3;
        delete property.image4;
        delete property.image5;
        delete property.image6;
        return {
            ...property,
            galleryImgs,
        };
    });

    const dataPropeties = {
        results: addGalleryImgs,
        count: rows.length,
    };

    return dataPropeties;
};

export const getPropertyByIdService = async (id) => {
    try {
        const [property] = await propertyById(id);

        const images = [
            "image1",
            "image2",
            "image3",
            "image4",
            "image5",
            "image6",
        ];

        let galleryImgs = [];
        images.map((image) => {
            if (property[image]) {
                galleryImgs.push(`${property.reference}-${image}.jpg`);
            }
        });

        delete property.image1;
        delete property.image2;
        delete property.image3;
        delete property.image4;
        delete property.image5;
        delete property.image6;

        property.galleryImgs = galleryImgs;
        const [user] = await findUserById(property.createdBy);
        property.createBy = {
            idUser: user.idUser,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
        return property;
    } catch (error) {
        throw error;
    }
};

export const getPropertiesByUserIdService = async (id) => {
    try {
        const [properties] = await allPropertiesByUserId(id);
        return properties;
    } catch (error) {
        throw error;
    }
};

export const getPropertyByIdByUserIdService = async (req) => {
    const id = req.params.id;
    const userId = req.user.idUser;

    try {
        const [property] = await propertyByIdByUserId(id, userId);
        return property;
    } catch (error) {
        throw error;
    }
};

export const editPropertyService = async (req, res) => {
    const { id } = req.params;
    const [property] = await propertyById(id);

    if (!property) {
        return res.status(404).json({
            status: "error",
            msg: "Propiedad no encontrada",
        });
    }

    if (property.createdBy.toString() !== req.user.idUser.toString()) {
        return res.status(401).json({msg: "No tienes permisos para editar este inmueble"});
    }

    const uploadData = {
        ...req.body,
        idProperty: id,
    }

    await uploadProperty(uploadData);

    try {
    } catch (error) {
        throw error;
    }
};

export const addNewPropertyService = async (property) => {
    try {
        
        const result = await insertProperty(property);
        return result;
    } catch (error) {
        throw error;
    }
};

export const importPopertiesCSVService = async (file) => {
    const getProperties = (propertyData) => {
        const properties = propertyData
            .filter((property) => property.title)
            .map((property) =>
                Object.keys(property).map((key) => property[key])
            );
        return properties;
    };

    const validateColumns = async (data) => {
        let [columns] = data
            .filter((property) => property.title)
            .map((property) => Object.keys(property));

        let errors = [];
        COLUMNS_REQUIRED.forEach((column) => {
            if (!columns.includes(column)) {
                errors.push({
                    column: column,
                    error: `No se encontro la columna ${column}`,
                });
            }
        });

        if (errors.length > 0) {
            throw {
                msg: "Faltan columnas en el archivo",
                errors,
            };
        }
    };

    const validateRows = async (data) => {
        let errors = [];
        FIELDS_REQUIRED.forEach((field) => {
            data.forEach((property) => {
                if (!property[field]) {
                    errors.push({
                        reference: property.reference,
                        column: field,
                        error: `La columna <<${field}>> no puede estar vacia`,
                    });
                }
            });
        });

        if (errors.length > 0) {
            throw {
                msg: "Se encontraron errores en el archivo",
                errors,
            };
        }
    };

    const validateFormatFile = async (file) => {
        const extension = file.mimetype.split("/")[1];
        if (extension !== "csv") {
            throw { msg: "El formato del archivo no es valido" };
        }
    };

    try {
        const filePath = file.path;
        await validateFormatFile(file);

        const dataCSV = await csvtojson().fromFile(filePath);
        await validateColumns(dataCSV);
        await validateRows(dataCSV);
        const properties = await getProperties(dataCSV);
        await importPorperties(properties);
    } catch (error) {
        throw error;
    }
};
