import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Note } from "../models/note.models.js";

export const uploadNotes = asyncHandler(async (req, res) => {
  const { title, description, isPremium, price } = req.body;
  const folder = "notes"
  if (!title || !description) {
    throw new ApiError(400, "title and description are required");
  }
  const userId = req.user?._id;

  const noteFileLocalPath = req.files?.note[0];

  if (!noteFileLocalPath.path || !noteFileLocalPath) {
    throw new ApiError(400, "Note file is required");
  }

  const maxSize = 10 * 1024 * 1024
if (noteFileLocalPath.size > maxSize) {
  throw new ApiError(400,"File size must be less than 10mb")
}
  const thumbnailLocalPath = req.files?.thumbnail[0];
  if (!thumbnailLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }

  const noteFileCloudinaryRes = await uploadOnCloudinary(noteFileLocalPath.path,folder);
  if (!noteFileCloudinaryRes) {
    throw new ApiError(500, "Failed to upload note file");
  }

  const thumbnailClouldinaryRes = await uploadOnCloudinary(thumbnailLocalPath.path, folder);
  if (!thumbnailClouldinaryRes) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const note = await new Note({
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
  await note.save()
  return res
  .status(200)
  .json(
    new ApiResponce(200,note,"Note is uploaded successfully")
  )
});

export const getAllNotes = asyncHandler(async(req,res) => {
  const {page,limit} = req.query
  const skip = (page - 1) * limit;
  const totalNumberOfNotes =await Note.countDocuments()
  const notes = await Note
  .find()
  .skip(skip)
  .limit(limit)
  .populate("owner","name username avatar")

  if (!notes || notes.length === 0){
    throw new ApiError(404,"Not nots yet");
  }

  return res
  .status(202)
  .json(
    new ApiResponce(
      202,
      {
        totalNumberOfNotes,
        currentPage : page,
        numberOfPage : Math.ceil(totalNumberOfNotes / limit),
        notes
      },
      "Notes are featched successfully"
    )
  )

})

export const getNoteById = asyncHandler(async(req,res) => {
  const {noteId} = req.params
  const note = await Note
  .findById(noteId)
  .populate("owner","name username avatar")
  if (!note || note.length === 0) {
    throw new ApiError(404,"Note not found")
  }
  return res
  .status(202)
  .json(
    new ApiResponce(202,note,"Note featched succesFully")
  )
})
