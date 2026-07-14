import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadFile } from "../services/imagekit.service.js";
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

const createPost = asyncHandler(async (req, res) => {
  const { description, visibility } = req.body;

  if (!description || !visibility) {
    throw new ApiError(400, "Description or visibility is not given");
  }

  if (!req.file) {
    throw new ApiError(400, "Image file is required");
  }

  const uploadedfile = await uploadFile(req.file.buffer);

  if (!uploadedfile || !uploadedfile.url) {
    throw new ApiError(500, "Failed to upload file to ImageKit");
  }

  const post = await Post.create({
    userId: new mongoose.Types.ObjectId(req.user._id),
    imageUrl: uploadedfile.url,
    description,
    imageKitFileId: uploadedfile.fileId,
    visibility,
  });

  if (!post) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post Created Successfully"));
});

const userAllPost = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }

  const Allpost = await Post.find({
    userId: user._id,
  }).select("-_id -userId -imageKitFileId");

  if (!Allpost) {
    throw new ApiError(404, "No images found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { Allpost }, "All User Images Fetched Successfully"),
    );
});

const AllUser = asyncHandler(async (req, res) => {
  const AllUser = await User.find({ role: UserRolesEnum.USER }).select(
    "-_id -password -isEmailVerified -isEmailVerified -refreshtoken -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry -isBlocked -role",
  );
  
  return res.status(200)
  .json(new ApiResponse(200,AllUser,"All User Fetch Susccessfully"))
});

const otherUserPost = asyncHandler(async (req, res) => {
  //test
});

export { createPost, userAllPost, otherUserPost, AllUser };
