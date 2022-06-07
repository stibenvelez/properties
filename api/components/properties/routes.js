import express from "express";
import { uploadFile } from "../../middlewares/uploadfile.js";
import {uploadImages} from "../../middlewares/uploadImages.js";
const router = express.Router();
import {
    getAllProperties,
    addNewProperty,
    getAllPropertyById,
    importProperties,
    importImagesProperties,
} from "./properties.controller.js";

router.get("/", getAllProperties);
router.get("/:id", getAllPropertyById);
router.post("/", addNewProperty);

router.post("/upload/properties", uploadFile, importProperties);
router.post("/upload/images", uploadImages, importImagesProperties);

export default router;
