import express from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { changeCurrentPassword, getCurrectUser, getMe, login, logout, refreshAccesToken, register, updateAccountDetails, updateAvatar } from "../controllers/user.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import { isBlocked } from "../middlewares/verifyUser.middlewares.js"

const router = express.Router()

router.route("/register").post(
    upload.fields([{name : "avatar",maxCount : 1}]),
    register
)
router.route("/login").post(login)
router.route("/refreshAccesToken").post(refreshAccesToken)
router.route("/changePassword").patch(verifyJWT("user"),isBlocked,changeCurrentPassword)
router.route("/update/name-username").patch(verifyJWT("user"),isBlocked,updateAccountDetails)
router.route("/update/avatar").patch(
    upload.fields([{name : "avatar", maxCount : 1}]),
    verifyJWT("user"),
    isBlocked,
    updateAvatar
)
router.route("/get/currect-user").get(verifyJWT("user"),isBlocked,getCurrectUser)
router.route("/logout").post(verifyJWT("user"),isBlocked, logout)
router.route("/me").get(verifyJWT("user"),isBlocked,getMe)
export default router