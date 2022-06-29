import express from "express";
import { contactMe } from "./contact.controller.js";
const router = express.Router();

router.post("/contactme", contactMe);

export default router;
