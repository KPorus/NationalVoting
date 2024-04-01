import express from "express";
import { adminController, uploadImg, uploadXlsx } from "./admin.controller";
import { protect } from "../../../middleware/protect";
const router = express.Router();

router.post('/login', adminController.login);
router.get('/display', adminController.displayAdminInfo);
router.post('/upload', protect.adminMiddleware,uploadXlsx.single('file'),adminController.uploadCandidate)
router.get('/candidate', protect.adminMiddleware, adminController.getAllCandidate);
router.patch('/update', protect.adminMiddleware,adminController.updateCandidate);
router.post('/uploadImg', protect.adminMiddleware, uploadImg.single('image'), adminController.candidateImgUpload);

export const adminRouter = router;