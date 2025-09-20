import { get } from "mongoose";
import { Note } from "../models/note.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHanler.js";
import { ApiError } from "../utils/ApiError.js";

export const adminController = {
  verifyNotes: asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { status } = req.body;
    const note = await Note.findByIdAndUpdate(
      noteId,
      { status },
      { new: true }
    );
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Note status updated", note });
  }),
getAllPendingNotes: asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const totalPending = await Note.countDocuments({ status: "pending" });

  const notes = await Note.find({ status: "pending" })
    .skip(skip)
    .limit(limit)
    .populate("owner", "name username email");

  if (!notes || notes.length === 0) {
    throw new ApiError(404, "No pending notes found");
  }

  return res.status(200).json(
    new ApiResponce(
      200,
      {
        totalPending,
        currentPage: page,
        numberOfPage: Math.ceil(totalPending / limit),
        notes,
      },
      "Pending notes fetched successfully"
    )
  );
}),

  getAllNotes: asyncHandler(async (req, res) => {
    const notes = await Note.find().populate("owner", "name username email");
    return res.status(200).json({ success: true, notes });
  }),
  blockUser: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User blocked successfully", user });
  }),
  unblockUser: asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User unblocked successfully", user });
    return res
      .status(200)
      .json({ success: true, message: "User unblocked successfully", user });
  }),
  getAllUsers: asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json({ success: true, users });
  }),
};
