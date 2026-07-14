import cookieParse from "cookie-parser"
import express from "express"
import cors from 'cors'
const app = express()

app.use(cookieParse())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))



app.use(express.json())

import postRouter from "./routes/post.routes.js"
import authRouter from "./routes/auth.routes.js"


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)

export default app
