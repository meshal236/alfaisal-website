"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "@/lib/language-context";

type Tab = "engine" | "embed" | "directory";

const COPY = {
  ar: {
    eyebrow: "AI HUB",
    heading: "مركز الذكاء الاصطناعي",
    sub: "محرك محادثة خاص بالموقع، أدوات تعمل داخل الصفحة، ودليل مختار لأفضل الخدمات المجانية.",
    tabs: { engine: "محرك المحادثة", embed: "أدوات مدمجة", directory: "دليل الخدمات" },
  },
  en: {
    eyebrow: "AI HUB",
    heading: "AI Hub",
    sub: "A site-native chat engine, tools that run inside the page, and a curated directory of the best free services.",
    tabs: { engine: "Chat engine", embed: "Embedded tools", directory: "Directory" },
  },
};

/* ── Embedded tools (run inside the page) ─────────────────────── */
const EMBED_TOOLS = [
  { name: "Pollinations Chat", host: "sur.pollinations.ai", url: "https://sur.pollinations.ai/", descAr: "دردشة سريعة بلا حساب", descEn: "Fast chat, no account" },
  { name: "UMint AI", host: "umint-ai.hf.space", url: "https://umint-ai.hf.space/", descAr: "واجهة نماذج مفتوحة", descEn: "Open models interface" },
  { name: "URV AI Chat", host: "perchance.org", url: "https://perchance.org/urv-ai-chat", descAr: "دردشة بلا حساب ولا حدود", descEn: "No account, no limits" },
  { name: "FreeGPT", host: "freegpt.es", url: "https://freegpt.es/", descAr: "دردشة مجانية مباشرة", descEn: "Direct free chat" },
  { name: "Heck AI", host: "heck.ai", url: "https://heck.ai", descAr: "دردشة وبحث", descEn: "Chat and search" },
];

function EmbedPanel({ lang }: { lang: "ar" | "en" }) {
  const [active, setActive] = useState(EMBED_TOOLS[0]);
  const [loaded, setLoaded] = useState(false);
  const t = lang === "ar"
    ? { intro: "أدوات تفتح داخل الصفحة مباشرة — اختر بطاقة وابدأ.", note: "لو ظهر الإطار فارغًا فالخدمة منعت التضمين من طرفها — جرّب أداة أخرى.", open: "فتح في تبويب جديد ↗" }
    : { intro: "Tools that open directly inside the page — pick a card and start.", note: "If the frame is blank, the service blocked embedding on its end — try another tool.", open: "Open in new tab ↗" };
  return (
    <div>
      <p className="hub-intro">{t.intro}</p>
      <div className="embed-chips">
        {EMBED_TOOLS.map((x) => (
          <button
            key={x.url}
            className={`embed-chip${active.url === x.url ? " active" : ""}`}
            onClick={() => { setActive(x); setLoaded(false); }}
          >
            <span className="embed-chip-name">{x.name}</span>
            <span className="embed-chip-desc">{lang === "ar" ? x.descAr : x.descEn}</span>
          </button>
        ))}
      </div>
      <div className="embed-frame-wrap">
        {!loaded && <div className="embed-loading"><span /></div>}
        <iframe key={active.url} src={active.url} title={active.name} onLoad={() => setLoaded(true)} style={{ opacity: loaded ? 1 : 0 }} />
      </div>
      <div className="embed-below">
        <span className="embed-note">{t.note}</span>
        <a href={active.url} target="_blank" rel="noreferrer" className="embed-open">{t.open}</a>
      </div>
    </div>
  );
}

/* ── Site-native chat engine ──────────────────────────────────── */
const MODELS = [
  { id: "deepseek/deepseek-v4-flash", label: "DeepSeek V4 Flash" },
  { id: "alibaba/qwen3.6-27b", label: "Qwen 3.6 27B" },
  { id: "google/gemma-4-31b-it", label: "Gemma 4 31B" },
  { id: "xiaomi/mimo-v2.5", label: "MiMo 2.5" },
  { id: "zai/glm-5.1", label: "GLM 5.1" },
  { id: "moonshotai/kimi-k2.6", label: "Kimi K2.6" },
];

