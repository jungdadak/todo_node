import express from "express";
import userController from "../controller/user.controller.js";
import authController from "../controller/auth.controller.js";
const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/me", authController.autehticate, userController.getUser);
export default router;
