import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  Loader2, 
  RotateCcw,
  BookOpen,
  HelpCircle,
  Building2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { CopilotMessage } from "../types";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

export const FhcCopilot: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, setRoute } = useApp();

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: `Welcome to the Addis Ababa City Administration Building & Rental Property Information Desk. I provide official guidance regarding city property registration, public rental leasing, maintenance requests, complaint tracking, arrears management, and sub-city depots.

How may I assist you with city property management policies today?`,
      timestamp: "Official Desk",
      sources: ["Addis Ababa City Administration Property Directives", "Building & Rental Property Management Guidelines 2026"]
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: "Lease application & rules", prompt: "How does the City Administration rental property application and lease agreement process work?" },
    { label: "Maintenance request workflow", prompt: "How do I register and track a property maintenance request through the city system?" },
    { label: "Complaint ticketing & SLA", prompt: "What is the customer complaint ticketing process and service-level escalation target?" },
    { label: "Sub-city depot directory", prompt: "Where are the 11 sub-city property management offices and maintenance depots located?" }
  ];

  useEffect(() => {
    if (isCopilotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isCopilotOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          language: "en"
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: CopilotMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.reply || "Thank you for contacting the City Property Information Desk. For formal inquiries, please contact info@addisproperty.gov.et or visit your sub-city branch depot.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: data.sources || ["City Administration Directives", "info@addisproperty.gov.et"]
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error("Server response failed");
      }
    } catch (err) {
      console.warn("Copilot client fallback:", err);
      const lower = textToSend.toLowerCase();
      let fallbackText = `Welcome to the Addis Ababa City Administration Building & Rental Property Management Civic AI Desk.\n\nWe administer over 72,400+ public buildings and residential housing units across all 11 sub-cities of Addis Ababa. You can contact info@addisproperty.gov.et or call the 24/7 hotline at 8333 / 9912.`;
      const fallbackSources = ["City Administration Directives", "info@addisproperty.gov.et"];

      if (lower.includes("lease") || lower.includes("rent") || lower.includes("apply") || lower.includes("application")) {
        fallbackText = `### Municipal Public Tenancy & Application Process\n\n1. **Eligibility:** Valid Kebele or Fayda ID, TIN number, and verified civil servant quota or priority allocation registration.\n2. **Submission:** Online via our Services portal or at your respective sub-city property branch depot.\n3. **Payment Due Date:** Rent is payable on or before the 30th of each month (5-day statutory grace period).`;
        fallbackSources.push("Municipal Housing Directive No. 44/2026");
      } else if (lower.includes("maintenance") || lower.includes("repair") || lower.includes("defect") || lower.includes("leak") || lower.includes("electric")) {
        fallbackText = `### Maintenance & Defect Resolution\n\n1. **Submitting Tickets:** File via the Tenant Portal (Defects tab) or dial hotline 8333.\n2. **Response Times:** Emergency repairs (burst pipes, power hazards) dispatched within 4 hours; standard repairs within 48–72 hours from your sub-city maintenance depot.`;
        fallbackSources.push("Municipal Maintenance Operational SLA 2026");
      } else if (lower.includes("bank") || lower.includes("cbe") || lower.includes("telebirr") || lower.includes("pay") || lower.includes("deposit")) {
        fallbackText = `### Designated Treasury Payment Accounts\n\n* **Commercial Bank of Ethiopia (CBE):** 1000-0238-4921-9 (AA Housing Dev Treasury)\n* **Awash Bank / Telebirr Pay:** 0132-0948-2831-0 (Telebirr Biller: 99420)\n\nUpload your bank receipt slip via the Tenant Portal -> Rent & Deposit Slips tab for 24-hour verification.`;
        fallbackSources.push("City Treasury Collection Guidelines");
      } else if (lower.includes("depot") || lower.includes("sub-city") || lower.includes("location") || lower.includes("office")) {
        fallbackText = `### 11 Sub-City Depots & Municipal Offices\n\nDirect maintenance and property management depots are open Mon–Fri 8:30 AM – 5:30 PM across all 11 sub-cities (Bole, Yeka, Kirkos, Arada, Lemi Kura, Lideta, Nifas Silk-Lafto, Kolfe Keranio, Gulele, Addis Ketema, Akaki Kality). Central Head Office: Churchill Ave., City Administration Complex.`;
        fallbackSources.push("Addis Ababa Sub-City Directorate");
      }

      const fallbackMsg: CopilotMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: fallbackSources
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-msg-reset",
        role: "assistant",
        content: `Conversation reset. How can I assist you with city buildings, rental listings, maintenance requests, or resident services?`,
        timestamp: "Official Desk",
        sources: ["Addis Ababa City Administration Guidelines"]
      }
    ]);
  };

  return (
    <>
      {/* Flat Civic Trigger Button (Bottom Right) */}
      <button
        type="button"
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full sm:rounded-lg bg-[#00594C] hover:bg-[#00473D] text-white shadow-lg text-xs font-semibold focus:outline-hidden transition-all active:scale-95 cursor-pointer"
        id="fhc-floating-copilot-btn"
        aria-label="Open Civic AI Desk"
      >
        <MessageSquare className="w-4 h-4 text-white shrink-0" />
        <span>Civic AI Desk</span>
      </button>

      {/* Copilot Civic Drawer / Modal */}
      {isCopilotOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full sm:max-w-xl h-[90dvh] sm:h-[620px] bg-[var(--color-surface)] rounded-t-2xl sm:rounded-xl shadow-2xl border border-[var(--color-line)] flex flex-col overflow-hidden text-[var(--color-ink)]">
            
            {/* Header */}
            <div className="bg-[var(--color-surface)] px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-b border-[var(--color-line)] shrink-0">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--color-ink)] truncate">
                    City Property Information Desk
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#00594C] dark:text-[#00A38C] shrink-0">
                    • Civic AI Desk
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[var(--color-slate)] truncate mt-0.5">
                  Addis Ababa City Administration • Rental & Building Management
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="sr-only">Reset</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCopilotOpen(false)}
                  id="close-copilot-btn"
                  title="Close desk"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            {/* Informational Disclaimer Banner */}
            <div className="bg-[var(--color-base)] border-b border-[var(--color-line)] px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] text-[var(--color-slate)] flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00594C] shrink-0" />
              <span className="truncate">Official guidance from Addis Ababa City Administration property directives.</span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-[var(--color-base)] overscroll-contain">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[92%] sm:max-w-[88%] rounded-xl p-3 text-xs leading-relaxed border ${
                    msg.role === "user"
                      ? "bg-[#00594C] text-white border-[#00473D]"
                      : "bg-[var(--color-surface)] text-[var(--color-ink)] border-[var(--color-line)] shadow-xs"
                  }`}>
                    <p className="whitespace-pre-line break-words">{msg.content}</p>

                    {/* Reference Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--color-line)] text-[10px] sm:text-[11px] text-[var(--color-slate)]">
                        <div className="font-semibold flex items-center gap-1 mb-1 text-[var(--color-ink)]">
                          <BookOpen className="w-3 h-3 text-[#00594C]" />
                          <span>Statutory reference:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-[10px] font-mono-num">
                          {msg.sources.map((src, i) => (
                            <li key={i} className="truncate">{src}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-1 text-[10px] text-right opacity-70">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[var(--color-slate)] p-2.5 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl w-fit shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00594C]" />
                  <span className="text-[11px]">Consulting City Property guidelines & directives...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Topic Shortcuts */}
            <div className="px-3 sm:px-4 py-2 bg-[var(--color-surface)] border-t border-[var(--color-line)] overflow-x-auto flex gap-1.5 scrollbar-none">
              {suggestedQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(sq.prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap shrink-0 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-base)] hover:bg-[#E8F5F1] dark:hover:bg-slate-800 text-[var(--color-slate)] hover:text-[#00594C] border border-[var(--color-line)] transition-colors cursor-pointer"
                >
                  {sq.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 sm:p-3 bg-[var(--color-surface)] border-t border-[var(--color-line)] flex items-center gap-2"
            >
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about rental leases, maintenance, or sub-cities..."
                disabled={isLoading}
                className="flex-1 text-xs h-9 sm:h-10"
                id="copilot-query-input"
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                id="copilot-send-btn"
                className="bg-[#00594C] hover:bg-[#00473D] text-white text-xs h-9 sm:h-10 px-3 sm:px-4 cursor-pointer shrink-0 gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Submit</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
