"use client";

import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";

const statusTimeline = [
  { step: "Application Submitted", date: "2024-03-15", status: "completed", description: "Application form submitted successfully" },
  { step: "Document Verification", date: "2024-03-16", status: "completed", description: "All documents verified by college" },
  { step: "Entrance Exam Score", date: "2024-03-17", status: "completed", description: "JEE Main score: 250/300" },
  { step: "Personal Interview", date: "2024-03-20", status: "current", description: "Interview scheduled - March 25, 2024" },
  { step: "Final Result", date: "-", status: "pending", description: "Expected by April 5, 2024" },
];

export default function ParentStatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Track Application Status</h1>
        <p className="text-neutral-500">Real-time updates on your child's applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {statusTimeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        item.status === "completed"
                          ? "bg-success-100 text-success-600"
                          : item.status === "current"
                          ? "bg-primary-100 text-primary-600"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {item.status === "completed" ? "✓" : item.status === "current" ? "●" : "○"}
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div className={`w-0.5 h-16 ${item.status === "completed" ? "bg-success-200" : "bg-neutral-200"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${item.status === "pending" ? "text-neutral-400" : "text-neutral-900"}`}>
                        {item.step}
                      </p>
                      {item.date !== "-" && (
                        <span className="text-sm text-neutral-500">{new Date(item.date).toLocaleDateString("en-IN")}</span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                    {item.status === "current" && (
                      <Badge variant="primary" className="mt-2">In Progress</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm font-medium text-primary-700">Personal Interview</p>
                  <p className="text-xs text-primary-600 mt-1">March 25, 2024 at 10:00 AM</p>
                </div>
                <div className="p-3 bg-neutral-50 rounded-lg">
                  <p className="text-sm font-medium">Prepare documents</p>
                  <p className="text-xs text-neutral-500 mt-1">Keep ready for verification</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Counselor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-3">👨‍💼</div>
                <p className="text-sm text-neutral-600 mb-4">Get help from your assigned counselor</p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                  Contact Now
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}