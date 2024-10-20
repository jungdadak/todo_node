import express from 'express';
import userController from '../controller/user.controller.js';
const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
export default router;
