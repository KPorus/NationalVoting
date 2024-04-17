import express from "express";
import { userController } from "./user.controller";
import { protect } from "../../../middleware/protect";
import { limiter } from "../../../utils/limiter/limiter";
const router = express.Router();

router.post('/login',limiter, userController.login);
router.post('/register',userController.register);
router.post('/vote', userController.vote);
router.get('/candidates', protect.userMiddleware, userController.allCandidate);

export const userRouter = router;