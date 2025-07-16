import { ApiError } from "./ApiError.js"

const asyncHandler = (handleFun) => async(req,res,next) => {
    try {
        await handleFun(req,res,next)
    } catch (error) {
        const statusCode = error.statusCode || 500
        console.log(error);
        res
        .status(statusCode)
        .json({
            error,
            message : error.message
        })
        
    }
}

export {asyncHandler}