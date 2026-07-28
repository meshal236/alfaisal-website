"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "@/lib/language-context";

type Tab = "embed" | "engine" | "directory";

const COPY = {
  ar: {
    eyebrow: "AI TOOLS",
    heading: "أدوات ومحرك الذكاء الاصطناعي",
    tabs: { embed: "أدوات مدمجة", engine: "محرك المحادثة", directory: "دليل الخدمات" },
  },
  en: {
    eyebrow: "AI TOOLS",
    heading: "AI tools & chat engine",
    tabs: { embed: "Embedded tools", engine: "Chat engine", directory: "Service directory" },
  },
};

/* ── Tab 1: embedded small tools (iframe, no new tab) ─────────── */
const EMBED_TOOLS = [
  { name: "sur.pollinations.ai", url: "https://sur.pollinations.ai/" },
  { name: "umint-ai.hf.space", url: "https://umint-ai.hf.space/" },
  { name: "mirexa.vercel.app", url: "https://mirexa.vercel.app/" },
  { name: "freegpt.es", url: "https://freegpt.es/" },
  { name: "heck.ai", url: "https://heck.ai" },
];

const EMBED_COPY = {
  ar: {
    intro: "أدوات صغيرة تفتح مباشرة داخل هذي الصفحة، بدون تبويب جديد — اختر أداة من القائمة.",
    note: "لو ظهر الإطار فارغًا، فهذا يعني أن الخدمة غيّرت سياستها ومنعت التضمين من طرفها — جرّب أداة ثانية.",
  },
  en: {
    intro: "Small tools that load directly inside this page, no new tab — pick one from the list.",
    note: "If the frame appears blank, that service changed its policy and blocked embedding on its end — try another tool.",
  },
};

function EmbedPanel({ lang }: { lang: "ar" | "en" }) {
  const [tool, setTool] = useState(EMBED_TOOLS[0]);
  const t = EMBED_COPY[lang];
  return (
    <div>
      <p className="tools-intro">{t.intro}</p>
      <select
        className="embed-select"
        value={tool.url}
        onChange={(e) => setTool(EMBED_TOOLS.find((x) => x.url === e.target.value)!)}
      >
        {EMBED_TOOLS.map((x) => (
          <option key={x.url} value={x.url}>
            {x.name}
          </option>
        ))}
      </select>
      <div className="embed-frame-wrap">
        <iframe key={tool.url} src={tool.url} title={tool.name} />
      </div>
      <p className="embed-note">{t.note}</p>
    </div>
  );
}

/* ── Tab 2: real chat engine (Vercel AI Gateway) ──────────────── */
const MODELS = [
  { id: "deepseek/deepseek-v4-flash", label: "DeepSeek V4 Flash" },
  { id: "alibaba/qwen3.6-27b", label: "Qwen 3.6 27B" },
  { id: "google/gemma-4-31b-it", label: "Gemma 4 31B" },
  { id: "xiaomi/mimo-v2.5", label: "MiMo 2.5" },
  { id: "zai/glm-5.1", label: "GLM 5.1" },
  { id: "moonshotai/kimi-k2.6", label: "Kimi K2.6" },
];

