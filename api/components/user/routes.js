import express from "express";
import { auth } from "./user.controller.js";
const router = express.Router();

router.post("/login",   auth);

export default router;