"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  User,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Search,
  Clock,
  Sparkles,
  Bot,
} from "lucide-react";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminNavTabs } from "@/components/layout/AdminNavTabs";
import { Button } from "@/components/ui/Button";
import { AdminChatSession, AdminChatMessage } from "@/lib/chat";

interface AdminChatConsoleProps {
  initialSessions: AdminChatSession[];
}

const quickTemplates = [
  "Hello! Thanks for contacting SHAYDHA. How can our engineering team help today?",
  "Could you tell us a bit more about your project goals and preferred timeline?",
  "We specialize in high-performance Next.js and AI solutions. Would you like to schedule a 15-minute discovery call?",
  "I'm preparing a detailed technical roadmap for this. What is your approximate target budget?",
];

export const AdminChatConsole: React.FC<AdminChatConsoleProps> = ({
  initialSessions,
}) => {
  const [sessions, setSessions] = useState<AdminChatSession[]>(initialSessions);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    initialSessions[0]?.id || ""
  );
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch Sessions List
  const refreshSessions = async () => {
    try {
      const res = await fetch("/api/chat/sessions");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.sessions)) {
          setSessions(data.sessions);
        }
      }
    } catch (err) {
      console.warn("Failed to refresh chat sessions:", err);
    }
  };

  // 2. Fetch Thread Messages for selected session
  const fetchThreadMessages = async (sid: string) => {
    if (!sid) return;
    try {
      const res = await fetch(`/api/chat/messages?sessionId=${sid}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch messages for session:", err);
    }
  };

  // Switch active session
  useEffect(() => {
    if (selectedSessionId) {
      fetchThreadMessages(selectedSessionId);
      // Mark as read in local state
      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSessionId ? { ...s, unreadAdminCount: 0 } : s
        )
      );
    }
  }, [selectedSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 3. Background Polling every 2.5s for real-time updates
  useEffect(() => {
    pollTimerRef.current = setInterval(() => {
      refreshSessions();
      if (selectedSessionId) {
        fetchThreadMessages(selectedSessionId);
      }
    }, 2500);

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [selectedSessionId]);

  // 4. Send Admin Reply
  const handleSendReply = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || !selectedSessionId || isSending) return;

    setReplyText("");
    setIsSending(true);

    // Optimistic message
    const optimisticMsg: AdminChatMessage = {
      id: `temp_${Date.now()}`,
      sessionId: selectedSessionId,
      sender: "admin",
      senderName: "SHAYDHA Executive Support",
      message: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          message: text,
          adminName: "SHAYDHA Executive Support",
        }),
      });

      if (res.ok) {
        fetchThreadMessages(selectedSessionId);
        refreshSessions();
      }
    } catch (err) {
      console.error("Error sending admin reply:", err);
    } finally {
      setIsSending(false);
    }
  };

  // 5. Toggle status (active/resolved)
  const handleToggleStatus = async () => {
    if (!selectedSession) return;
    const newStatus = selectedSession.status === "active" ? "resolved" : "active";

    try {
      await fetch("/api/chat/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          status: newStatus,
        }),
      });
      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSession.id ? { ...s, status: newStatus } : s
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      s.customerName.toLowerCase().includes(q) ||
      (s.customerEmail && s.customerEmail.toLowerCase().includes(q)) ||
      (s.lastMessage && s.lastMessage.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07080B] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <AdminHeader
        onRefresh={async () => {
          setIsRefreshing(true);
          await refreshSessions();
          if (selectedSessionId) await fetchThreadMessages(selectedSessionId);
          setIsRefreshing(false);
        }}
        isRefreshing={isRefreshing}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex flex-col">
        <AdminNavTabs />

        {/* Live Chat Shell */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px] bg-white dark:bg-gradient-to-b dark:from-[#111422] dark:to-[#0A0C14] border border-slate-200/90 dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-sm">
          {/* Left Pane: Sessions List (4 cols) */}
          <div className="lg:col-span-4 border-r border-slate-200 dark:border-white/[0.08] flex flex-col h-[640px]">
            {/* Search and Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-brand-600 dark:text-cyan-400" size={18} />
                  <h2 className="font-bold text-sm text-slate-950 dark:text-white">
                    Live Conversations
                  </h2>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-cyan-300 font-bold border border-brand-500/20">
                  {sessions.length} sessions
                </span>
              </div>

              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search visitor or message..."
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Sessions Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredSessions.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No active conversations found.
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const isSelected = session.id === selectedSessionId;
                  const hasUnread = session.unreadAdminCount > 0;

                  return (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`w-full text-left p-4 transition-all flex flex-col gap-1 relative ${
                        isSelected
                          ? "bg-brand-50/80 dark:bg-brand-500/15 border-l-4 border-l-brand-600 dark:border-l-cyan-400"
                          : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                          {session.customerName}
                          {hasUnread && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {new Date(session.lastMessageAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {session.customerEmail && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {session.customerEmail}
                        </span>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">
                        {session.lastMessage || "No messages yet"}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                            session.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                          }`}
                        >
                          {session.status}
                        </span>
                        {hasUnread && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-mono">
                            {session.unreadAdminCount} new
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Pane: Active Chat Thread (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-[640px]">
            {selectedSession ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                          {selectedSession.customerName}
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border ${
                            selectedSession.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                          }`}
                        >
                          {selectedSession.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                        {selectedSession.customerEmail && (
                          <span className="flex items-center gap-1">
                            <Mail size={12} /> {selectedSession.customerEmail}
                          </span>
                        )}
                        {selectedSession.customerPhone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {selectedSession.customerPhone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedSession.customerPhone && (
                      <Button
                        href={`https://wa.me/${selectedSession.customerPhone.replace(/\D/g, "")}`}
                        external
                        variant="whatsapp"
                        size="sm"
                        className="text-xs h-8 px-2.5"
                      >
                        WhatsApp
                      </Button>
                    )}
                    <button
                      onClick={handleToggleStatus}
                      className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {selectedSession.status === "active" ? "Mark Resolved" : "Reopen"}
                    </button>
                  </div>
                </div>

                {/* Messages Thread Feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40 dark:bg-transparent">
                  {messages.map((msg) => {
                    const isAdmin = msg.sender === "admin";

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isAdmin ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            isAdmin ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm ${
                              isAdmin
                                ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-br-none"
                                : "bg-white dark:bg-[#161A26] border border-slate-200 dark:border-white/[0.07] text-slate-900 dark:text-slate-100 rounded-bl-none"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-bold block mb-0.5 ${
                                isAdmin
                                  ? "text-cyan-200"
                                  : "text-brand-600 dark:text-cyan-400"
                              }`}
                            >
                              {msg.senderName || (isAdmin ? "SHAYDHA Team" : "Customer")}
                            </span>
                            <p className="whitespace-pre-line text-xs sm:text-sm">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Reply Templates */}
                <div className="px-4 py-2 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0">
                    Quick Reply:
                  </span>
                  {quickTemplates.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendReply(t)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] hover:border-brand-500 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-cyan-300 shrink-0 transition-all text-left"
                    >
                      {t.substring(0, 32)}...
                    </button>
                  ))}
                </div>

                {/* Reply Composer Input */}
                <div className="p-4 bg-white dark:bg-[#0A0C13] border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply(replyText);
                      }
                    }}
                    placeholder="Type a real-time reply to the customer (Press Enter to send)..."
                    className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#141824] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder:text-slate-400"
                  />
                  <Button
                    onClick={() => handleSendReply(replyText)}
                    disabled={!replyText.trim() || isSending}
                    isLoading={isSending}
                    variant="primary"
                    size="md"
                    className="shrink-0 h-11 px-5"
                  >
                    <Send size={15} className="mr-1.5" /> Send Reply
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <MessageSquare size={36} className="mb-3 opacity-40 text-brand-500" />
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Select a Conversation
                </h4>
                <p className="text-xs max-w-sm mt-1">
                  Choose an active visitor session on the left to start live two-way messaging.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
