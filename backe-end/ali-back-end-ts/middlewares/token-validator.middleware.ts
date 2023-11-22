import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';


dotenv.config();


export const validatorField = (req: Request, res: Response, next: NextFunction) =>{
    const errors =validationResult(req);
    const token =  req.header('x-token');
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    const env = process.env.SECRETORPRIVATEKEY;
    if (token !== env) {
        return res.status(401).json({ mensajeRetorno: 'Token is invalid' })
    }
    next();
}
export const existUser = async (email: any) => {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new Error(`usuario no registrado`);
    }
}

export const verifyJWT = (token: any) => {
    if (token) {
        const isVerified = jwt.verify(token, `${process.env.SECRETORPRIVATEKEY}`);
        console.debug(isVerified);
        if (isVerified) {
            return true;
        } else {
            return false;
        }
    }

}