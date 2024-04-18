import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { VoterPage, adminService } from "./admin.service";
import multer from "multer";
import { CustomError } from '../../../utils/errors/customError';
import { CatchAsync } from '../../../Shared/CatchAsync';
const path = require("path");

// Configure multer storage for XLSX files
const multerXlsxConfig = multer.diskStorage({
  destination: (req: Request, file: any, callback: any) =>
  {
    callback(null, "file"); // Set the destination folder for uploaded files
  },
  filename: (req: Request, file: any, callback: any) =>
  {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname) // Set the filename for the uploaded file
    );
  },
});
// Configure multer storage for Img files
const multerImgConfig = multer.diskStorage({
  filename: function (req: Request, file: any, cb: any)
  {
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

const signToken = (id: string, email: String) =>
{
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

const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const user = await adminService.login(req.body);
    if (user)
    {
      if (user.pass == req.body.pass)
      {
        const token = signToken(user._id.toString(), user.email.toString());
        return res
          .status(200)
          .json({
            status: "Succes",
            message: "User login succesfull",
            token: token,
          });
      } else
      {
        const err = new CustomError(404, "Password not match")
        next(err)
      }
    } else
    {
      const err = new CustomError(404, "User not found")
      next(err)
    }
  }
);

const uploadCandidate = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const input = req.file;

    if (!input)
    {
      const err = new CustomError(404, "No file uploaded.")
      next(err);
    }

    const candidate = await adminService.uploadCandidate(input);

    if (!candidate)
    {
      // const err = new CustomError(404, "somthing went wron")
      // next(err);
      return res
        .status(500)
        .json({ status: "Fail", message: "Internal server error." });
    }

    if (candidate.numberOfCandidate === candidate.numberOfUsers)
    {
      return res
        .status(200)
        .json({
          status: "Success",
          message: "All candidates have been uploaded.",
        });
    } else if (candidate.numberOfCandidate === 0)
    {
      return res
        .status(200)
        .json({ status: "Success", message: "No new candidates uploaded." });
    } else if (candidate.numberOfCandidate < candidate.numberOfUsers)
    {
      return res
        .status(200)
        .json({
          status: "Success",
          message: "Some candidates have been uploaded.",
        });
    }
});

const getAllCandidate = CatchAsync(async (req: Request, res: Response) =>
{
    const Candidate = await adminService.getCandidate();
    if (Candidate)
    {
      return res.status(200).json({ status: "Success", Candidate });
    }
});

const updateCandidate = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const Candidate = await adminService.updateCandidate(req.body);
    if (Candidate.success)
    {
      return res
        .status(200)
        .json({ status: "Success", message: Candidate.message });
    } else
    {
      const err = new CustomError(404, Candidate.message)
      next(err);
    }
});

const candidateImgUpload = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const input = req.file;

    if (!input)
    {
      return res.status(400).send("No file uploaded.");
    }
    const data = JSON.parse(req.body.data);

    const result = await adminService.candidateImgUpload(data, input);
    if (result.success)
    {
      return res
        .status(200)
        .json({ status: "Success", message: result.message });
    } else
    {
      const err = new CustomError(404, result.message)
      next(err)
    }
});

const displayAdminInfo = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const admin = await adminService.displayAdminInfo(req.body);
    if (admin)
    {
      res.status(200).json({ status: "Success", message: admin });
    } else
    {
      const err = new Error();
      next(err);
    }
});

const getAllVoters = CatchAsync(async (req: Request, res: Response, next: NextFunction) =>
{
    const data: VoterPage = {
      pageSize: Number(req.query.pageSize),
      pageIndex: Number(req.query.pageIndex),
      prev: req.query.prev === "null" ? null : req.query.prev as string,
      next: req.query.next === "null" ? null : req.query.next as string
    };
    const user = await adminService.getAllVoters(data);
    if (user)
    {
      res.status(200).json({ status: "Success", user });
    } else
    {
      const err = new CustomError(404, "Something wrong")
      next(err)
    }
});

export const adminController = {
  login,
  uploadCandidate,
  getAllCandidate,
  updateCandidate,
  candidateImgUpload,
  displayAdminInfo,
  getAllVoters,
};


