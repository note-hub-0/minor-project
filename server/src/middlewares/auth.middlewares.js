// src/middlewares/auth.middlewares.js

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHanler.js";
import { User } from "../models/user.models.js";

const verifyJWT = (role) =>
  asyncHandler(async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
      // console.log(token);

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE_KEY);
      if (!decoded) {
        throw new ApiError(401, "Worng token");
      }

      if (decoded.role !== role) {
        throw new ApiError(403, "Access denied");
      }

      const user = await User.findById(decoded._id);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "jwt expired" });
      }
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  });

export { verifyJWT };
