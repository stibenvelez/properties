import express from "express";
import {
    auth,
    createUser,
    confirmUser,
    forgetPassword,
    checkToken,
    newPassword,
    getProfile,
} from "./user.controller.js";
import checkAuth from "../../middlewares/checkAuth.js";
const router = express.Router();

router.post("/", createUser);
router.post("/login", auth);
router.post("/confirm/:token", confirmUser);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);
router.get("/profile", checkAuth, getProfile )

export default router;
