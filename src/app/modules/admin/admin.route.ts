import express from "express";
import { adminController, uploadImg, uploadXlsx } from "./admin.controller";
import { protect } from "../../../middleware/protect";
const router = express.Router();

router.post('/login', adminController.login);
router.post('/upload', protect,uploadXlsx.single('file'),adminController.uploadCandidate)
router.get('/candidate', protect, adminController.getAllCandidate);
router.patch('/update', protect,adminController.updateCandidate);
router.post('/uploadImg', protect, uploadImg.single('image'), adminController.candidateImgUpload);

export const adminRouter = router;