import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.post('/login', userController.login);
router.post('/register',userController.register);
router.post('/vote', userController.vote);

export const userRouter = router;