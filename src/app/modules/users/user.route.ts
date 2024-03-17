import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.post('/login', userController.login);
router.post('/register',userController.register);

export const userRouter = router;