import express from "express"
import authMiddleware from "../middlewares/auth.middleware"
import sendMessageController from "../controllers/messages/sendMessage.controller"
import getMessagesController from "../controllers/messages/getMessages.controller"
import conversationsControllers from "../controllers/messages/conversations.controllers"

const router = express.Router()

router.post("/send/:id", authMiddleware, sendMessageController)
router.get("/conversations", authMiddleware, conversationsControllers)
router.get("/:id", authMiddleware, getMessagesController)





export default router