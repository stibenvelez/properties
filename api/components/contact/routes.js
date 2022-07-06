import express from "express";
import checkAuth from "../../middlewares/checkAuth.js";
import { contactMe, createContactManagement, discardContact, getAllToContact, getToContactById } from "./contact.controller.js";
const router = express.Router();

router.get("/to-contact", getAllToContact);
router.get("/to-contact/:id", getToContactById);
router.post("/contactme", contactMe)
router.post("/contact-management", checkAuth, createContactManagement);
router.post("/discard/:id", checkAuth, discardContact);

export default router;
