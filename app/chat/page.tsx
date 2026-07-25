"use client";

import { useLanguage } from "@/lib/language-context";

type Tool = {
  name: string;
  url: string;
  models: string;
  tipAr: string;
  tipEn: string;
};

type Category = {
  key: string;
  ar: string;
  en: string;
  tag: string;
  tools: Tool[];
};

const CATEGORIES: Category[] = [
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
    ],
  },
];

const COPY = {
  ar: {
    eyebrow: "AI TOOLS",
    heading: "أدوات ذكاء اصطناعي مجانية",
    intro:
      "دليل مختصر لأفضل خدمات الذكاء الاصطناعي المجانية التي لا تحتاج تسجيل دخول أو حساب — افتح الرابط واستخدمها مباشرة.",
    note: "الخدمات ومزودوها خارج نطاق تحكمي، وقد تتغير حدودها أو تتوقف دون إشعار — القائمة مبنية على مستودع zebbern/no-cost-ai مفتوح المصدر.",
    source: "المصدر: zebbern/no-cost-ai",
  },
  en: {
    eyebrow: "AI TOOLS",
    heading: "Free AI tools",
    intro:
      "A short guide to the best free AI services that need no signup or account — open the link and use it directly.",
    note: "These services and their providers are outside my control, and limits may change or stop without notice — list based on the open-source zebbern/no-cost-ai repository.",
    source: "Source: zebbern/no-cost-ai",
  },
};

export default function ChatPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="section">
      <div className="section-head">
        <span className="mono">{t.eyebrow}</span>
        <h2>{t.heading}</h2>
      </div>
      <p className="tools-intro">{t.intro}</p>
      <p className="tools-note">
        {t.note}{" "}
        <a href="https://github.com/zebbern/no-cost-ai" target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }}>
          {t.source}
        </a>
      </p>

      {CATEGORIES.map((cat) => (
        <div className="tool-category" key={cat.key}>
          <div className="tool-category-head">
            <span className="mono">{cat.tag}</span>
            <h3>{lang === "ar" ? cat.ar : cat.en}</h3>
          </div>
          <div className="tool-grid">
            {cat.tools.map((tool) => (
              <a
                key={tool.url}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="tool-card"
              >
                <div className="tool-card-name">
                  {tool.name}
                  <span className="arrow">↗</span>
                </div>
                <div className="tool-card-models">{tool.models}</div>
                <div className="tool-card-tip">
                  {lang === "ar" ? tool.tipAr : tool.tipEn}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
