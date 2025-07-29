import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { Point } from "../models/point.models.js";
import mongoose from "mongoose";

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
  const folder = "user"
  if (!name || !email || !username || !password || !bio) {
    throw new ApiError(400, "All fields are required");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarCloudinaryRes = await uploadOnCloudinary(avatarLocalPath,folder);
  // console.log(avatarCloudinaryRes);

  if (!avatarCloudinaryRes) {
    throw new ApiError(500, "Somthing went worng when avatar is uploaded");
  }

  const user = await new User({
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
  const point = await new Point({
    owner: user._id,
  });
  await user.save();
  await point.save();
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
    secure: false,
    sameSite : "Lax"
  };
  return res
    .status(200)
    .cookie("accesToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponce(200, {loggedInUser,accessToken,refreshToken}, "User Logged In SuccesFull"));
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
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All field required");
  }
  const user = await User.findById(req.user?._id);
  // console.log(user);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Password changed succesfully"));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, username, bio } = req.body;
  if (!name || !username) {
    throw new ApiError(400, "All fields are required");
  }
  const userId = req.user?._id;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      username,
      bio,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw new ApiError(500, "Update account details is failed");
  }
  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        updatedUser,
        "Account details are updated succesfully"
      )
    );
});

export const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const folder = "user"

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const userId = req.user?._id;

  const avatarCloudinaryRes = await uploadOnCloudinary(avatarLocalPath,folder);
  if (!avatarCloudinaryRes) {
    throw new ApiError(500, "Failed to upload avatar");
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      avatar: avatarCloudinaryRes.secure_url,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw new ApiError(500, "Failed to upadte avatar");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, updatedUser, "Avatar updated succesfully"));
});

export const getCurrectUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "points",
        localField: "_id",
        foreignField: "owner",
        as: "points_details",
        pipeline: [
          {
            $project: {
              points: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "notes",
        localField: "notes",
        foreignField: "_id",
        as: "notes",
      },
    },
    {
      $addFields: {
        points: { $arrayElemAt: ["$points_details.points", 0] },
      },
    },
    {
      $project: {
        name: 1,
        username: 1,
        bio: 1,
        avatar: 1,
        notes: 1,
        points: 1,
      },
    },
  ]);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, user[0], "User featched succesfully"));
});

export const logout = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: 1,
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly : true,
    secure : true
  }
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponce(200, {}, "User logged out successfully"));
});
