import express from "express";
import { contactMe, getAllToContact, getToContactById } from "./contact.controller.js";
const router = express.Router();

router.get("/to-contact", getAllToContact);
router.get("/to-contact/:id", getToContactById);
router.post("/contactme", contactMe)

export default router;