const ENGINE_COPY = {
  ar: {
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

function EnginePanel({ lang }: { lang: "ar" | "en" }) {
  const t = ENGINE_COPY[lang];
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
    <div className="chat-shell" style={{ padding: 0, minHeight: 560 }}>
      <div className="chat-top">
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
    </div>
  );
}

/* ── Tab 3: directory of strong services (new tab links) ──────── */
type DirTool = { name: string; url: string; models: string; tipAr: string; tipEn: string };
type DirCategory = { key: string; ar: string; en: string; tag: string; tools: DirTool[] };

const DIRECTORY: DirCategory[] = [
  {
    key: "chat",
    ar: "واجهات محادثة",
    en: "Chat interfaces",
    tag: "CHAT",
    tools: [
      { name: "lmarena.ai", url: "https://lmarena.ai/", models: "40+ نموذج", tipAr: "قارن ردود عدة نماذج جنبًا إلى جنب وصوّت للأفضل.", tipEn: "Compare responses from multiple models side by side and vote." },
      { name: "meta.ai", url: "https://www.meta.ai", models: "Llama 4", tipAr: "افتح الرابط وابدأ الدردشة فورًا، بدون تسجيل.", tipEn: "Open the link and start chatting instantly, no signup." },
      { name: "phind.com", url: "https://www.phind.com", models: "Phind-70B", tipAr: "محرك بحث ودردشة مخصص للمبرمجين وأسئلة الكود.", tipEn: "A search + chat engine built for developers and code questions." },
      { name: "groq.com", url: "https://groq.com", models: "15+ نموذج", tipAr: "دردشة فائقة السرعة — اختر نموذجًا من القائمة وابدأ.", tipEn: "Ultra-fast chat — pick a model from the list and go." },
      { name: "chatgpt.com", url: "https://chatgpt.com", models: "GPT-4o (محدود)", tipAr: "افتح الرابط واكتب مباشرة، بضع رسائل GPT-4o مجانية.", tipEn: "Open and type directly — a handful of free GPT-4o messages." },
      { name: "chat.mistral.ai", url: "https://chat.mistral.ai", models: "Le Chat", tipAr: "10 رسائل مجانية يوميًا، تتجدد كل 24 ساعة.", tipEn: "10 free messages a day, resets every 24 hours." },
      { name: "perplexity.ai", url: "https://perplexity.ai", models: "GPT-4.1 · Claude 4", tipAr: "اسأل سؤالك ويرجع لك جواب مع مصادر وروابط حقيقية.", tipEn: "Ask a question and get an answer with real cited sources." },
      { name: "grok.com", url: "https://grok.com/chat", models: "Grok 3", tipAr: "3 رسائل مجانية تقريبًا كل ساعتين.", tipEn: "About 3 free messages every 2 hours." },
      { name: "pi.ai", url: "https://pi.ai", models: "Inflection-2.5", tipAr: "محادثة شخصية أقرب لأسلوب الإنسان، بلا حدود واضحة.", tipEn: "A personal, human-like conversation style, no clear cap." },
      { name: "kimi.com", url: "https://kimi.com", models: "K2 · K1.5", tipAr: "دردشة قوية تدعم العربي والإنجليزي بشكل جيد.", tipEn: "A strong chat model that handles Arabic and English well." },
      { name: "gemini.google.com", url: "https://gemini.google.com", models: "Gemini 2.5 Flash", tipAr: "سجّل دخول بحساب Google واستخدم بضع محادثات يوميًا.", tipEn: "Sign in with a Google account for a few daily chats." },
      { name: "copilot.microsoft.com", url: "https://copilot.microsoft.com", models: "GPT-5", tipAr: "دردشة شبه غير محدودة، وصورة واحدة يوميًا مجانًا.", tipEn: "Near-unlimited chat, plus one free image per day." },
      { name: "claude.ai", url: "https://claude.ai", models: "Claude", tipAr: "دردشة عالية الجودة بالكتابة والتحليل، برسائل مجانية يومية.", tipEn: "High-quality writing and analysis chat, with a daily free message quota." },
      { name: "huggingface.co/chat", url: "https://huggingface.co/chat", models: "عدة نماذج مفتوحة", tipAr: "منصة HuggingChat — نماذج مفتوحة المصدر متعددة، مجانية بلا تسجيل معقّد.", tipEn: "HuggingChat — several open-source models, free with a simple signup." },
      { name: "poe.com", url: "https://poe.com", models: "Claude · GPT · Llama", tipAr: "منصة واحدة تجمع أشهر النماذج، وتبدّل بينها بضغطة زر.", tipEn: "One platform bundling the most popular models — switch between them instantly." },
      { name: "chat.deepseek.com", url: "https://chat.deepseek.com", models: "DeepSeek V3 · R1", tipAr: "دردشة قوية في الاستدلال والبرمجة، مجانية بالكامل تقريبًا.", tipEn: "Strong at reasoning and coding, free with essentially no real cap." },
      { name: "you.com", url: "https://you.com", models: "بحث + دردشة", tipAr: "يدمج نتائج بحث حية مع إجابة الذكاء الاصطناعي في مكان واحد.", tipEn: "Combines live search results with an AI answer in one place." },
    ],
  },
  {
    key: "media",
    ar: "توليد الصور والفيديو",
    en: "Media generation",
    tag: "MEDIA",
    tools: [
      { name: "runwayml.com", url: "https://runwayml.com/", models: "Gen-4", tipAr: "اكتب وصف المشهد وحوّله مباشرة لصورة أو فيديو.", tipEn: "Describe a scene and turn it directly into an image or video." },
      { name: "pollinations.ai", url: "https://pollinations.ai/", models: "عدة نماذج صور", tipAr: "رابط واحد يولّد صورة فورية بدون أي تسجيل دخول.", tipEn: "A single link generates an image instantly, no login." },
      { name: "vheer.com", url: "https://vheer.com/", models: "نموذج خاص", tipAr: "اكتب الوصف واحصل على صورة بدون علامة مائية.", tipEn: "Type a prompt and get an image with no watermark." },
      { name: "perchance.org", url: "https://perchance.org/wtr90dexsn", models: "غير محدود", tipAr: "مولّد صور بسيط جدًا وسريع بدون إنشاء حساب.", tipEn: "A very simple, fast image generator, no account needed." },
      { name: "fotor.com", url: "https://www.fotor.com/", models: "تحرير بالذكاء الاصطناعي", tipAr: "ارفع صورة موجودة ودع الذكاء الاصطناعي يحررها لك.", tipEn: "Upload an existing photo and let the AI edit it for you." },
      { name: "leonardo.ai", url: "https://leonardo.ai", models: "عدة نماذج", tipAr: "أرصدة يومية مجانية لتوليد صور بجودة احترافية.", tipEn: "Daily free credits for generating professional-quality images." },
      { name: "ideogram.ai", url: "https://ideogram.ai", models: "Ideogram", tipAr: "الأدق بين أدوات توليد الصور في كتابة نص واضح داخل الصورة.", tipEn: "Among the most accurate at rendering clean readable text inside images." },
      { name: "craiyon.com", url: "https://www.craiyon.com", models: "نموذج مجاني", tipAr: "توليد صور فوري بدون أي تسجيل دخول إطلاقًا.", tipEn: "Instant image generation with absolutely no login required." },
      { name: "bing.com/create", url: "https://www.bing.com/images/create", models: "DALL-E 3", tipAr: "سجّل بحساب Microsoft مجانًا وولّد صورًا بجودة DALL-E 3.", tipEn: "Free Microsoft account sign-in for DALL-E 3 quality image generation." },
    ],
  },
  {
    key: "voice",
    ar: "الصوت والموسيقى",
    en: "Voice & music",
    tag: "VOICE",
    tools: [
      { name: "ttsmp3.com", url: "https://ttsmp3.com", models: "Google/Microsoft TTS", tipAr: "الصق النص، اختر صوتًا، وحمّل الملف الصوتي مباشرة.", tipEn: "Paste text, pick a voice, and download the audio file." },
      { name: "voicegenerator.io", url: "https://voicegenerator.io", models: "أصوات متعددة", tipAr: "اكتب النص واختر من مكتبة أصوات جاهزة.", tipEn: "Type your text and choose from a ready voice library." },
      { name: "fakeyou.com", url: "https://fakeyou.com", models: "أصوات مجتمعية", tipAr: "اختر صوتًا من المكتبة وحوّل نصك إليه (قد يوجد انتظار).", tipEn: "Pick a voice from the library and convert your text (queue may apply)." },
      { name: "elevenlabs.io", url: "https://elevenlabs.io", models: "أشهر أداة TTS", tipAr: "أصوات واقعية جدًا شبه بشرية، بحصة شهرية مجانية.", tipEn: "The best-known TTS tool, extremely natural voices, with a free monthly quota." },
      { name: "suno.com", url: "https://suno.com", models: "توليد أغاني كاملة", tipAr: "اكتب وصف الأغنية ويولّدها كاملة بموسيقى وغناء حقيقي.", tipEn: "Describe a song and it generates a complete track with real singing and music." },
      { name: "udio.com", url: "https://udio.com", models: "توليد موسيقى", tipAr: "بديل قوي لـ Suno بجودة صوتية عالية، مجاني للتجربة.", tipEn: "A strong Suno alternative with high audio quality, free to try." },
    ],
  },
  {
    key: "dev",
    ar: "واجهات ومنصات المطورين",
    en: "Developer APIs & platforms",
    tag: "DEV",
    tools: [
      { name: "uncloseai.com", url: "https://uncloseai.com/", models: "Hermes · Qwen 3 Coder · TTS", tipAr: "واجهة برمجية متوافقة مع OpenAI، بدون أي تسجيل.", tipEn: "An OpenAI-compatible API, no signup required at all." },
      { name: "ollama.com", url: "https://ollama.com", models: "عشرات النماذج", tipAr: "شغّل النماذج مجانًا محليًا على جهازك أو عبر السحابة.", tipEn: "Run models free, locally on your machine or in the cloud." },
      { name: "g4f.dev", url: "https://g4f.dev/docs/ready_to_use.html", models: "عدة مزودين موحّدين", tipAr: "واجهة برمجية واحدة توحّد الوصول لعدة مزودي نماذج مجانًا.", tipEn: "One unified API that gives free access to several model providers." },
      { name: "openrouter.ai", url: "https://openrouter.ai", models: "عشرات النماذج المجانية", tipAr: "مفتاح واحد يوصلك لعشرات النماذج، وبعضها مجاني بالكامل.", tipEn: "One key gives access to dozens of models, several of them fully free." },
      { name: "huggingface.co", url: "https://huggingface.co", models: "آلاف النماذج المفتوحة", tipAr: "استضافة وتجربة نماذج مفتوحة المصدر مجانًا عبر Spaces.", tipEn: "Host and try open-source models for free through Spaces." },
      { name: "together.ai", url: "https://together.ai", models: "نماذج مفتوحة سريعة", tipAr: "رصيد تجريبي مجاني عند التسجيل لتشغيل نماذج مفتوحة بسرعة عالية.", tipEn: "A free trial credit on signup to run open models at high speed." },
      { name: "replit.com", url: "https://replit.com", models: "Replit Agent", tipAr: "محرر برمجة سحابي بوكيل ذكاء اصطناعي يبني تطبيقات كاملة من وصف نصي.", tipEn: "A cloud code editor with an AI agent that builds full apps from a text prompt." },
      { name: "lovable.dev", url: "https://lovable.dev", models: "AI App Builder", tipAr: "اكتب وصف تطبيقك ويبنيه لك كاملًا (واجهة وربط قاعدة بيانات) خلال دقائق.", tipEn: "Describe your app and it builds it fully — UI and database wiring — in minutes." },
    ],
  },
];

const DIR_COPY = {
  ar: {
    intro: "الخدمات القوية والمعروفة — تفتح بتبويب جديد لأنها تمنع التضمين داخل صفحات أخرى.",
    note: "الخدمات ومزودوها خارج نطاق تحكمي، وقد تتغير حدودها أو تتوقف دون إشعار — القائمة مبنية على مستودع zebbern/no-cost-ai مفتوح المصدر.",
    source: "المصدر: zebbern/no-cost-ai",
  },
  en: {
    intro: "The strong, well-known services — they open in a new tab because they block embedding in other pages.",
    note: "These services and their providers are outside my control, and limits may change or stop without notice — list based on the open-source zebbern/no-cost-ai repository.",
    source: "Source: zebbern/no-cost-ai",
  },
};

function DirectoryPanel({ lang }: { lang: "ar" | "en" }) {
  const t = DIR_COPY[lang];
  return (
    <div>
      <p className="tools-intro">{t.intro}</p>
      <p className="tools-note">
        {t.note}{" "}
        <a href="https://github.com/zebbern/no-cost-ai" target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }}>
          {t.source}
        </a>
      </p>
      {DIRECTORY.map((cat) => (
        <div className="tool-category" key={cat.key}>
          <div className="tool-category-head">
            <span className="mono">{cat.tag}</span>
            <h3>{lang === "ar" ? cat.ar : cat.en}</h3>
          </div>
          <div className="tool-grid">
            {cat.tools.map((tool) => (
              <a key={tool.url} href={tool.url} target="_blank" rel="noreferrer" className="tool-card">
                <div className="tool-card-name">
                  {tool.name}
                  <span className="arrow">↗</span>
                </div>
                <div className="tool-card-models">{tool.models}</div>
                <div className="tool-card-tip">{lang === "ar" ? tool.tipAr : tool.tipEn}</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page: 3 tabs ──────────────────────────────────────────────── */
export default function ChatPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [tab, setTab] = useState<Tab>("embed");

  return (
    <main className="section">
      <div className="section-head">
        <span className="mono">{t.eyebrow}</span>
        <h2>{t.heading}</h2>
      </div>

      <div className="chat-tabs">
        <button className={`chat-tab${tab === "embed" ? " active" : ""}`} onClick={() => setTab("embed")}>
          {t.tabs.embed}
        </button>
        <button className={`chat-tab${tab === "engine" ? " active" : ""}`} onClick={() => setTab("engine")}>
          {t.tabs.engine}
        </button>
        <button className={`chat-tab${tab === "directory" ? " active" : ""}`} onClick={() => setTab("directory")}>
          {t.tabs.directory}
        </button>
      </div>

      {tab === "embed" && <EmbedPanel lang={lang} />}
      {tab === "engine" && <EnginePanel lang={lang} />}
      {tab === "directory" && <DirectoryPanel lang={lang} />}
    </main>
  );
}
