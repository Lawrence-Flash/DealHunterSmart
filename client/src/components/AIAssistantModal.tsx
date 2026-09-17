import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { formatZAR, getStoreBrandTheme } from "@/lib/utils";
import { Product } from "@shared/schema";

interface EnrichedProduct extends Product {
  bestStore: string;
  lowestPrice: number;
  savingsText?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestedProducts?: EnrichedProduct[];
  followUps?: string[];
}

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `### 🇿🇦 Howzit! I'm your DealHunter AI Assistant\n\nI can help you find verified specials and compare prices across South Africa's leading retailers:\n\n* **Groceries & Braai:** Checkers Sixty60, Pick n Pay asap!, Woolies Dash, Spar\n* **Tech & General:** Takealot, Amazon.co.za, Makro, Incredible Connection\n* **Pharmacy & Baby:** Clicks, Dis-Chem\n\nAsk me anything like *"Where is 2L sunflower oil cheapest?"* or *"Plan a braai for 6 people under R500"*.`,
      followUps: [
        "🍗 Plan a braai under R500",
        "⚡ Wi-Fi router backup for loadshedding",
        "🌻 Cheapest 2L sunflower oil",
        "👶 Pampers Size 4 nappies specials",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Allow other components to trigger the AI modal via custom event
  useEffect(() => {
    const handleOpenAI = (e: CustomEvent<{ prompt?: string }>) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        sendMessage(e.detail.prompt);
      }
    };

    window.addEventListener("open-dealhunter-ai" as any, handleOpenAI as any);
    return () => {
      window.removeEventListener("open-dealhunter-ai" as any, handleOpenAI as any);
    };
  }, []);

  const sendMessage = async (text: string) => {
    const query = text.trim();
    if (!query || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          suggestedProducts: data.suggestedProducts,
          followUps: data.followUps,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble comparing prices right now. Please check your connection or try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group border border-emerald-400/40 cursor-pointer"
        aria-label="Open DealHunter AI Assistant"
      >
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-black group-hover:rotate-12 transition-transform">
          ⚡
        </span>
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          Ask DealHunter AI
        </span>
        <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
      </button>

      {/* Modal Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity duration-300">
          <div
            className="w-full max-w-lg bg-neutral-950 h-full flex flex-col shadow-2xl border-l border-neutral-800 animate-in slide-in-from-right duration-300 text-neutral-100"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-neutral-900 p-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xl shadow-xs">
                  🤖
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                      DealHunter AI Assistant
                    </h3>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                      SA 🇿🇦
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Real-time retail price & basket optimizer
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center text-sm transition cursor-pointer"
                aria-label="Close Assistant"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-xs font-medium"
                        : "bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-xs"
                    }`}
                  >
                    {/* Render formatted markdown-like text */}
                    <div className="space-y-2 prose prose-invert prose-sm max-w-none">
                      {msg.content.split("\n\n").map((paragraph, pIdx) => {
                        if (paragraph.startsWith("### ")) {
                          return (
                            <h4 key={pIdx} className="font-extrabold text-white text-sm mb-1">
                              {paragraph.replace("### ", "")}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith("* ")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                              {paragraph.split("\n").map((line, lIdx) => (
                                <li
                                  key={lIdx}
                                  dangerouslySetInnerHTML={{
                                    __html: line
                                      .replace("* ", "")
                                      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-emerald-400 font-bold'>$1</strong>"),
                                  }}
                                />
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p
                            key={pIdx}
                            dangerouslySetInnerHTML={{
                              __html: paragraph.replace(
                                /\*\*(.*?)\*\*/g,
                                "<strong class='text-white font-bold'>$1</strong>"
                              ),
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Embedded Product Mini-Cards */}
                    {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-neutral-800 space-y-2">
                        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                          Suggested Matches:
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.suggestedProducts.map((p) => {
                            const theme = getStoreBrandTheme(p.bestStore);
                            return (
                              <div
                                key={p.id}
                                className="flex items-center gap-3 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 hover:border-emerald-500/50 transition"
                              >
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0 opacity-90"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-white text-xs truncate">
                                    {p.name}
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span
                                      className="w-2 h-2 rounded-full shrink-0"
                                      style={{ backgroundColor: theme.accentHex }}
                                    />
                                    <span className="text-[11px] text-neutral-400 font-medium truncate">
                                      {p.bestStore}
                                    </span>
                                    <span className="font-black text-emerald-400 text-xs ml-auto">
                                      {formatZAR(p.lowestPrice)}
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  href={`/product/${p.id}`}
                                  onClick={() => setIsOpen(false)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 shadow-xs"
                                >
                                  View Deal
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.followUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => sendMessage(prompt)}
                          className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-300 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs transition cursor-pointer"
                        >
                          {prompt} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 bg-neutral-900 p-3 rounded-2xl border border-neutral-800 w-fit text-xs text-neutral-400 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <span className="font-medium text-[11px] text-neutral-300 ml-1">
                    Checking Checkers, Takealot, Makro, Amazon SA...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3.5 bg-neutral-950 border-t border-neutral-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about deals, braais, loadshedding..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Send
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-neutral-500">
                DealHunter AI compares prices with loyalty cards & on-demand delivery factored in.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}