import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localPath) => {
    try {
        if(!localPath) return null

        
        
        const responce = await cloudinary.uploader.upload(localPath,{
            resource_type : "raw"
        })
        
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath)
        }
       
        return responce
    } catch (error) {
        if (fs.existsSync(localPath)) {
            try {
                fs.unlinkSync(localPath)
            } catch (e) {
                console.log("Error at uploadign on cloudinary",e.message);
                
            }
        }
        console.log(error.message);
        return null;
        
    }
}

export {uploadOnCloudinary}