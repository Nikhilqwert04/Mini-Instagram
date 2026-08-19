import Message from "../models/message.modal.js";
import rooms from "../models/chatRooms.modal.js";

const handlejoinRoom = async (socket, data) => {
  try {
    const userId1 = socket.user._id;
    const { userId2 } = data;

    if (!userId2) {
      console.log("Recipient user ID (userId2) is missing");
      return;
    }

    const chatroom = await rooms.findOne({
      $or: [
        { userId1: userId1, userId2: userId2 },
        { userId1: userId2, userId2: userId1 },
      ],
    });

    if (chatroom) {
      const roomId = chatroom._id.toString();
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`)
    }
  } catch (error) {
    console.error("Error joining room:", error.message);
  }
};

const handleSendMessage = async (io, socket, data) => {
  try {
    const userId = socket.user._id;
    const { roomId, message } = data;

    if (!roomId || !message) {
      console.log("Room ID or message body is missing");
      return;
    }

    const newMessage = await Message.create({
      roomId,
      userId,
      message: message.trim(),
    });

    io.to(roomId).emit("message", {
      _id: newMessage._id,
      roomId: newMessage.roomId,
      userId: newMessage.userId,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
    });
    console.log(`Message saved & broadcasted to room ${roomId}`);
  } catch (error) {
    console.error("Error in sendMessage socket controller:", error.message);
  }
};

const handleDisconnect = async (socket) => {
  console.log("User Disconnected:", socket.id);
};

export { handlejoinRoom, handleSendMessage, handleDisconnect };
