"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@/components/ui";

const messages = [
  { id: 1, from: "IIT Bombay Admission", subject: "Interview Call Letter", time: "2 hours ago", unread: true },
  { id: 2, from: "EduPortal Counselor", subject: "Application Guidance", time: "1 day ago", unread: true },
  { id: 3, from: "IIM Ahmedabad", subject: "Document Verification Complete", time: "3 days ago", unread: false },
  { id: 4, from: "NIT Delhi", subject: "Application Status Update", time: "5 days ago", unread: false },
];

export default function ParentMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [reply, setReply] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Messages</h1>
        <p className="text-neutral-500">Communicate with colleges and counselors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Inbox ({messages.filter((m) => m.unread).length} new)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                    selectedMessage.id === msg.id ? "bg-primary-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${msg.unread ? "text-neutral-900" : "text-neutral-600"}`}>{msg.from}</p>
                    {msg.unread && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
                  </div>
                  <p className="text-sm text-neutral-600 mt-1 truncate">{msg.subject}</p>
                  <p className="text-xs text-neutral-400 mt-1">{msg.time}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedMessage.from}</CardTitle>
              <span className="text-sm text-neutral-500">{selectedMessage.time}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-semibold text-neutral-900 mb-2">{selectedMessage.subject}</h3>
              <p className="text-neutral-600">
                Dear Parent, This is to inform you that your child has been shortlisted for the personal interview round.
                The interview is scheduled for March 25, 2024. Please ensure all original documents are ready for verification.
                Regards, Admission Team
              </p>
            </div>

            <div className="border-t pt-4">
              <textarea
                className="w-full p-3 border border-neutral-200 rounded-lg text-sm"
                rows={3}
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex justify-end mt-3">
                <Button>Send Reply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}