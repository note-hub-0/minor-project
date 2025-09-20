import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Note } from "../models/note.models.js";
import { Point } from "../models/point.models.js";
import mongoose, { mongo } from "mongoose";
import { User } from "../models/user.models.js";
import { PurchasedNote } from "../models/purchasedNote.models.js";

export const uploadNotes = asyncHandler(async (req, res) => {
  const { title, description, isPremium, subject, price ,Class} = req.body;
  const folder = "notes";
  if (!title || !description || !subject || !Class) {
    throw new ApiError(400, "title and description and subject are required");
  }
  const userId = req.user?._id;

  const noteFileLocalPath = req.files?.note[0];

  if (!noteFileLocalPath.path || !noteFileLocalPath) {
    throw new ApiError(400, "Note file is required");
  }

  const maxSize = 10 * 1024 * 1024;
  if (noteFileLocalPath.size > maxSize) {
    throw new ApiError(400, "File size must be less than 10mb");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0];
  if (!thumbnailLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }

  const noteFileCloudinaryRes = await uploadOnCloudinary(
    noteFileLocalPath.path,
    folder
  );
  if (!noteFileCloudinaryRes) {
    throw new ApiError(500, "Failed to upload note file");
  }

  const thumbnailClouldinaryRes = await uploadOnCloudinary(
    thumbnailLocalPath.path,
    folder
  );
  if (!thumbnailClouldinaryRes) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const note = await new Note({
    title,
    description,
    isPremium: isPremium || false,
    price: isPremium ? price : 0,
    class : Class,
    subject: subject,
    file: noteFileCloudinaryRes.secure_url,
    thumbnail: thumbnailClouldinaryRes.secure_url,
    owner: userId,
  });

  if (!note) {
    throw new ApiError(500, "Failed to upload note");
  }
  const userPoint = await Point.findOne({
    owner: new mongoose.Types.ObjectId(userId),
  });
  const user = await User.findById(userId);
  await user.notes.push(note._id);
  await user.save();
  await userPoint.addPoints(5, "Upload Note");
  if (isPremium) {
    const uploadCost = 2;
    await userPoint.removePoints(uploadCost, "Upload Notes");
  }
  await userPoint.save();
  await note.save();
  return res
    .status(200)
    .json(new ApiResponce(200, note, "Note is uploaded successfully"));
});

export const getAllNotes = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, Class, subject, sortBy } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

   const filters = { status: "approved" }
  if (Class) filters.class = Class;
  if (subject) filters.subject = subject;

  let sortOption = {};
  if (sortBy === "recent") sortOption = { createdAt: -1 };
  else if (sortBy === "views") sortOption = { views: -1 };
  else if (sortBy === "popular") sortOption = { downloads: -1 };

  const totalNumberOfNotes = await Note.countDocuments(filters);

  const notes = await Note.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .populate("owner", "name username avatar");

  if (!notes || notes.length === 0) {
    throw new ApiError(404, "No notes found");
  }

  return res.status(202).json(
    new ApiResponce(
      202,
      {
        totalNumberOfNotes,
        currentPage: page,
        numberOfPage: Math.ceil(totalNumberOfNotes / limit),
        notes,
      },
      "Notes fetched successfully"
    )
  );
});


export const getNoteById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId).populate(
    "owner",
    "name username avatar"
  );
  if (!note || note.length === 0) {
    throw new ApiError(404, "Note not found");
  }
  if (note.isPremium) {
    const isPurchased = await PurchasedNote.findOne({
      buyer: req.user?._id,
      notes: note._id,
    });
    if (!isPurchased) {
      throw new ApiError(
        403,
        "You must purchase this premium note to access it."
      );
    }
  }
  return res
    .status(202)
    .json(new ApiResponce(202, note, "Note featched succesFully"));
});

export const buyNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user?._id;

  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(404, "Not found");
  }
  if (!note.isPremium) {
    throw new ApiError(400, "This notes is free. No need to buy it.");
  }

  const existingPurchase = await PurchasedNote.findOne({
    buyer: userId,
    notes: noteId,
  });
  if (existingPurchase) {
    throw new ApiError(400, "You have already purchased this notes.");
  }

  const point = await Point.findOne({
    owner: userId,
  });
  if (point.points < note.price) {
    throw new ApiError(400, "Insufficient points to purchase this note.");
  }
  await point.removePoints(note.price, "You are buy a new notes.");
  await point.save();

  const purchasedNote = await new PurchasedNote({
    buyer: userId,
    notes: noteId,
  });
  await purchasedNote.save();

  return res
    .status(200)
    .json(new ApiResponce(200, purchasedNote, "Notes purchased successfully."));
});

export const getUserNotes = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const notes = await Note.find({
    owner: new mongoose.Types.ObjectId(userId),
  });
  if (!notes) {
    throw new ApiError(404, "You have not posted notes yet.");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, notes, "Notes featched succesfullt."));
});

export const getPurchasedNotes = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const purchasedNotes = await PurchasedNote.aggregate([
    {
      $match: {
        buyer: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "notes",
        localField: "notes",
        foreignField: "_id",
        as: "noteData", 
      },
    },
    {
      $unwind: "$noteData", 
    },
    {
      $lookup: {
        from: "users",
        localField: "noteData.owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $project: {
        buyer: 1,
        purchaseDate: 1,
        note: "$noteData",              
        owner: "$ownerDetails.name",
        username: "$ownerDetails.username",
        avatar: "$ownerDetails.avatar",
      },
    },
  ]);

  if (!purchasedNotes || purchasedNotes.length === 0) {
    throw new ApiError(404, "You have not purchased any notes.");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, purchasedNotes, "Your purchased notes have been fetched"));
});

export const getClass = asyncHandler(async (req ,res) => {
  const classes = await Note.distinct("class") 
  if (!classes) {
    throw new ApiError(404,"Class not found")
  }
  return res
  .status(200)
  .json(
    new ApiResponce(200,classes,"classes fetched succesFully")
  )
})

export const getSubjectByClass = asyncHandler(async(req,res) => {
  const {Class} = req.query;
  const subjects = await Note.distinct("subject",{class : Class})

  if (!subjects) {
    throw new ApiError(404,"Subjects are not found")
  }
  return res
  .status(200)
  .json(
    new ApiResponce(200,subjects,"Subjects are fetched succesfully")
  )
})

export const deleteNotes = asyncHandler(async(req, res) => {
  const {noteId} = req.params

  const del = await Note.findByIdAndDelete(noteId)

  if (!res) {
    throw new ApiError(500,"Failed to delete notes")
  }

  return res
  .status(200)
  .json(
    new ApiResponce(200,del ,"Notes deleted succesfully")
  )
})