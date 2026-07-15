import {Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"
import {AllUser, createPost, deletePost, editPost, otherUserPost, SearchUser, userAllPost} from "../controllers/post.controller.js"
import {postCreatingValidator} from "../validates/validate.midd.js";
import validate from "../middlewares/validator.middleware.js";

const router = Router()

//unsecure routes
router.route("/search").get(AllUser)


//secure rouutes
router.route("/createpost").post(verifyJWT, upload.single("image"), postCreatingValidator(), validate, createPost)
router.route('/me').get(verifyJWT, userAllPost)
router.route("/search/:username").get(verifyJWT, otherUserPost)
router.route("/delete/:postId").delete(verifyJWT, deletePost)
router.route("/update/:postId").patch(verifyJWT, editPost)
router.route("/searchUsername").get(verifyJWT, SearchUser)

export default router;