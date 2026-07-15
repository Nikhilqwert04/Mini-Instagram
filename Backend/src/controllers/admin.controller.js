import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadFile } from "../services/imagekit.service.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";
import { genrateAccessAndRefreshToken } from "./auth.controller.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Email not Found");
  }

  const Verifypassword = await user.isPasswordCorrect(password);

  if (!Verifypassword) {
    throw new ApiError(400, "Password is wrong");
  }

  if (user.role !== UserRolesEnum.ADMIN) {
    throw new ApiError(
      403,
      "Access denied: Only administrators can log in here",
    );
  }

  const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
    user._id,
  );

  const ExitedUser = await User.findById(user._id).select(
    "-password -isBlocked -role -refreshtoken",
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("Refresh_Token", refreshToken, option)
    .cookie("Access_Token", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { ExitedUser, refreshToken, accessToken },
        "User Logged in Successfully",
      ),
    );
});

export { adminLogin };
