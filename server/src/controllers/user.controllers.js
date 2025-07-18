import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const generateAccesTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = await user.generateAccesToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message || "Somthing went wrong");
  }
};
export const register = asyncHandler(async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  if (!name || !email || !username || !password || !bio) {
    throw new ApiError(400, "All fields are required");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarCloudinaryRes = await uploadOnCloudinary(avatarLocalPath);
  // console.log(avatarCloudinaryRes);

  if (!avatarCloudinaryRes) {
    throw new ApiError(500, "Somthing went worng when avatar is uploaded");
  }

  const user = await User({
    name,
    email,
    username,
    password,
    bio,
    avatar: avatarCloudinaryRes.secure_url,
  });
  if (!user) {
    throw new ApiError(500, "User cannot created");
  }
  await user.save();
  return res
    .status(200)
    .json(new ApiResponce(200, user, "User SingUp succes full"));
});
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({
    username,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  console.log(isPasswordCorrect);
  
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password not matched");
  }

  const { accessToken, refreshToken } = await generateAccesTokenAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accesToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponce(200, loggedInUser, "User Logged In SuccesFull"));
});
export const refreshAccesToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!inComingRefreshToken) {
    throw new ApiError(401, "Unauthorize acces");
  }

  const decodeToken = await jwt.verify(
    inComingRefreshToken,
    process.env.REFRESH_TOKEN_SECRATE_KEY
  );
  const user = await User.findById(decodeToken._id);
  if (!user) {
    throw new ApiError(401, "Invalid refreshToken");
  }

  if (inComingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "RefreshToken is expired");
  }
  const { accessToken, refreshToken } = await generateAccesTokenAndRefreshToken(
    user._id
  );
  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponce(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Acces Token Is Refreshed"
      )
    );
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword,newPassword} = req.body

    if (!oldPassword || !newPassword) {
        throw new ApiError(400,"All field required")
    }
    const user = await User.findById(req.user?._id)
    // console.log(user);
    
    const isPasswordCorrect =await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave : false})
    return res
    .status(200)
    .json(
        new ApiResponce(200,{},"Password changed succesfully")
    )
})
