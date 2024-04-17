export class CustomError extends Error{
    code:number
    status:string
    constructor(statusCode:number,message:string){
        super(message);
        this.code=statusCode;
        this.status = statusCode >= 400 && statusCode <500 ? 'fail' : 'error'

        Error.captureStackTrace(this, this.constructor);
    }
}