import cookieParse from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import verifySocketJWT from "./middlewares/socket.middleware.js";
import { handlejoinRoom, handleSendMessage, handleDisconnect } from "./controllers/joinroom.controller.js";
const app = express();

const server = http.createServer(app);

const corsOptions = {
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cookieParse());
app.use(cors(corsOptions));

app.use(express.json());

import postRouter from "./routes/post.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import rooms from "./routes/chatroom.routes.js";

app.use("/api/v1/health", async (_, res) => {
  return res.status(200).json({ message: "Server is upp and healthy" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/room", rooms);

io.use(verifySocketJWT);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => handlejoinRoom(socket, data));
  socket.on("sendMessage", (data) => handleSendMessage(io, socket, data));
  socket.on("disconnect", () => handleDisconnect(socket));
});

export { server };
export default app;
