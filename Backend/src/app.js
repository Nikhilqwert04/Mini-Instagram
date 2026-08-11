import cookieParse from "cookie-parser";
import express from "express";
import cors from "cors";
const app = express();

app.use(cookieParse());
app.use(
  cors({
    origin: ["http://localhost:5173","https://mini-instagram-eight.vercel.app"],
    credentials: true,
    methods: ["PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

import postRouter from "./routes/post.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/api/v1/health",async(_,res)=>{
  return res.status(200).json({message:"Server is upp and healthy"})
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
