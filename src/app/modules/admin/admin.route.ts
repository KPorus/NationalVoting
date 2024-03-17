import express from "express";
import { adminController, uploadXlsx } from "./admin.controller";
const router = express.Router();

router.post('/login', adminController.login);
router.post('/upload', uploadXlsx.single('file'),adminController.uploadCandidate)

export const adminRouter = router;