import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  sendMail,
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
} from "../utils/mail.js";

const genrateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something Went Wrong White Genreting access token",
    );
  }
};

const register = asyncHandler(async (req, res) => {
  const { username, fullName, password, email, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User({
    username,
    fullName,
    email,
    password,
  });

  const { unHashedToken, HashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.verificationToken = HashedToken;
  user.verificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailGenContent(
      user.username,
      `http://localhost:5173/verify-email/${unHashedToken}`,
    ),
  });

  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -isBlocked -role -_id",
  );

  if (!createdUser) {
    throw new ApiError(400, "Something Went Wrong User Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse("200", createdUser, "User Created Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Email not Found");
  }

  const Verifypassword = await user.isPasswordCorrect(password);

  if (!Verifypassword) {
    throw new ApiError(400, "Password is wrong");
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

const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(402, "Veficiation token invalid");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Token is Invalid or Expered");
  }

  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return req
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "Current User feteched Successfull",
      ),
    );
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "user does not Exist");
  }

  if (user.isEmailVerified) {
    throw new ApiError(409, "Email is alresy verifieed");
  }

  const { unHashedToken, HashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.verificationToken = HashedToken;
  user.verificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailGenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  return req
    .status(200)
    .json(new ApiResponse(200, {}, "Current User feteched Successfull"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("400", "User Not Found");
  }

  const { unHashedToken, HashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.resetPasswordToken = HashedToken;
  user.resetPasswordTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user?.email,
    subject: "Password Reset Request",
    mailgenContent: forgotPasswordMailGenContent(
      user.username,
      `http://localhost:5173/reset-password/${unHashedToken}`,
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { HashedToken, unHashedToken },
        "Password Reset mail ",
      ),
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!resetToken) {
    throw new ApiError(400, "Reset token is required");
  }

  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(489, "Token is Invalid or Expired");
  }

  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.Refresh_Token || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Invalid Refresh Token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh Token");
    }
    if (incomingRefreshToken !== user?.refreshtoken) {
      throw new ApiError(401, "Refresh token is Expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await genrateAccessAndRefreshToken(user._id);

    user.refreshtoken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("Access_Token", accessToken, options)
      .cookie("Refresh_Token", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token  refresh",
        ),
      );
  } catch (err) {
    console.error("Refresh token error:", err);
    throw new ApiError(401, err?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changes Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
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
    .clearCookie("Access_Token", options)
    .clearCookie("Refresh_Token", options)
    .json(new ApiResponse(200, { user }, "User loogged Out"));
});

export {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyUser,
  resendEmailVerification,
  refreshAccessToken,
  changeCurrentPassword,
  logoutUser,
  genrateAccessAndRefreshToken,
};
