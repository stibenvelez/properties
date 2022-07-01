import express from "express";
import checkAuth from "../../middlewares/checkAuth.js";
import { contactMe, createContactManagement, getAllToContact, getToContactById } from "./contact.controller.js";
const router = express.Router();

router.get("/to-contact", getAllToContact);
router.get("/to-contact/:id", getToContactById);
router.post("/contactme", contactMe)
router.post("/contact-management", checkAuth, createContactManagement);

export default router;
