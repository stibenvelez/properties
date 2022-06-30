import express from "express";
import { contactMe, getAllToContact } from "./contact.controller.js";
const router = express.Router();

router.get("/to-contact", getAllToContact);
router.post("/contactme", contactMe)

export default router;
