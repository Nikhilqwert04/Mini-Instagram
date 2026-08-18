import mongoose from "mongoose";


const messageschema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatrooms",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const message = mongoose.model("message", messageschema);

export default message;
