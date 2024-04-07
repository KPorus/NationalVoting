import { Candidate } from "./../../models/candidate.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { adminService } from "./admin.service";
import multer from "multer";
const xlsx = require("xlsx");
const path = require("path");
// Configure multer storage for XLSX files
const multerXlsxConfig = multer.diskStorage({
  destination: (req: Request, file: any, callback: any) => {
    callback(null, "file"); // Set the destination folder for uploaded files
  },
  filename: (req: Request, file: any, callback: any) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname) // Set the filename for the uploaded file
    );
  },
});
// Configure multer storage for Img files
const multerImgConfig = multer.diskStorage({
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

// Middleware to upload XLSX files using multer
export const uploadXlsx = multer({
  storage: multerXlsxConfig,
});

// Middleware to upload img files using multer
export const uploadImg = multer({
  storage: multerImgConfig,
});

const signToken = (id: string, email: String) => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d", // Token expiration period
    }
  );
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await adminService.login(req.body);
    if (user) {
      if (user.pass == req.body.pass) {
        const token = signToken(user._id.toString(), user.email.toString());
        return res
          .status(200)
          .json({
            status: "Succes",
            message: "User login succesfull",
            token: token,
          });
      } else {
        return res
          .status(404)
          .json({ status: "Fail", message: "Password not match" });
      }
    } else {
      return res
        .status(404)
        .json({ status: "Fail", message: "user not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "Fail", message: `Internal server error. ${err}` });
  }
};

const uploadCandidate = async (req: Request, res: Response) => {
  try {
    const input = req.file;

    if (!input) {
      return res.status(400).send("No file uploaded.");
    }

    const candidate = await adminService.uploadCandidate(input);

    if (!candidate) {
      return res
        .status(500)
        .json({ status: "Fail", message: "Internal server error." });
    }

    if (candidate.numberOfCandidate === candidate.numberOfUsers) {
      return res
        .status(200)
        .json({
          status: "Success",
          message: "All candidates have been uploaded.",
        });
    } else if (candidate.numberOfCandidate === 0) {
      return res
        .status(200)
        .json({ status: "Success", message: "No new candidates uploaded." });
    } else if (candidate.numberOfCandidate < candidate.numberOfUsers) {
      return res
        .status(200)
        .json({
          status: "Success",
          message: "Some candidates have been uploaded.",
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Fail", message: "Internal server error." });
  }
};

const getAllCandidate = async (req: Request, res: Response) => {
  try {
    const Candidate = await adminService.getCandidate();
    if (Candidate) {
      return res.status(200).json({ status: "Success", Candidate });
    }
  } catch (error) {
    res.status(500).json({ status: "Fail", message: "Internal server error." });
  }
};
const updateCandidate = async (req: Request, res: Response) => {
  try {
    const Candidate = await adminService.updateCandidate(req.body);
    if (Candidate.success) {
      return res
        .status(200)
        .json({ status: "Success", message: Candidate.message });
    } else {
      return res
        .status(200)
        .json({ status: "Fail", message: Candidate.message });
    }
  } catch (error) {
    res.status(500).json({ status: "Fail", message: "Internal server error." });
  }
};

const candidateImgUpload = async (req: Request, res: Response) => {
  try {
    const input = req.file;

    if (!input) {
      return res.status(400).send("No file uploaded.");
    }
    const data = JSON.parse(req.body.data);

    const result = await adminService.candidateImgUpload(data, input);
    if (result.success) {
      return res
        .status(200)
        .json({ status: "Success", message: result.message });
    } else {
      return res.status(200).json({ status: "Fail", message: result.message });
    }
  } catch (error) {
    res.status(500).json({ status: "Fail", message: error });
  }
};

const displayAdminInfo = async (req: Request, res: Response) => {
  try {
    const admin = await adminService.displayAdminInfo(req.body);
    if (admin) {
      res.status(200).json({ status: "Success", message: admin });
    } else {
      return res.status(200).json({ status: "Fail" });
    }
  } catch (error) {
    res.status(500).json({ status: "Fail", message: error });
  }
};
const getAllVoters = async (req: Request, res: Response) => {
  try {
      const user = await adminService.getAllVoters();
    if (user) {
      res.status(200).json({ status: "Success", message: user });
    } else {
      return res.status(200).json({ status: "Fail" });
    }
  } catch (error) {
    res.status(500).json({ status: "Fail", message: error });
  }
};
export const adminController = {
  login,
  uploadCandidate,
  getAllCandidate,
  updateCandidate,
  candidateImgUpload,
  displayAdminInfo,
  getAllVoters,
};
