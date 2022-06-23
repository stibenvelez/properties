import express from "express";
import {
    auth,
    createUser,
    confirmUser,
    forgetPassword,
    checkToken,
    newPassword,
    getProfile,
    getUsers,
    getUserById,
} from "./user.controller.js";
import checkAuth from "../../middlewares/checkAuth.js";
const router = express.Router();

router.get("/", checkAuth, getUsers);
router.get("/profile", checkAuth, getProfile )
router.get("/getuser/:id", checkAuth, getUserById);
router.post("/", createUser);
router.post("/login", auth);
router.post("/confirm/:token", confirmUser);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

export default router;
