import express from "express";
import { uploadFile } from "../../middlewares/uploadfile.js";
import { uploadImages } from "../../middlewares/uploadImages.js";
import checkAuth from "../../middlewares/checkAuth.js";
const router = express.Router();
import {
    getAllProperties,
    getPropertyById
} from "./properties.controller.js";

router.get("/", getAllProperties)
router.route("/:id").get(getPropertyById);

export default router;
