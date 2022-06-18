import express from "express";
import { getAllCityes, getAllCityesWhitProperties } from "./citiees.controller.js";
const router = express.Router();

router.get("/whitPropeties", getAllCityesWhitProperties);
router.get('/', getAllCityes)

export default router;