"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "@/lib/language-context";

const MODELS = [
  { id: "deepseek/deepseek-v4-flash", label: "DeepSeek V4 Flash" },
  { id: "alibaba/qwen3.6-27b", label: "Qwen 3.6 27B" },
  { id: "google/gemma-4-31b-it", label: "Gemma 4 31B" },
  { id: "xiaomi/mimo-v2.5", label: "MiMo 2.5" },
  { id: "zai/glm-5.1", label: "GLM 5.1" },
  { id: "moonshotai/kimi-k2.6", label: "Kimi K2.6" },
];

const COPY = {
  ar: {
    heading: "محرك المحادثة",
    modelAria: "اختيار النموذج",
    emptyGlyph: "م",
    emptyText: "اسأل عن أي شيء — بنية تحتية، شبكات، ذكاء اصطناعي، أو أي موضوع آخر.",
    error: "حدث خطأ في الاتصال — جرّب نموذجًا آخر من القائمة أو أعد المحاولة.",
    placeholder: "اكتب رسالتك…",
    send: "إرسال",
    you: "YOU",
    ai: "AI",
  },
  en: {
    heading: "Chat",
    modelAria: "Select model",
    emptyGlyph: "M",
    emptyText: "Ask about anything — infrastructure, networking, AI, or any other topic.",
    error: "Something went wrong connecting to the model — try another one from the list or retry.",
    placeholder: "Type your message…",
    send: "Send",
    you: "YOU",
    ai: "AI",
  },
};

export default function ChatPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [model, setModel] = useState(MODELS[0].id);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const submit = () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    sendMessage({ text }, { body: { model } });
  };

  return (
    <main className="chat-shell">
      <div className="chat-top">
        <h1>{t.heading}</h1>
        <select
          className="model-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          aria-label={t.modelAria}
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && !error && (
          <div className="chat-empty">
            <span className="glyph">{t.emptyGlyph}</span>
            <p>{t.emptyText}</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.role === "user" ? "user" : "ai"}`}>
            <span className="msg-role">{m.role === "user" ? t.you : t.ai}</span>
            {m.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null
            )}
          </div>
        ))}
        {error && <div className="chat-error">{t.error}</div>}
      </div>

      <div className="chat-form">
        <textarea
          className="chat-input"
          rows={1}
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button className="chat-send" onClick={submit} disabled={busy || !input.trim()}>
          {busy ? "…" : t.send}
        </button>
      </div>
    </main>
  );
}
