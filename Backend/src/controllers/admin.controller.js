import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { UserRolesEnum } from "../utils/constants.js";
import { genrateAccessAndRefreshToken } from "./auth.controller.js";
import { userAllPost } from "./post.controller.js";

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

const adminDashBoard = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: UserRolesEnum.USER });
  const totalposts = await Post.countDocuments();
  const blockedUser = await User.countDocuments({
    isBlocked: true,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalUsers, totalposts, blockedUser },
        "Data Fetched Successfully",
      ),
    );
});

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

const AdminotherUserPost = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = req.user;

  if (username === user.username) {
    return userAllPost(req, res);
  }

  const otherUser = await User.findOne({ username }).select(
    "fullName username email",
  );

  if (!otherUser) {
    throw new ApiError(404, "User Not Found");
  }

  const otherUserPost = await Post.find({
    userId: otherUser._id,
  }).select("-_id -userId -imageKitFileId -visibility");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { otherUser, otherUserPost },
        "User Post Fetched Successfully",
      ),
    );
});

const blockUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "User not Selected");
  }

  const UserBlock = await User.findOneAndUpdate(
    { username: username },
    { isBlocked: true },
    { new: true },
  ).select("username fullName");

  if (!UserBlock) {
    throw new ApiError(400, "Can not Block the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { UserBlock }, "User Blocked Successfully"));
});

const unblockUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "User not Selected");
  }

  const UserBlock = await User.findOneAndUpdate(
    { username: username },
    { isBlocked: false },
    { new: true },
  ).select("username fullName");

  if (!UserBlock) {
    throw new ApiError(400, "Can not unBlock the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { UserBlock }, "User UnBlocked Successfully"));
});

const UserNameandPostCount = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: UserRolesEnum.USER });
  const totalposts = await Post.countDocuments();
  const AllUserNmandCoun = await User.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "AllPost",
      },
    },
    {
      $unwind: {
        path: "$AllPost",
      },
    },
    {
      $group: {
        _id: "$_id",
        username: {
          $first: "$username",
        },
        postcount: {
          $sum: 1,
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalUsers, totalposts, AllUserNmandCoun },
        "User All names and User Post Fetched Successfully",
      ),
    );
});

export {
  adminLogin,
  adminDashBoard,
  logoutAdmin,
  AdminotherUserPost,
  blockUser,
  unblockUser,
  UserNameandPostCount,
};
