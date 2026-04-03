import { Conversation, Message, IMessage } from "../model/message.model";
import AppError from "../../../utils/appError";
import mongoose from "mongoose";

interface MessageQuery {
  page?: string;
  limit?: string;
}

class MessageService {
  async getMyConversations(userId: string) {
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name email role")
      .populate("college", "name")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    const conversationsWithUnread = conversations.map((conv) => ({
      ...conv.toObject(),
      unreadCount: conv.unreadCount.get(userId.toString()) || 0,
    }));

    return conversationsWithUnread;
  }

  async getOrCreateConversation(userId: string, otherUserId: string, collegeId?: string) {
    let conversation = await Conversation.findOne({
      type: "single",
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, otherUserId],
        type: "single",
        college: collegeId,
      });
      await conversation.populate("participants", "name email role");
    }

    return conversation;
  }

  async getConversationMessages(conversationId: string, userId: string, query: MessageQuery) {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "50", 10);
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId
    );
    if (!isParticipant) {
      throw new AppError("Not authorized to view this conversation", 403);
    }

    const [messages, total] = await Promise.all([
      Message.find({ conversation: conversationId, isDeleted: false })
        .populate("sender", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments({ conversation: conversationId, isDeleted: false }),
    ]);

    await Message.updateMany(
      { conversation: conversationId, sender: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );

    await Conversation.findByIdAndUpdate(conversationId, {
      [`unreadCount.${userId}`]: 0,
    });

    return {
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async sendMessage(userId: string, conversationId: string, content: string, attachments?: any[]) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId
    );
    if (!isParticipant) {
      throw new AppError("Not authorized to send message in this conversation", 403);
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: userId,
      content,
      attachments,
      readBy: [userId],
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      lastMessageAt: new Date(),
    });

    for (const participantId of conversation.participants) {
      if (participantId.toString() !== userId) {
        const currentCount = conversation.unreadCount.get(participantId.toString()) || 0;
        conversation.unreadCount.set(participantId.toString(), currentCount + 1);
      }
    }
    await conversation.save();

    return message.populate("sender", "name email role");
  }

  async markAsRead(userId: string, conversationId: string) {
    await Message.updateMany(
      { conversation: conversationId, sender: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );

    await Conversation.findByIdAndUpdate(conversationId, {
      [`unreadCount.${userId}`]: 0,
    });
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await Message.findOneAndUpdate(
      { _id: messageId, sender: userId },
      { isDeleted: true },
      { new: true }
    );

    if (!message) throw new AppError("Message not found or not authorized", 404);
  }

  async getUnreadCount(userId: string) {
    const conversations = await Conversation.find({
      participants: userId,
    });

    let totalUnread = 0;
    for (const conv of conversations) {
      totalUnread += conv.unreadCount.get(userId.toString()) || 0;
    }

    return totalUnread;
  }
}

export default new MessageService();
