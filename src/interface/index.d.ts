import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

declare global
{
    namespace Express
    {
        interface Request
        {
            user: JwtPayload | null | User | jwtTest; //| {role:string,userId:string}
        }
    }
}