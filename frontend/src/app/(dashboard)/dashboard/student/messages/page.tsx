"use client";

import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout";
import { ProtectedRoute, useAuth } from "@/features/auth";
import { Card, CardContent, Button, Input, Badge } from "@/components/ui";
import apiClient from "@/services/axios";
import { formatDate } from "@/lib/utils";
import { FiMessageCircle, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

interface Message {
  _id: string;
  sender: { _id: string; name: string };
  content: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  participants: { _id: string; name: string; role: string }[];
  college?: { _id: string; name: string };
  lastMessage?: { content: string; createdAt: string };
  lastMessageAt?: string;
  unreadCount: number;
}

function StudentMessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await apiClient.get("/messages/conversations");
      setConversations(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await apiClient.get(`/messages/conversations/${conversationId}/messages`);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    try {
      await apiClient.post(`/messages/conversations/${selectedConversation._id}/messages`, {
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages(selectedConversation._id);
      fetchConversations();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <DashboardLayout role="student" userName={user?.name}>
      <div className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <div className="md:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              ) : (
                conversations.map((conv) => {
                  const otherParticipant = conv.participants?.find((p) => p._id !== user?._id);
                  return (
                    <div
                      key={conv._id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?._id === conv._id ? "bg-indigo-50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{conv.college?.name || otherParticipant?.name || "Chat"}</p>
                        {conv.unreadCount > 0 && (
                          <Badge variant="primary" size="sm">{conv.unreadCount}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage?.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(conv.lastMessageAt || conv.lastMessage?.createdAt || "")}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{selectedConversation.college?.name || "Chat"}</h3>
                    <p className="text-sm text-gray-500">Chat with college counselor</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${msg.sender._id === user?._id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-xl ${
                            msg.sender._id === user?._id
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender._id === user?._id ? "text-indigo-200" : "text-gray-500"
                          }`}>
                            {formatDate(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <FiSend className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FiMessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function MessagesPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentMessagesPage />
    </ProtectedRoute>
  );
}