import { Router } from "express";
import { userLoginValidator } from "../validates/validate.midd.js";
import validate from "../middlewares/validator.middleware.js";
import { adminDashBoard, adminLogin, AdminotherUserPost, blockUser, logoutAdmin, unblockUser, UserNameandPostCount } from "../controllers/admin.controller.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";
import { verifyAdminJWT, verifyUser } from "../middlewares/admin.middleware.js";
import { SearchUser } from "../controllers/post.controller.js";
const router = Router();

router.route("/adminlogin").post(userLoginValidator(), validate, adminLogin);
router.route("/refresh-token").post(refreshAccessToken);


router.route("/admin-dashboard").get(verifyAdminJWT,verifyUser,adminDashBoard)
router.route("/admin-logout").post(verifyAdminJWT, logoutAdmin)
router.route("/searchUsername").get(verifyAdminJWT, SearchUser)
router.route("/Adminuser/:username").get(verifyAdminJWT, AdminotherUserPost)
router.route("/Adminuser/:username/block").patch(verifyAdminJWT, blockUser)
router.route("/Adminuser/:username/unblock").patch(verifyAdminJWT, unblockUser)
router.route("/UserandNoofPost").get(verifyAdminJWT, UserNameandPostCount)
export default router;
