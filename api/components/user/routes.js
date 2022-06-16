import express from "express";
import { auth, createUser, confirmUser } from "./user.controller.js";
const router = express.Router();

router.post("/", createUser);
router.post("/login", auth);
router.post("/confirm/:token", confirmUser);

export default router;
