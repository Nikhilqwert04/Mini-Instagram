import {Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import {createPost} from "../controllers/post.controller.js"

const router = Router()

router.route("/createpost").post(upload.single("image"), createPost)


export default router;