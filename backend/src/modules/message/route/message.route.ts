import express from "express";
import {
  getMyConversations,
  createConversation,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  deleteMessage,
  getUnreadCount,
} from "../controller/message.controller";
import { authenticate } from "../../../middlewares/auth";

const router = express.Router();

router.use(authenticate);

router.get("/conversations", getMyConversations);
router.post("/conversations", createConversation);
router.get("/conversations/:conversationId/messages", getMessages);
router.post("/conversations/:conversationId/messages", sendMessage);
router.put("/conversations/:conversationId/read", markMessagesAsRead);
router.delete("/messages/:messageId", deleteMessage);
router.get("/unread", getUnreadCount);

export default router;
