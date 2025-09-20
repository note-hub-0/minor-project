import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { isBlocked } from "../middlewares/verifyUser.middlewares.js";
import { adminController } from "../controllers/admin.controllers.js";

const router = express.Router();

router
  .route("/users")
  .get(verifyJWT("admin"), adminController.getAllUsers);
router
  .route("/user/:userId/block")
  .patch(verifyJWT("admin"), adminController.blockUser);
router
  .route("/user/:userId/unblock")
  .patch(verifyJWT("admin"), adminController.unblockUser);
router
  .route("/notes")
  .get(verifyJWT("admin"), adminController.getAllNotes);
router
  .route("/notes/pending")
  .get(verifyJWT("admin"), adminController.getAllPendingNotes);
router
  .route("/note/:noteId/verify")
  .patch(verifyJWT("admin"), adminController.verifyNotes);

export default router;