const SUGGESTIONS = {
  ar: [
    "اشرح لي الفرق بين Docker وKubernetes",
    "كيف أبدأ homelab بميزانية بسيطة؟",
    "وش أفضل طريقة لتأمين شبكة منزلية؟",
    "لخّص لي مفهوم Zero Trust",
  ],
  en: [
    "Explain the difference between Docker and Kubernetes",
    "How do I start a homelab on a small budget?",
    "Best way to secure a home network?",
    "Summarize the Zero Trust concept",
  ],
};

function EnginePanel({ lang }: { lang: "ar" | "en" }) {
  const t = lang === "ar"
    ? { modelAria: "اختيار النموذج", emptyTitle: "اسأل عن أي شيء", emptyText: "بنية تحتية، شبكات، ذكاء اصطناعي — أو جرّب أحد الاقتراحات:", error: "حدث خطأ في الاتصال — جرّب نموذجًا آخر أو أعد المحاولة.", placeholder: "اكتب رسالتك…", send: "إرسال", you: "YOU", ai: "AI" }
    : { modelAria: "Select model", emptyTitle: "Ask anything", emptyText: "Infrastructure, networking, AI — or try a suggestion:", error: "Connection error — try another model or retry.", placeholder: "Type your message…", send: "Send", you: "YOU", ai: "AI" };
  const [model, setModel] = useState(MODELS[0].id);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    setInput("");
    sendMessage({ text: clean }, { body: { model } });
  };

  return (
    <div className="engine-shell">
      <div className="engine-top">
        <select className="model-select" value={model} onChange={(e) => setModel(e.target.value)} aria-label={t.modelAria}>
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>
      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && !error && (
          <div className="chat-empty">
            <span className="glyph">{lang === "ar" ? "م" : "M"}</span>
            <p className="chat-empty-title">{t.emptyTitle}</p>
            <p>{t.emptyText}</p>
            <div className="suggestions">
              {SUGGESTIONS[lang].map((s) => (
                <button key={s} className="suggestion" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.role === "user" ? "user" : "ai"}`}>
            <span className="msg-role">{m.role === "user" ? t.you : t.ai}</span>
            {m.parts.map((part, i) => part.type === "text" ? <span key={i}>{part.text}</span> : null)}
          </div>
        ))}
        {busy && messages.length > 0 && <div className="typing"><span /><span /><span /></div>}
        {error && (
          <div className="chat-error">
            {error.message && error.message.length < 200 && !error.message.toLowerCase().includes("fetch")
              ? error.message
              : t.error}
          </div>
        )}
      </div>
      <div className="chat-form">
        <textarea
          className="chat-input"
          rows={1}
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
        />
        <button className="chat-send" onClick={() => send(input)} disabled={busy || !input.trim()}>
          {busy ? "…" : t.send}
        </button>
      </div>
    </div>
  );
}

/* ── Directory ────────────────────────────────────────────────── */
type DirTool = { name: string; url: string; models: string; tipAr: string; tipEn: string; cat: string };

const DIR_CATS = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "chat", ar: "محادثة", en: "Chat" },
  { key: "media", ar: "صور وفيديو", en: "Media" },
  { key: "voice", ar: "صوت وموسيقى", en: "Voice" },
  { key: "dev", ar: "منصات مطورين", en: "Dev" },
];

const DIR_TOOLS: DirTool[] = [
  { cat: "chat", name: "lmarena.ai", url: "https://lmarena.ai/", models: "40+ models", tipAr: "قارن ردود عدة نماذج جنبًا إلى جنب وصوّت للأفضل.", tipEn: "Compare responses from multiple models side by side." },
  { cat: "chat", name: "meta.ai", url: "https://www.meta.ai", models: "Llama 4", tipAr: "افتح الرابط وابدأ فورًا بدون تسجيل.", tipEn: "Open and start instantly, no signup." },
  { cat: "chat", name: "phind.com", url: "https://www.phind.com", models: "Phind-70B", tipAr: "بحث ودردشة للمبرمجين وأسئلة الكود.", tipEn: "Search + chat for developers." },
  { cat: "chat", name: "groq.com", url: "https://groq.com", models: "15+ models", tipAr: "دردشة فائقة السرعة — اختر نموذجًا وابدأ.", tipEn: "Ultra-fast chat — pick a model and go." },
  { cat: "chat", name: "chatgpt.com", url: "https://chatgpt.com", models: "GPT-4o", tipAr: "بضع رسائل GPT-4o مجانية بدون حساب.", tipEn: "A few free GPT-4o messages, no account." },
  { cat: "chat", name: "chat.mistral.ai", url: "https://chat.mistral.ai", models: "Le Chat", tipAr: "10 رسائل مجانية يوميًا.", tipEn: "10 free messages a day." },
  { cat: "chat", name: "perplexity.ai", url: "https://perplexity.ai", models: "GPT-4.1 · Claude", tipAr: "جواب مع مصادر وروابط حقيقية.", tipEn: "Answers with real cited sources." },
  { cat: "chat", name: "grok.com", url: "https://grok.com/chat", models: "Grok 3", tipAr: "3 رسائل تقريبًا كل ساعتين.", tipEn: "~3 messages every 2 hours." },
  { cat: "chat", name: "pi.ai", url: "https://pi.ai", models: "Inflection-2.5", tipAr: "محادثة شخصية بأسلوب إنساني.", tipEn: "A personal, human-like style." },
  { cat: "chat", name: "kimi.com", url: "https://kimi.com", models: "K2 · K1.5", tipAr: "دردشة قوية تدعم العربي جيدًا.", tipEn: "Strong chat, handles Arabic well." },
  { cat: "chat", name: "gemini.google.com", url: "https://gemini.google.com", models: "Gemini 2.5", tipAr: "بحساب Google — بضع محادثات يوميًا.", tipEn: "Google sign-in — a few daily chats." },
  { cat: "chat", name: "copilot.microsoft.com", url: "https://copilot.microsoft.com", models: "GPT-5", tipAr: "دردشة شبه غير محدودة + صورة يوميًا.", tipEn: "Near-unlimited chat + one image a day." },
  { cat: "chat", name: "claude.ai", url: "https://claude.ai", models: "Claude", tipAr: "جودة عالية بالكتابة والتحليل، بحصة يومية.", tipEn: "High-quality writing and analysis, daily quota." },
  { cat: "chat", name: "huggingface.co/chat", url: "https://huggingface.co/chat", models: "Open models", tipAr: "نماذج مفتوحة متعددة بتسجيل بسيط.", tipEn: "Several open models, simple signup." },
  { cat: "chat", name: "poe.com", url: "https://poe.com", models: "Claude · GPT · Llama", tipAr: "منصة تجمع أشهر النماذج وتبدّل بينها.", tipEn: "One platform bundling top models." },
  { cat: "chat", name: "chat.deepseek.com", url: "https://chat.deepseek.com", models: "V3 · R1", tipAr: "قوية بالاستدلال والبرمجة، شبه مجانية كليًا.", tipEn: "Strong reasoning and coding, essentially free." },
  { cat: "chat", name: "you.com", url: "https://you.com", models: "Search + chat", tipAr: "يدمج بحثًا حيًا مع إجابة الذكاء الاصطناعي.", tipEn: "Live search fused with an AI answer." },
  { cat: "media", name: "runwayml.com", url: "https://runwayml.com/", models: "Gen-4", tipAr: "حوّل وصف المشهد لصورة أو فيديو.", tipEn: "Turn a scene description into image or video." },
  { cat: "media", name: "pollinations.ai", url: "https://pollinations.ai/", models: "Image models", tipAr: "رابط واحد يولّد صورة فورًا بلا تسجيل.", tipEn: "One link generates an image instantly." },
  { cat: "media", name: "vheer.com", url: "https://vheer.com/", models: "Own model", tipAr: "صور بدون علامة مائية.", tipEn: "Images with no watermark." },
  { cat: "media", name: "perchance.org", url: "https://perchance.org/wtr90dexsn", models: "Unlimited", tipAr: "مولّد بسيط وسريع بلا حساب.", tipEn: "Simple, fast, no account." },
  { cat: "media", name: "fotor.com", url: "https://www.fotor.com/", models: "AI editing", tipAr: "ارفع صورة ودع الذكاء الاصطناعي يحررها.", tipEn: "Upload a photo and let AI edit it." },
  { cat: "media", name: "leonardo.ai", url: "https://leonardo.ai", models: "Multiple", tipAr: "أرصدة يومية مجانية بجودة احترافية.", tipEn: "Daily free credits, professional quality." },
  { cat: "media", name: "ideogram.ai", url: "https://ideogram.ai", models: "Ideogram", tipAr: "الأدق في كتابة نص واضح داخل الصورة.", tipEn: "Best at clean text inside images." },
  { cat: "media", name: "craiyon.com", url: "https://www.craiyon.com", models: "Free model", tipAr: "توليد فوري بدون أي تسجيل.", tipEn: "Instant generation, no login at all." },
  { cat: "media", name: "bing.com/create", url: "https://www.bing.com/images/create", models: "DALL-E 3", tipAr: "بحساب Microsoft مجاني بجودة DALL-E 3.", tipEn: "Free Microsoft sign-in, DALL-E 3 quality." },
  { cat: "voice", name: "ttsmp3.com", url: "https://ttsmp3.com", models: "Google/MS TTS", tipAr: "الصق النص واختر صوتًا وحمّل الملف.", tipEn: "Paste text, pick a voice, download." },
  { cat: "voice", name: "voicegenerator.io", url: "https://voicegenerator.io", models: "Multiple voices", tipAr: "مكتبة أصوات جاهزة للنصوص.", tipEn: "A ready voice library for text." },
  { cat: "voice", name: "fakeyou.com", url: "https://fakeyou.com", models: "Community voices", tipAr: "اختر صوتًا وحوّل نصك إليه.", tipEn: "Pick a voice and convert your text." },
  { cat: "voice", name: "elevenlabs.io", url: "https://elevenlabs.io", models: "Top TTS", tipAr: "أصوات شبه بشرية بحصة شهرية مجانية.", tipEn: "Near-human voices, free monthly quota." },
  { cat: "voice", name: "suno.com", url: "https://suno.com", models: "Full songs", tipAr: "اكتب وصف الأغنية ويولّدها كاملة.", tipEn: "Describe a song and it generates it fully." },
  { cat: "voice", name: "udio.com", url: "https://udio.com", models: "Music gen", tipAr: "بديل قوي لـ Suno بجودة عالية.", tipEn: "A strong Suno alternative." },
  { cat: "dev", name: "uncloseai.com", url: "https://uncloseai.com/", models: "Hermes · Qwen", tipAr: "واجهة متوافقة مع OpenAI بلا تسجيل.", tipEn: "OpenAI-compatible API, no signup." },
  { cat: "dev", name: "ollama.com", url: "https://ollama.com", models: "Dozens local", tipAr: "شغّل النماذج محليًا على جهازك.", tipEn: "Run models locally on your machine." },
  { cat: "dev", name: "g4f.dev", url: "https://g4f.dev/docs/ready_to_use.html", models: "Unified providers", tipAr: "واجهة واحدة لعدة مزودين مجانًا.", tipEn: "One API over several providers, free." },
  { cat: "dev", name: "openrouter.ai", url: "https://openrouter.ai", models: "Dozens free", tipAr: "مفتاح واحد لعشرات النماذج وبعضها مجاني.", tipEn: "One key for dozens of models, several free." },
  { cat: "dev", name: "huggingface.co", url: "https://huggingface.co", models: "Thousands", tipAr: "استضافة وتجربة نماذج مفتوحة عبر Spaces.", tipEn: "Host and try open models via Spaces." },
  { cat: "dev", name: "together.ai", url: "https://together.ai", models: "Fast open models", tipAr: "رصيد تجريبي مجاني عند التسجيل.", tipEn: "Free trial credit on signup." },
  { cat: "dev", name: "replit.com", url: "https://replit.com", models: "Replit Agent", tipAr: "وكيل يبني تطبيقات كاملة من وصف نصي.", tipEn: "An agent that builds full apps from text." },
  { cat: "dev", name: "lovable.dev", url: "https://lovable.dev", models: "App builder", tipAr: "يبني تطبيقك كاملًا خلال دقائق.", tipEn: "Builds your app fully in minutes." },
  { cat: "dev", name: "cursor.com", url: "https://cursor.com", models: "AI editor", tipAr: "محرر VS Code بمساعد يكتب الكود معك.", tipEn: "A VS Code editor with an AI pair." },
];

function DirectoryPanel({ lang }: { lang: "ar" | "en" }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const t = lang === "ar"
    ? { search: "ابحث عن أداة…", note: "الخدمات خارج نطاق تحكمي وقد تتغير حدودها — القائمة مبنية على مستودع zebbern/no-cost-ai.", src: "المصدر" }
    : { search: "Search tools…", note: "Services are outside my control and limits may change — based on the zebbern/no-cost-ai repo.", src: "Source" };
  const filtered = useMemo(
    () => DIR_TOOLS.filter((x) => (cat === "all" || x.cat === cat) && (!q || x.name.toLowerCase().includes(q.toLowerCase()))),
    [cat, q]
  );
  return (
    <div>
      <div className="dir-controls">
        <div className="dir-cats">
          {DIR_CATS.map((c) => (
            <button key={c.key} className={`dir-cat${cat === c.key ? " active" : ""}`} onClick={() => setCat(c.key)}>
              {lang === "ar" ? c.ar : c.en}
            </button>
          ))}
        </div>
        <input className="dir-search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="tool-grid">
        {filtered.map((tool) => (
          <a key={tool.url} href={tool.url} target="_blank" rel="noreferrer" className="tool-card">
            <div className="tool-card-name">{tool.name}<span className="arrow">↗</span></div>
            <div className="tool-card-models">{tool.models}</div>
            <div className="tool-card-tip">{lang === "ar" ? tool.tipAr : tool.tipEn}</div>
          </a>
        ))}
      </div>
      <p className="tools-note" style={{ marginTop: 28 }}>
        {t.note}{" "}
        <a href="https://github.com/zebbern/no-cost-ai" target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }}>
          {t.src}: zebbern/no-cost-ai
        </a>
      </p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ChatPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [tab, setTab] = useState<Tab>("engine");

  return (
    <main className="section hub">
      <div className="hub-head">
        <p className="eyebrow" style={{ textAlign: "start", marginBottom: 10 }}>{t.eyebrow}</p>
        <h1>{t.heading}</h1>
        <p className="hub-sub">{t.sub}</p>
      </div>

      <div className="hub-tabs" role="tablist">
        {(Object.keys(t.tabs) as Tab[]).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} className={`hub-tab${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>
            {t.tabs[k]}
          </button>
        ))}
      </div>

      {tab === "engine" && <EnginePanel lang={lang} />}
      {tab === "embed" && <EmbedPanel lang={lang} />}
      {tab === "directory" && <DirectoryPanel lang={lang} />}
    </main>
  );
}
