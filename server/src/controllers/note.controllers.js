import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Note } from "../models/note.models.js";

export const uploadNotes = asyncHandler(async (req, res) => {
  const { title, description, isPremium, price } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "title and description are required");
  }
  const userId = req.user?._id;

  const noteFileLocalPath = req.files?.note[0]?.path;

  if (!noteFileLocalPath) {
    throw new ApiError(400, "Note file is required");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }

  const noteFileCloudinaryRes = await uploadOnCloudinary(noteFileLocalPath);
  if (!noteFileCloudinaryRes) {
    throw new ApiError(500, "Failed to upload note file");
  }

  const thumbnailClouldinaryRes = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnailClouldinaryRes) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const note = await Note({
    title,
    description,
    isPremium : isPremium || false,
    price : isPremium ? price : 0,
    file : noteFileCloudinaryRes.secure_url,
    thumbnail : thumbnailClouldinaryRes.secure_url,
    owner : userId
  })

  if (!note) {
    throw new ApiError(500,"Failed to upload note")
  }

  return res
  .status(200)
  .json(
    new ApiResponce(200,note,"Note is uploaded successfully")
  )
});
