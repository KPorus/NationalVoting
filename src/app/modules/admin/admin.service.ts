import { CandidateList, Candidate } from './../../models/candidate.model';
import { AdminInfo, Info } from "../../models/admin/admininfo.model";
const cloudinary = require("../../../utils/cloudinary");
const xlsx = require("xlsx");
const fs = require("fs");
interface Body
{
    email: string,
    pass: string
}

interface UploadResult
{
    numberOfCandidate: number;
    numberOfUsers: number;
}

const login = async (data: Body): Promise<Info | null> =>
{
    const user = await AdminInfo.findOne({
        $and: [
            { email: data.email },
            { role: "admin" }
        ]
    });
    return user
}



const uploadCandidate = async (data: Express.Multer.File | undefined): Promise<UploadResult | null> =>
{
    if (!data)
    {
        return null;
    }

    const file = xlsx.readFile(`./file/${data.filename}`);

    const sheetNames = file.SheetNames;
    const metaData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[0]]);
    const numberOfUsers = metaData.length;
    let numberOfCandidate = 0;

    for (const entry of metaData)
    {
        const name = entry["name"];
        const wardNo = entry["Ward no"];
        const Area0fvoting = entry["Area0fvoting"];
        const Address = entry["Address"];
        const union = entry["union"];

        const check = await CandidateList.find({
            $or: [
                { name: name },
                { Area0fvoting: Area0fvoting }
            ]
        });
        // Check for duplicate name
        if (check.length > 0)
        {
            continue;
        } else
        {
            // Create candidate record
            await CandidateList.create({
                name,
                Area0fvoting,
                Address,
                wardno: wardNo,
                union,
                status: "Active"
            });
            numberOfCandidate++;
        }
    }
    fs.unlinkSync(`file/${data.filename}`);
    return Promise.resolve({ numberOfCandidate, numberOfUsers });
}
const getCandidate = async (): Promise<Candidate[] | null> =>
{
    const user = await CandidateList.find();
    if (user.length > 0)
    {
        return user
    }
    return null;
}

const updateCandidate = async (data: Candidate) =>
{
    const id = data._id;
    const updatedData = { ...data };
    delete updatedData._id; // Remove _id field from updated data

    const result = await CandidateList.updateOne({ _id: id }, updatedData);

    if (result.modifiedCount > 0)
    {
        return { success: true, message: "Candidate information updated!!" };
    } else
    {
        return { success: false, message: 'No document was modified' };
    }
}

const candidateImgUpload = async (body: { _id: string }, data: Express.Multer.File | undefined) =>
{
    const result = cloudinary.uploader.upload(data?.path, async (err: any, result: any) =>
    {
        if (err)
        {
            return { success: false, message: err };
        }
        return result;
        
    })    
    const value = await result;
    const upload = await CandidateList.updateOne({ _id: body._id }, {
        candidateImg: value.secure_url
    })

    if (upload.modifiedCount > 0)
    {
        return { success: true, message: "Candidate image upload!!" };
    } else
    {
        return { success: false, message: 'No document was modified' };
    }
}

export const adminService = {
    login, uploadCandidate, getCandidate, updateCandidate, candidateImgUpload
}