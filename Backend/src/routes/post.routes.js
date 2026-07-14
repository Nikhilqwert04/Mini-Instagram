import {Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import {AllUser, createPost, userAllPost} from "../controllers/post.controller.js"
import { postCreatingValidator } from "../validates/validate.midd.js";
import validate from "../middlewares/validator.middleware.js";

const router = Router()

//unsecure routes
router.route("/search").get(AllUser)


//secure rouutes
router.route("/createpost").post(verifyJWT, upload.single("image"), postCreatingValidator(), validate, createPost)
router.route('/me').get(verifyJWT, userAllPost)

export default router;