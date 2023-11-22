import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
//import { environment } from '../environment';
import dotenv from 'dotenv';
dotenv.config();
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL);
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
// })
const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    upload_preset: "qiero"
};
export const cloudinaryAPI = cloudinary;


export const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
export const userFolder = 'userImages';
export const saveLocalllyImage = (file: any, folderParent = userFolder) => {
    const shortName = file.name.split('.');
    const extension = shortName[shortName.length - 1];
    const tempName = uuidv4() + '.' + extension;
    if (!allowedExtensions.includes(extension)) {
        return `Not Allowed Extension on : ${tempName}, try using image extensions like ${allowedExtensions}`;
    }
    const uploadPath = path.join(__dirname, '../uploads/', folderParent, tempName);
    file.mv(uploadPath, (err: any) => {
        if (err) {
            console.warn(err);
        }
    })
    //return uploadPath;
    return tempName;
    //return environment.production ? `https://qiero-back-end.onrender.com/api/uploads/userImages/${tempName}` : `http://localhost:8090/api/uploads/userImages/${tempName}`;
}



//todo construct the save method or register o use the method save image
export const updateImageLocally = (model: any, field: any, file: any) => {
    const uploadPath = path.join(__dirname, '../uploads/', userFolder, model[field]);
    if (model[field]) {
        if (fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
            console.debug(`Delete file: ${uploadPath} success 🧨`);
        }
        //todo save new image
        file.mv(uploadPath, (err: any) => {
            if (err) {
                console.warn(err);
            }
        })
    }
    return uploadPath;
}


export const saveImageCloudinary = async (file: any) => {
    const { tempFilePath } = file;
    // console.debug({ tempFilePath })
    const responseCloudinary = await cloudinary.uploader.upload(tempFilePath);
    // console.log({ responseCloudinary })
    const { secure_url } = responseCloudinary;
    console.debug({ secure_url });
    return secure_url;
}

export const updateImageCloudinary = async (file: any, model: any, field: string) => {
    //todo function for get field name on model 
    // const fileArrName = secure_url.split('/');
    // const name = fileArrName[fileArrName.length - 1];
    // const [public_id] = name.split('.');
    //await cloudinary.uploader.destroy(public_id)
    const { tempFilePath } = file;
    const responseCloudinary = await cloudinary.uploader.upload(tempFilePath);
    const { secure_url } = responseCloudinary;
    console.debug({ secure_url });
    return secure_url;
}