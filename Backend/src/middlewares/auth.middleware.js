import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import { UserRolesEnum } from "../utils/constants.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.Access_Token ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "Unauthorized Token");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshtoken -verificationToken -verificationTokenExpiry",
    );
    if (!user) {
      throw new ApiError(401, "Invalid access Token");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid access token");
  }
});

const verifyUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log(user.role);
  if (user.role !== "admin") {
    throw new ApiError(400, "Unotherized Access");
  }

  next();
});

export { verifyJWT, verifyUser };
