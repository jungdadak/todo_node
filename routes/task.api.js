import express from "express";
import taskController from "../controller/task.controller.js";
import authController from "../controller/auth.controller.js";
const router = express.Router();

router.post("/", authController.authenticate, taskController.createTask);
router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

export default router;
