import express from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { changeCurrentPassword, getCurrectUser, login, logout, refreshAccesToken, register, updateAccountDetails, updateAvatar } from "../controllers/user.controllers.js"
import {varifyJWT} from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.route("/register").post(
    upload.fields([{name : "avatar",maxCount : 1}]),
    register
)
router.route("/login").post(login)
router.route("/refreshAccesToken").post(refreshAccesToken)
router.route("/changePassword").patch(varifyJWT,changeCurrentPassword)
router.route("/update/name-username").patch(varifyJWT,updateAccountDetails)
router.route("/update/avatar").patch(
    upload.fields([{name : "avatar", maxCount : 1}]),
    varifyJWT,
    updateAvatar
)
router.route("/get/currect-user").get(varifyJWT,getCurrectUser)
router.route("/logout").post(varifyJWT, logout)

export default router