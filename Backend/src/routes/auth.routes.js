import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  login,
  logoutUser,
  refreshAccessToken,
  register,
  resendEmailVerification,
  resetPassword,
  verifyUser,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validator.middleware.js";

import {
  userChangedCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator,
} from "../validates/validate.midd.js";
import  verifyJWT  from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, register);
router.route("/login").post(userLoginValidator(), validate, login);
router
  .route("/forgotpassword")
  .post(userForgotPasswordValidator(), validate, forgotPassword);
router
  .route("/resetpassword/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetPassword);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/change-current-password")
  .post(userChangedCurrentPasswordValidator(), validate, changeCurrentPassword);

router.route("/verify-user/:verificationToken").post(verifyJWT, verifyUser);
router.route("/resend-userVerfiy").post(verifyJWT, resendEmailVerification);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
