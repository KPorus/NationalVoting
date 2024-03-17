import express from "express";
import { adminController, uploadXlsx } from "./admin.controller";
import { protect } from "../../../middleware/protect";
const router = express.Router();

router.post('/login', adminController.login);
router.post('/upload', protect,uploadXlsx.single('file'),adminController.uploadCandidate)
router.get('/candidate', protect, adminController.getAllCandidate);
router.patch('/update', protect,adminController.updateCandidate);

export const adminRouter = router;