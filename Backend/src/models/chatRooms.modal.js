import mongoose from "mongoose";

const roomschema = new mongoose.Schema(
  {
    userId1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const rooms = mongoose.model("chatrooms", roomschema);

export default rooms;
