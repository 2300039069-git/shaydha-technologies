"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Bot,
  Zap,
  HelpCircle,
  FileText,
  Building2,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";

interface BotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isVerificationBadge?: boolean;
  leadId?: string;
}

const FAQ_KNOWLEDGE_BASE: Record<
  string,
  {
    answer: string;
    followUpOptions?: string[];
  }
> = {
  reply_time: {
    answer:
      "⏱ **How Fast Will Engineering Reply?**\n\nOur engineering directors review all project specifications within **2 hours** during business hours (Mon-Sat, 9 AM - 8 PM IST) and within **12 hours** worldwide.\n\nOnce your scope is verified, a senior technical lead will contact you directly via WhatsApp or email with an initial architecture roadmap.",
    followUpOptions: ["Submit my project details", "What services do you provide?", "How does pricing work?"],
  },
  services: {
    answer:
      "💡 **Our Core Services & Tech Stack**:\n\n• **Enterprise Web Apps**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, high-scale microservices.\n• **Mobile Engineering**: Native & cross-platform React Native / Flutter apps.\n• **AI & LLM Solutions**: Fine-tuned models, RAG document pipelines, custom AI agents, automated analytics.\n• **Cloud Architecture**: Resilient AWS / GCP pipelines, SOC2-ready compliance.",
    followUpOptions: ["Submit my project details", "How fast will engineering reply?", "How does pricing work?"],
  },
  pricing_ip: {
    answer:
      "💰 **Pricing, IP & Security**:\n\n• **100% Client Code Ownership**: You own all source code, design assets, and intellectual property.\n• **Strict Mutual NDA**: We execute a legally binding NDA prior to deep technical architecture.\n• **Flexible Engagements**: Fixed-price MVP sprints (4–8 weeks), dedicated engineering pods, or agile time & materials.",
    followUpOptions: ["Submit my project details", "How fast will engineering reply?", "Our delivery process"],
  },
  demo: {
    answer:
      "✨ **100% Free Live Architecture & Product Demo**:\n\n• **What You Get**: A 30-minute interactive walkthrough of our production codebases, live prototype demonstrations, and a technical feasibility assessment tailored to your initiative.\n• **Itemized Roadmap**: Itemized milestone plan & cost estimate delivered within **24 hours**.\n• **Zero Commitment**: 100% complimentary under mutual non-disclosure (NDA).",
    followUpOptions: ["Submit my project details", "How fast will engineering reply?", "How does pricing work?"],
  },
  process: {
    answer:
      "🚀 **5-Step Delivery Pipeline**:\n\n1. **Technical Discovery & Architecture Blueprint** (within 48h)\n2. **Interactive Figma UI/UX Prototype**\n3. **Agile 2-Week Sprints** with continuous staging deployments\n4. **Security Audit & Automated QA Testing**\n5. **Production Launch & 90-Day Post-Launch Warranty**",
    followUpOptions: ["Submit my project details", "How fast will engineering reply?", "What services do you provide?"],
  },
};

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: "msg-welcome-1",
      sender: "bot",
      text: "Hello! 👋 Welcome to **SHAYDHA TECHNOLOGIES**.\n\nI am your **Virtual Engineering Concierge**. I can clarify any doubts about our capabilities, turnaround times, and pricing—or log your project application for our engineering team to review.",
      timestamp: "Just now",
    },
    {
      id: "msg-welcome-2",
      sender: "bot",
      text: "⚡ **Guaranteed Response**: Our engineering team reviews every application within **2 hours**. Once verified, our technical lead will contact you directly.",
      timestamp: "Just now",
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Application form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("Custom Software / AI Solution");
  const [projectMessage, setProjectMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isBotTyping, showApplicationForm]);

  // Handle Quick FAQ Option Click
  const handleSelectFaq = (key: string, label: string) => {
    // Add user query
    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: label,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);

      if (key === "apply" || label.toLowerCase().includes("submit")) {
        setShowApplicationForm(true);
        const botReply: BotMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Excellent! Please fill in your project details below. Our engineering leads will verify your specifications and reach out within **2 hours**.",
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        const faqData = FAQ_KNOWLEDGE_BASE[key];
        if (faqData) {
          const botReply: BotMessage = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: faqData.answer,
            timestamp: "Just now",
          };
          setMessages((prev) => [...prev, botReply]);
        }
      }
    }, 450);
  };

  // Handle Free-Form Text Question
  const handleSendCustomQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isBotTyping) return;

    const question = userInput.trim();
    setUserInput("");

    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: question,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);

    const qLower = question.toLowerCase();

    // Check for application intent
    if (
      qLower.includes("hire") ||
      qLower.includes("start") ||
      qLower.includes("quote") ||
      qLower.includes("build") ||
      qLower.includes("apply") ||
      qLower.includes("contact me")
    ) {
      setTimeout(() => {
        setIsBotTyping(false);
        setShowApplicationForm(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: "I'd be glad to log your project for engineering review! Please share your details in the form below. Once verified, our technical lead will contact you within **2 hours**.",
            timestamp: "Just now",
          },
        ]);
      }, 500);
      return;
    }

    try {
      const res = await fetch(SITE_CONFIG.api.getUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          isQuickDoubt: true,
        }),
      });

      const data = await res.json();
      setIsBotTyping(false);

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: data.reply,
            timestamp: "Just now",
          },
        ]);
      }
    } catch (err) {
      setIsBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "⏱ **Our Turnaround SLA**: Our engineering team verifies all applications within **2 hours**. If your request is urgent, you can also reach us directly on WhatsApp.",
          timestamp: "Just now",
        },
      ]);
    }
  };

  // Handle Project Application Form Submit
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !email.trim()) {
      setFormError("Please provide both your name and work email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(SITE_CONFIG.api.getUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          projectType,
          message: projectMessage.trim() || `Automated bot project application for ${projectType}`,
          conversationHistory: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSubmittedLeadId(data.leadId || "VERIFIED-LEAD");
      setShowApplicationForm(false);

      // Add confirmation bot message with verification badge
      const confirmationMsg: BotMessage = {
        id: `bot-conf-${Date.now()}`,
        sender: "bot",
        text: `🎉 **Application Received & Logged Successfully!**\n\n• **Reference ID**: \`${data.leadId}\`\n• **Review Status**: Transmitted to Engineering Directors\n• **Response Guarantee**: Once verified, our senior technical lead will contact you via WhatsApp or Email (**${email}**) within **2 hours**.\n\nThank you for choosing SHAYDHA TECHNOLOGIES!`,
        timestamp: "Just now",
        isVerificationBadge: true,
        leadId: data.leadId,
      };

      setMessages((prev) => [...prev, confirmationMsg]);
    } catch (err: any) {
      setFormError(err.message || "Network error. Please retry or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_10px_25px_-5px_rgba(99,102,241,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_14px_30px_-5px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 select-none"
            aria-label="Engineering Concierge Bot"
          >
            <div className="relative">
              <LogoMark size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#090A0F] animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold tracking-wide leading-tight flex items-center gap-1.5">
                SHAYDHA Bot <Sparkles size={13} className="text-cyan-200" />
              </span>
              <span className="text-[10px] text-cyan-200 font-mono">
                Clarify Doubts • 2h SLA
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Expandable Bot Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[620px] max-h-[88vh] bg-white dark:bg-[#0E1119] border border-slate-200/90 dark:border-white/[0.12] rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.95)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
          {/* Top Hairline Shine */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/60 dark:via-cyan-400/60 to-transparent z-20" />

          {/* Header */}
          <div className="bg-slate-100/90 dark:bg-gradient-to-r dark:from-[#141824] dark:to-[#0E1018] p-4 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-surface-100 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1.5 shadow-inner">
                  <LogoMark size={24} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0E1119]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white leading-none flex items-center gap-1.5">
                  SHAYDHA Concierge
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-600 dark:text-cyan-300 font-bold border border-brand-500/20">
                    AI Bot
                  </span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                  <Clock size={11} /> 2-Hour Review Guarantee
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors"
              aria-label="Close bot window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm bg-slate-50/50 dark:bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex gap-2.5 max-w-[88%] ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5 text-brand-600 dark:text-cyan-400">
                      <Bot size={14} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-brand-600 text-white rounded-br-none"
                        : msg.isVerificationBadge
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/30 text-slate-900 dark:text-emerald-100 rounded-bl-none"
                        : "bg-white dark:bg-[#161A26] border border-slate-200 dark:border-white/[0.07] text-slate-800 dark:text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Bot Typing Indicator */}
            {isBotTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <Bot size={14} className="animate-spin text-brand-500" />
                <span>Concierge is typing...</span>
              </div>
            )}

            {/* Quick Doubt Buttons */}
            {!showApplicationForm && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Instant Answers & Project Actions:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    onClick={() =>
                      handleSelectFaq("demo", "✨ Free Live Demo Available (How does it work?)")
                    }
                    className="flex items-center gap-2 text-xs bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-cyan-500/15 hover:from-amber-500/25 hover:to-cyan-500/25 border border-amber-400/40 text-slate-900 dark:text-amber-300 px-3 py-2 rounded-xl transition-all text-left shadow-sm font-bold"
                  >
                    <Sparkles size={14} className="text-amber-400 shrink-0 animate-pulse" />
                    <span>Free Live Demo Available (Book 30-Min Demo)</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectFaq("reply_time", "⏱ How fast will engineering reply?")
                    }
                    className="flex items-center gap-2 text-xs bg-white hover:bg-brand-50/80 border border-slate-200 hover:border-brand-400 text-slate-800 hover:text-brand-700 dark:bg-[#151926] dark:hover:bg-brand-600/20 dark:border-white/[0.08] dark:hover:border-cyan-400/50 dark:text-slate-300 dark:hover:text-white px-3 py-2 rounded-xl transition-all text-left shadow-sm"
                  >
                    <Clock size={13} className="text-amber-500 shrink-0" />
                    <span>How fast will engineering reply?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectFaq("services", "💡 What services & tech stack do you build?")
                    }
                    className="flex items-center gap-2 text-xs bg-white hover:bg-brand-50/80 border border-slate-200 hover:border-brand-400 text-slate-800 hover:text-brand-700 dark:bg-[#151926] dark:hover:bg-brand-600/20 dark:border-white/[0.08] dark:hover:border-cyan-400/50 dark:text-slate-300 dark:hover:text-white px-3 py-2 rounded-xl transition-all text-left shadow-sm"
                  >
                    <Sparkles size={13} className="text-brand-500 shrink-0" />
                    <span>What services & technologies do you build?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectFaq("pricing_ip", "💰 How does pricing, NDA & IP ownership work?")
                    }
                    className="flex items-center gap-2 text-xs bg-white hover:bg-brand-50/80 border border-slate-200 hover:border-brand-400 text-slate-800 hover:text-brand-700 dark:bg-[#151926] dark:hover:bg-brand-600/20 dark:border-white/[0.08] dark:hover:border-cyan-400/50 dark:text-slate-300 dark:hover:text-white px-3 py-2 rounded-xl transition-all text-left shadow-sm"
                  >
                    <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                    <span>How does pricing, NDA & IP ownership work?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectFaq("process", "🚀 What is your 5-step engineering process?")
                    }
                    className="flex items-center gap-2 text-xs bg-white hover:bg-brand-50/80 border border-slate-200 hover:border-brand-400 text-slate-800 hover:text-brand-700 dark:bg-[#151926] dark:hover:bg-brand-600/20 dark:border-white/[0.08] dark:hover:border-cyan-400/50 dark:text-slate-300 dark:hover:text-white px-3 py-2 rounded-xl transition-all text-left shadow-sm"
                  >
                    <Zap size={13} className="text-indigo-500 shrink-0" />
                    <span>What is your 5-step delivery process?</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectFaq("apply", "📝 Submit a Project Application for 2h Review")
                    }
                    className="flex items-center gap-2 text-xs bg-gradient-to-r from-brand-600 to-indigo-600 text-white px-3 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-95 transition-all text-left mt-1"
                  >
                    <FileText size={14} className="shrink-0" />
                    <span>Submit Project Details (2-Hour Review) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Embedded Project Application Form */}
            {showApplicationForm && (
              <form
                onSubmit={handleApplicationSubmit}
                className="bg-white dark:bg-[#131724] border border-brand-500/40 rounded-2xl p-4 space-y-3 shadow-md my-2"
              >
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/10">
                  <span className="text-xs font-bold font-mono uppercase text-brand-600 dark:text-cyan-300 flex items-center gap-1.5">
                    <FileText size={14} />
                    Project Scope & Verification Form
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Once submitted, our engineering directors will review your scope and a senior lead will reach out to you within **2 hours**.
                </p>

                {formError && (
                  <p className="text-[11px] text-red-600 bg-red-50 dark:bg-red-950/40 p-2 rounded border border-red-200 dark:border-red-500/20">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand R."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anand@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 75698 02300"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                      Company / Startup
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Enterprise Web Application">Enterprise Web Application (Next.js)</option>
                    <option value="Custom Software / AI Solution">Custom Software / AI Solution</option>
                    <option value="Mobile Application">Mobile Application (iOS & Android)</option>
                    <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                    <option value="E-Commerce Platform">High-Conversion E-Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                    Brief Requirements / Goal
                  </label>
                  <textarea
                    rows={2}
                    value={projectMessage}
                    onChange={(e) => setProjectMessage(e.target.value)}
                    placeholder="Tell us what you're building, target timeline, or any specific requirements..."
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A0C13] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  className="w-full justify-center text-xs py-2 font-bold"
                >
                  Submit for 2-Hour Verification →
                </Button>
              </form>
            )}

            {/* Post-Submission Status Confirmation */}
            {submittedLeadId && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 rounded-2xl p-4 text-center space-y-2.5 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Application Logged in System
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Visible to SHAYDHA Engineering Operations. Expect contact within 2 hours.
                </p>
                <Button
                  href={SITE_CONFIG.whatsapp.getUrl(`Hi SHAYDHA, I just submitted project application ${submittedLeadId}`)}
                  external
                  variant="whatsapp"
                  size="sm"
                  className="w-full justify-center text-xs mt-1"
                >
                  Need Immediate Discussion? WhatsApp Lead
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Custom Question Input */}
          <form
            onSubmit={handleSendCustomQuestion}
            className="p-3 bg-white dark:bg-[#0A0C13] border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-2 relative z-10"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask bot any doubt (e.g. turnaround time, tech stack)..."
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#141824] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!userInput.trim() || isBotTyping}
              className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white transition-all shrink-0"
              aria-label="Ask concierge bot"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
