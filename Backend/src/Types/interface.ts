import { Request } from 'express';

export interface UserBody {
    username: string;
    email: string;
    password: string;
}

export interface createRequest extends Request{
    user?:{
        id:string
    }
    file?: Express.Multer.File;
    body: any;
    query: any;
}