import rooms from "../models/chatRooms.modal.js";
import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";

const createChatroom = asyncHandler(async (req, res) => {
  const userId1 = req.user._id;
  const { userId2 } = req.body;

  let chatroom = await rooms.findOne({
    $or: [
      { userId1: userId1, userId2: userId2 },
      { userId1: userId2, userId2: userId1 },
    ],
  });
  if (chatroom) {
    console.log("room Exist");
  } else {
    chatroom = await rooms.create({
      userId1,
      userId2,
    });
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        chatroom,
        "Room Created Successfull or its already exists",
      ),
    );
});

export default createChatroom
