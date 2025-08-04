import express from "express"
import {varifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { buyNote, getAllNotes, getClass, getNoteById, getPurchasedNotes, getSubjectByClass, getUserNotes, uploadNotes } from "../controllers/note.controllers.js"

const router = express.Router()

router.route("/").get(getAllNotes)
router.route("/class").get(getClass)
router.route("/class/subject").get(getSubjectByClass)

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
router.route("/user-notes").get(getUserNotes)
router.route("/purchased-notes").get(getPurchasedNotes)
router.route("/:noteId").get(getNoteById)
router.route("/:noteId/buy").post(buyNote)

export default router