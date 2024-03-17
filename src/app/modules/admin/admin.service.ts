import { CandidateList, Candidate } from './../../models/candidate.model';
import { AdminInfo, Info } from "../../models/admin/admininfo.model";
const xlsx = require("xlsx");
const fs = require("fs");
interface Body
{
    email: string,
    pass: string
}

interface CandidateData
{
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}
interface UploadResult
{
    numberOfCandidate: number;
    numberOfUsers: number;
}

const login = async (data: Body): Promise<Info | null> =>
{
    const user = await AdminInfo.findOne({
        email: data.email
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
        if (check.length>0)
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
                union
            });
            numberOfCandidate++;
        }
    }
    fs.unlinkSync(`file/${data.filename}`);
    return Promise.resolve({ numberOfCandidate, numberOfUsers });
}

export const adminService = {
    login, uploadCandidate
}