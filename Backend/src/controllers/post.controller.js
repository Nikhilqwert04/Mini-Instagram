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
  }).select("-imageKitFileId");

  if (!Allpost) {
    throw new ApiError(404, "No images found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { Allpost }, "User All Images Fetched Successfully"),
    );
});

const AllUser = asyncHandler(async (req, res) => {
  const AllUser = await User.find({ role: UserRolesEnum.USER }).select(
    "-_id -password -isEmailVerified -isEmailVerified -refreshtoken -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry -isBlocked -role",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, AllUser, "All User Fetch Susccessfully"));
});

const otherUserPost = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = req.user;

  if (username === user.username) {
    return userAllPost(req, res);
  }

  const otherUser = await User.findOne({ username }).select("fullName, username email");

  if (!otherUser) {
    throw new ApiError(404, "User Not Found");
  }

  const otherUserPost = await Post.find({
    visibility: "public",
    userId: otherUser._id,
  }).select("-_id -userId -imageKitFileId -visibility");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { otherUser,otherUserPost }, "User Post Fetched Successfully"),
    );
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const user = req.user;

  const matchingPostId = await Post.findById(postId);

  if (!matchingPostId) {
    throw new ApiError(404, "No post found");
  }

  if (!matchingPostId.userId.equals(user._id)) {
    throw new ApiError(403, "Unauthorized Access");
  }

  const thatPost = await Post.findByIdAndDelete(postId);

  if (!thatPost) {
    throw new ApiError(404, "Post not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, thatPost, "Post Deleted Successfully"));
});

const editPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { description, visibility } = req.body;
  const user = req.user;

  const matchingPostId = await Post.findById(postId);

  if (!matchingPostId) {
    throw new ApiError(404, "No post found");
  }

  if (!matchingPostId.userId.equals(user._id)) {
    throw new ApiError(403, "Unauthorized Access");
  }

  const thatPost = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        description: description,
        visibility: visibility,
      },
    },
    { new: true },
  );
  if (!thatPost) {
    throw new ApiError(404, "Cannot update the post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, thatPost, "Post Updated Successfully"));
});

const SearchUser = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    throw new ApiError(400, "Search query is required");
  }

  const SelectedUsers = await User.find({
    username: {
      $regex: q,
      $options: "i",
    },
  }).select("fullName email username -_id");

  return res
    .status(200)
    .json(new ApiResponse(200, SelectedUsers, "Users searched successfully"));
});
export {
  createPost,
  userAllPost,
  otherUserPost,
  AllUser,
  deletePost,
  editPost,
  SearchUser,
};
