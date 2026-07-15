import { Router } from "express";
import { verifyJWT, verifyUser } from "../middlewares/auth.middleware.js";
import { userLoginValidator } from "../validates/validate.midd.js";
import validate from "../middlewares/validator.middleware.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { refreshAccessToken } from "../controllers/auth.controller.js";
const router = Router();

router.route("/adminlogin").post(userLoginValidator(), validate, adminLogin);
router.route("/refresh-token").post(refreshAccessToken);
export default router;
