import express from "express";
import { userController } from "./user.controller";
import { protect } from "../../../middleware/protect";
const router = express.Router();

router.post('/login', userController.login);
router.post('/register',userController.register);
router.post('/vote', userController.vote);
router.post('/allCandidate', protect.userMiddleware, userController.allCandidate);

export const userRouter = router;