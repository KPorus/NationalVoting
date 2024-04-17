import express from "express";
import { adminController, uploadImg, uploadXlsx } from "./admin.controller";
import { protect } from "../../../middleware/protect";
import { limiter } from "../../../utils/limiter";
const router = express.Router();

router.post('/login',limiter, adminController.login);
router.get('/display', adminController.displayAdminInfo);
router.get('/allVoter',
 protect.adminMiddleware,
  adminController.getAllVoters);
router.post('/upload', protect.adminMiddleware,uploadXlsx.single('file'),adminController.uploadCandidate)
router.get('/candidates', protect.adminMiddleware, adminController.getAllCandidate);
router.patch('/update', protect.adminMiddleware,adminController.updateCandidate);
router.post('/uploadImg', protect.adminMiddleware, uploadImg.single('image'), adminController.candidateImgUpload);

export const adminRouter = router;