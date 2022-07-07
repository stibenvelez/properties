import express from "express";
import { createComment } from "./comments.controller.js";
const router = express.Router();

router.post("/", createComment);

export default router;