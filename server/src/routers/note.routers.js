import express from "express"
import {varifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { getAllNotes, getNoteById, uploadNotes } from "../controllers/note.controllers.js"

const router = express.Router()

router.use(varifyJWT)

router.route("/upload").post(
    upload.fields([
        {
            name : "note",
            maxCount : 1
        },
        {
            name : "thumbnail",
            maxCount : 1
        }
    ]),
    uploadNotes
)
router.route("/").get(getAllNotes)
router.route("/:noteId").get(getNoteById)

export default router