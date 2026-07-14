import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadFile } from "../services/imagekit.service.js";

const createPost = asyncHandler(async (req, res) => {
  const uploadedfile = uploadFile(req.file.buffer)
  
});

export { createPost };
