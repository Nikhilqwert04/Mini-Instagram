import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

const verifySocketJWT = async (socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return next(new Error("Unauthorized"));
    }

    const token = cookies
      .split("; ")
      .find((cookie) => cookie.startsWith("Access_Token="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Access token not found"));
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshtoken -verificationToken -verificationTokenExpiry"
    );

    if (!user) {
      return next(new Error("Invalid access token"));
    }

    if (user.isBlocked) {
      return next(new Error("You are blocked by admin"));
    }

    socket.user = user;

    next();

  } catch (error) {
    next(new Error("Invalid access token"));
  }
};

export default verifySocketJWT