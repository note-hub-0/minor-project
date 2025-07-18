import {asyncHandler} from "../utils/asyncHanler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponce} from "../utils/ApiResponce.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.models.js"

export const register = asyncHandler(async (req,res) => {
    const {name,email,username,password,bio} = req.body
    if (!name || !email || !username || !password || !bio) {
        throw new ApiError(400,"All fields are required")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatarCloudinaryRes = await uploadOnCloudinary(avatarLocalPath)
    // console.log(avatarCloudinaryRes);
    
    if (!avatarCloudinaryRes) {
        throw new ApiError(500, "Somthing went worng when avatar is uploaded")
    }

    const user = await User({
        name,
        email,
        username,
        password,
        bio,
        avatar : avatarCloudinaryRes.secure_url
    })
    if (!user) {
        throw new ApiError(500, "User cannot created")
    }
    await user.save()
    return res
    .status(200)
    .json(
        new ApiResponce(200,user,"User SingUp succes full")
    )
})