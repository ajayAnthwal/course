"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@/components/ui";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  { question: "How do I apply to a college?", answer: "You can apply to colleges by creating an account, searching for your preferred college, and clicking 'Apply Now'. Fill out the application form and submit required documents.", category: "admission" },
  { question: "What documents are required for admission?", answer: "Common documents include: ID proof (Aadhaar/PAN), Marksheets (10th & 12th), Entrance exam scorecard, Passport size photos, Caste certificate (if applicable).", category: "documents" },
  { question: "How can I track my application status?", answer: "Log in to your student dashboard and go to 'My Applications' section. You'll see real-time status updates for all your applications.", category: "application" },
  { question: "What is the fee structure for colleges?", answer: "Fee structure varies by college and course. You can view detailed fees on each college's page under 'Courses & Fees' section.", category: "fees" },
  { question: "How do I pay the application fee?", answer: "We support multiple payment methods including UPI, Credit/Debit cards, and Net Banking. All transactions are secure and encrypted.", category: "payment" },
  { question: "Can I apply to multiple colleges?", answer: "Yes! You can apply to as many colleges as you want through your dashboard. Each application is processed separately.", category: "application" },
  { question: "What are the eligibility criteria for B.Tech?", answer: "For B.Tech, you need to have passed 12th with Physics, Chemistry, and Mathematics with minimum 50% marks. You also need a valid entrance exam score (JEE Main/CET).", category: "eligibility" },
  { question: "How do I contact the admission counselor?", answer: "You can use the live chat feature or go to 'My Enquiries' in your dashboard to message your assigned counselor.", category: "support" },
  { question: "What is the difference between government and private colleges?", answer: "Government colleges typically have lower fees and better infrastructure but higher competition. Private colleges may have higher fees but more seats and varied specializations.", category: "college" },
  { question: "How do I book a college visit?", answer: "Visit the college page and click 'Schedule Visit'. Select your preferred date and time. You'll receive a confirmation on your registered email/phone.", category: "visit" },
];

interface ChatbotProps {
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

export function Chatbot({ position = "bottom-right" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string; suggestions?: string[] }[]>([
    { role: "bot", content: "Hi! I'm EduBot, your admission assistant. How can I help you today?", suggestions: ["How to apply?", "Documents needed", "Track application"] },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const lowerInput = userInput.toLowerCase();
    
    for (const faq of faqs) {
      if (lowerInput.includes(faq.question.toLowerCase().split(" ")[0]) || lowerInput.includes(faq.category)) {
        return { content: faq.answer, suggestions: ["Ask another question", "Talk to human"] };
      }
    }

    const keywordResponses: Record<string, { content: string; suggestions?: string[] }> = {
      apply: { content: "To apply to a college: 1) Create an account, 2) Search for the college, 3) Click 'Apply Now', 4) Fill the form & submit documents.", suggestions: ["Required documents?", "Application status"] },
      fee: { content: "Fee structure varies by college. Visit the college page to see detailed fees for each course. You can also use EMI options for large payments.", suggestions: ["Payment methods", "Scholarships"] },
      document: { content: "Required documents: ID proof, 10th & 12th marksheets, entrance exam scorecard, photos, caste certificate (if applicable). Upload all documents in PDF/JPG format.", suggestions: ["How to upload?", "Document size limit"] },
      status: { content: "Check your application status in the 'My Applications' section of your student dashboard. Status updates include: Submitted, Under Review, Shortlisted, Admitted.", suggestions: ["View applications", "Contact college"] },
      course: { content: "We have courses across Engineering, Management, Medical, Law, Design, and more. Search by course name or browse categories on the home page.", suggestions: ["Top colleges for B.Tech", "MBA colleges"] },
      contact: { content: "You can reach us via: 1) Live Chat (bottom right), 2) Email support, 3) Phone: 1800-XXX-XXXX (Mon-Sat 9AM-6PM)", suggestions: ["Talk to counselor", "Send email"] },
    };

    for (const [keyword, response] of Object.entries(keywordResponses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }

    return { content: "I didn't quite get that. Could you rephrase your question? You can also choose from the suggestions below.", suggestions: ["How to apply?", "Documents needed", "Contact support"] };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse.content, suggestions: botResponse.suggestions }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(handleSend, 100);
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  if (!isOpen) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded-xl shadow-lg w-48 text-sm hidden group-hover:block">
          <p className="font-medium">Need help?</p>
          <p className="text-neutral-500">Ask EduBot!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-neutral-200`}>
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white">EduBot</h3>
            <p className="text-xs text-primary-100">AI Assistant</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-primary-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === "user" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-900"}`}>
              <p className="text-sm">{msg.content}</p>
              {msg.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(sug)}
                      className={`text-xs px-2 py-1 rounded-full ${msg.role === "user" ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-600 hover:bg-primary-100"}`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 p-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-neutral-50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}