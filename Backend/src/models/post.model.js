import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserPostVisibility, AvailabeUserPostVisibility} from "../utils/constants.js";
import crypto from "crypto";

// models/Post.js
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: { type: String, required: true }, 
    imageKitFileId: { type: String, required: true }, 
    description: { type: String, default: "", maxlength: 500 },
    visibility: {
      type: String,
      enum: AvailabeUserPostVisibility,
      default: UserPostVisibility.PUBLIC,
    },
  },
  { timestamps: true },
);

const UserPost = mongoose.model("Post",postSchema)

export default UserPost