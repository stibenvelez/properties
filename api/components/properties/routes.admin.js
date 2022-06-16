import express from "express";
import checkAuth from "../../middlewares/checkAuth.js";
import { uploadFile } from "../../middlewares/uploadfile.js";
import { uploadImages } from "../../middlewares/uploadImages.js";
import { addNewProperty, getPropertiesByUser, importImagesProperties, importProperties } from "./properties.controller.js";
const router = express.Router();

router.route("/")
    .get(checkAuth, getPropertiesByUser)
    .post(checkAuth, addNewProperty);

router.post("/upload/properties", checkAuth, uploadFile, importProperties);
router.post("/upload/images", checkAuth, uploadImages, importImagesProperties);
export default router;
