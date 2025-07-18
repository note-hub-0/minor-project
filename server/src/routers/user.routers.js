import express from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { changeCurrentPassword, login, refreshAccesToken, register } from "../controllers/user.controllers.js"
import {varifyJWT} from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.route("/register").post(
    upload.fields([{name : "avatar",maxCount : 1}]),
    register
)
router.route("/login").post(login)
router.route("/refreshAccesToken").post(refreshAccesToken)
router.route("/changePassword").post(varifyJWT,changeCurrentPassword)

export default router