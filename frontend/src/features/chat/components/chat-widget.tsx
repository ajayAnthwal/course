"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@/components/ui";
import { chatService, type ChatMessage, type Conversation } from "../services/chat.service";

interface ChatWidgetProps {
  collegeId?: string;
  counselorId?: string;
}

export function ChatWidget({ collegeId, counselorId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeConversation) {
      loadMessages(activeConversation);
    }
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const { data } = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error("Error loading conversations:", error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const { data } = await chatService.getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;
    try {
      const { data } = await chatService.sendMessage({
        receiverId: activeConversation,
        content: newMessage,
      });
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-all z-50"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-neutral-200">
      <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Chat Support</h3>
          <p className="text-xs text-primary-100">We typically reply within minutes</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-primary-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {!activeConversation ? (
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-neutral-500 mb-4">Select a conversation or start new</p>
          <div className="space-y-2">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <button
                  key={conv._id}
                  onClick={() => setActiveConversation(conv._id)}
                  className="w-full p-3 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100"
                >
                  <p className="font-medium text-neutral-900">{conv.participants[0]?.name}</p>
                  <p className="text-xs text-neutral-500">{conv.participants[0]?.role}</p>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-neutral-500 text-sm">No conversations yet</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center p-3 border-b bg-neutral-50">
            <button onClick={() => setActiveConversation(null)} className="text-neutral-500 hover:text-neutral-700 mr-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-medium text-neutral-900">Chat</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="text-center py-8 text-neutral-400">Loading...</div>
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg._id} className={`flex ${msg.sender._id === "currentUser" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender._id === "currentUser"
                        ? "bg-primary-600 text-white"
                        : "bg-neutral-100 text-neutral-900"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.sender._id === "currentUser" ? "text-primary-100" : "text-neutral-400"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-400">
                <p>No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} size="sm">
                Send
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}