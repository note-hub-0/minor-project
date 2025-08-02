import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHanler.js";
import { User } from "../models/user.models.js";


const varifyJWT = asyncHandler(async(req, res, next) => {
try {
        const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]
        // console.log(token);
        
    
        if (!token) {
            throw new ApiError(401,"Unauthorize request")
        }
    
    
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRATE_KEY)
    
        const user = await User.findById(decodeToken._id)
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user
        next()
} catch (error) {
    console.log(error);
    throw new ApiError(401,error.message)
    
}
})

export {varifyJWT}