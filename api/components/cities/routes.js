import express from "express";
import { getAllCityes } from "./citiees.controller.js";
const router = express.Router();

router.get('/', getAllCityes)

export default router;