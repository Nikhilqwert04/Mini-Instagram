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
    .cookie("Admin_Refresh_Token", refreshToken, option)
    .cookie("Admin_Access_Token", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { ExitedUser, refreshToken, accessToken },
        "User Logged in Successfully",
      ),
    );
});

const adminDashBoard = asyncHandler(async (req,res)=>{

  const totalUsers = await User.countDocuments({role:UserRolesEnum.USER})
  const totalposts = await Post.countDocuments()
  const blockedUser =await User.countDocuments({
    isBlocked:true
  })


  return res.status(200)
  .json(new ApiResponse(200,{totalUsers,totalposts,blockedUser},"Data Fetched Successfully"))


})

const logoutAdmin = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshtoken: "" } },
    { new: true },
  ).select(
    "-_id -password -isEmailVerified -isEmailVerified -refreshtoken -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry -isBlocked -role -email -fullName",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("Admin_Access_Token", options)
    .clearCookie("Admin_Refresh_Token", options)
    .json(new ApiResponse(200, { user }, "User loogged Out"));
});

export { adminLogin,adminDashBoard,logoutAdmin };
