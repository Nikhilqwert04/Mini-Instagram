import {Router} from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import createChatroom from "../controllers/chatroom.controller.js";

const router = Router()

router.route("/chatroom").post(verifyJWT, createChatroom)

export default router;