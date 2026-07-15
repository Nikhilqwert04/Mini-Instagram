import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { userLoginValidator } from "../validates/validate.midd.js";
import validate from "../middlewares/validator.middleware.js";
import { adminDashBoard, adminLogin, logoutAdmin } from "../controllers/admin.controller.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";
import { verifyAdminJWT, verifyUser } from "../middlewares/admin.middleware.js";
const router = Router();

router.route("/adminlogin").post(userLoginValidator(), validate, adminLogin);
router.route("/refresh-token").post(refreshAccessToken);


router.route("/admin-dashboard").get(verifyAdminJWT,verifyUser,adminDashBoard)
router.route("/admin-logout").post(verifyAdminJWT, logoutAdmin)
export default router;
