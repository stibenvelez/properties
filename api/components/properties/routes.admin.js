import express from "express";
import checkAuth from "../../middlewares/checkAuth.js";
import { uploadFile } from "../../middlewares/uploadfile.js";
import { uploadImages } from "../../middlewares/uploadImages.js";
import { uploadImagesProperty } from "../../middlewares/uploadImagesProperty.js";
import {
    addNewProperty,
    updateProperty,
    getPropertiesByUser,
    getPropertyByIdByUserId,
    importImagesProperties,
    importProperties,
    deleteProperty,
} from "./properties.controller.js";
const router = express.Router();

router.get("/", checkAuth, getPropertiesByUser);

router.post("/", checkAuth, uploadImagesProperty, addNewProperty);
router
    .route("/:id")
    .get(checkAuth, getPropertyByIdByUserId)
    .put(checkAuth, uploadImagesProperty, updateProperty);
router.put("/delete/:id", checkAuth, deleteProperty);

router.post("/upload/properties", checkAuth, uploadFile, importProperties);
router.post("/upload/images", checkAuth, uploadImages, importImagesProperties);
export default router;
