export type Post = {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  tag: string;
  excerpt: string;
  excerptEn: string;
  body: { h?: string; p: string }[];
  bodyEn: { h?: string; p: string }[];
  refs?: { label: string; url: string }[];
};

export const posts: Post[] = [
  {
    slug: "huggingface-speech-to-speech-local-voice-agent",
    title: "Speech To Speech: بنية مفتوحة كاملة لوكيل صوتي محلي من Hugging Face",
    titleEn: "Speech To Speech: A Full Open Pipeline for a Local Voice Agent from Hugging Face",
    date: "2026-07",
    tag: "AI INFRA",
    excerpt:
      "أغلب المساعدات الصوتية الفورية تمر عبر خدمات سحابية مغلقة. مشروع من Hugging Face يبني خط أنابيب كامل (كشف صوت → تحويل نص → نموذج لغوي → تحويل صوت) قابل للتبديل مكونًا مكونًا، بواجهة متوافقة مع OpenAI Realtime.",
    excerptEn:
      "Most real-time voice assistants run through closed cloud services. A Hugging Face project builds a complete pipeline (voice detection → speech-to-text → language model → text-to-speech) with every component swappable, exposed through an OpenAI Realtime-compatible interface.",
    body: [
      { p: "أغلب المساعدات الصوتية الفورية (زي ميزة Realtime من OpenAI) تعمل كصندوق أسود سحابي. مشروع Speech To Speech من Hugging Face يعيد بناء نفس الفكرة كخط أنابيب مفتوح بالكامل: كشف نشاط صوتي (VAD)، تحويل كلام لنص (STT)، نموذج لغوي (LLM)، ثم تحويل نص لكلام (TTS) — كل مرحلة تشتغل على خيط مستقل وتتواصل عبر طوابير، وكل مكون فيها قابل للاستبدال بأمر سطر واحد." },
      { h: "التشغيل بأمر واحد", p: "أمر تثبيت واحد ثم أمر تشغيل واحد يشغّل خادمًا متوافقًا مع بروتوكول OpenAI Realtime على المنفذ المحلي — بنموذج Parakeet TDT للتفريغ وQwen3-TTS للصوت افتراضيًا. أي عميل يدعم Realtime API يقدر يتصل مباشرة بدون أي تعديل." },
      { h: "مرونة اختيار النموذج اللغوي", p: "النموذج اللغوي — أكثر مرحلة استهلاكًا للوقت والمعالجة في خط الأنابيب — يقدر يكون محليًا بالكامل عبر llama.cpp أو vLLM على عتادك، أو عبر أي مزود متوافق مع OpenAI (HF Inference Providers، OpenRouter، أو OpenAI نفسها). تبديل المزود سطر واحد فقط في أمر التشغيل." },
      { h: "زاوية عملية", p: "المشروع يشغّل فعليًا محادثات آلاف من روبوتات Reachy Mini في الإنتاج، وهذا مؤشر نضج حقيقي لا مجرد عرض تجريبي. الدعم اللغوي يعتمد على النموذج المختار لا على خط الأنابيب نفسه، ويدعم التبديل التلقائي بين اللغات عبر خيار تشغيل مخصص." },
    ],
    bodyEn: [
      { p: "Most real-time voice assistants (like OpenAI's Realtime feature) work as a closed cloud black box. Hugging Face's Speech To Speech project rebuilds the same idea as a fully open pipeline: voice activity detection (VAD), speech-to-text (STT), a language model (LLM), then text-to-speech (TTS) — each stage runs on its own thread and communicates through queues, and every component can be swapped with a single CLI flag." },
      { h: "Running it with one command", p: "One install command, then one run command starts a server compatible with the OpenAI Realtime protocol on a local port — with Parakeet TDT for transcription and Qwen3-TTS for voice output by default. Any client that speaks the Realtime API can connect directly with no changes." },
      { h: "Flexible language-model choice", p: "The language model — the most time- and compute-intensive stage in the pipeline — can run fully locally via llama.cpp or vLLM on your own hardware, or through any OpenAI-compatible provider (HF Inference Providers, OpenRouter, or OpenAI itself). Switching providers is a one-line change in the run command." },
      { h: "A practical angle", p: "This project actually powers the conversation backend for thousands of Reachy Mini robots in production — a real maturity signal, not just a demo. Language coverage depends on the model you choose, not the pipeline itself, and it supports automatic language switching via a dedicated run flag." },
    ],
    refs: [{ label: "huggingface/speech-to-speech", url: "https://github.com/huggingface/speech-to-speech" }],
  },
  {
    slug: "ecc-agent-harness-operating-system",
    title: "ECC: طبقة تشغيل موحّدة لأدوات الوكلاء البرمجية عبر Claude Code وCursor وأكثر",
    titleEn: "ECC: An Operating Layer for Coding Agent Tools Across Claude Code, Cursor, and More",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "كل أداة وكيل برمجي (Claude Code، Cursor، Codex...) تبدأ من الصفر بلا ذاكرة ولا معايير موحدة. مشروع مفتوح المصدر يضيف طبقة مهارات وذاكرة وأمان فوق سبع أدوات وكيلة مختلفة دفعة واحدة.",
    excerptEn:
      "Every coding agent tool (Claude Code, Cursor, Codex...) starts from zero, with no memory and no shared standards. An open-source project adds a skills, memory, and security layer on top of seven different agent tools at once.",
    body: [
      { p: "كل من جرّب أكثر من أداة وكيل برمجي واحدة (Claude Code، Cursor، Codex، OpenCode...) يعرف المشكلة: كل أداة تبدأ محادثة جديدة بلا ذاكرة لما تعلمته سابقًا، ولا معايير برمجة موحدة، ولا طبقة أمان افتراضية. مشروع ECC يبني هذه الطبقة مرة واحدة، وتعمل عبر كل الأدوات." },
      { h: "ما الذي يضيفه", p: "أكثر من 260 «مهارة» جاهزة تغطي لغات وأطر عمل متعددة (TypeScript، Python، Go، Rust، Java، PHP وغيرها)، عشرات الوكلاء الفرعيين المتخصصين (مراجعة كود، إصلاح بناء، اختبار E2E، مراجعة أمنية)، ونظام «تعلم مستمر» يستخرج أنماط عمل من جلساتك السابقة ويحقنها في الجلسات القادمة تلقائيًا." },
      { h: "الأمان كطبقة مدمجة", p: "أداة فرعية اسمها AgentShield تفحص إعدادات الوكيل نفسه بحثًا عن أسرار مكشوفة، صلاحيات مفرطة، ومخاطر حقن عبر MCP — بـ102 قاعدة تحليل ثابت، مع وضع اختياري يشغّل ثلاثة نماذج Claude Opus في دور مهاجم ومدافع ومدقق لتقييم تحديات فعلية لا مجرد مطابقة أنماط." },
      { h: "زاوية عملية", p: "يدعم المشروع Claude Code وCursor وCodex وOpenCode وGemini CLI وZed وGitHub Copilot ضمن أدوات أخرى — نفس القواعد والمهارات تنتقل معك بين الأدوات. قبل التثبيت، اختر مسارًا واحدًا فقط (الإضافة الجاهزة أو التثبيت اليدوي) وتجنّب تكديس الطريقتين، لأنه أشيع سبب لتكرار السلوك وتضارب الإعدادات حسب توثيق المشروع نفسه." },
    ],
    bodyEn: [
      { p: "Anyone who has tried more than one coding agent tool (Claude Code, Cursor, Codex, OpenCode...) knows the problem: every tool starts a fresh session with no memory of what it learned before, no shared coding standards, and no default security layer. The ECC project builds that layer once, and it works across every tool." },
      { h: "What it adds", p: "260+ ready-made \"skills\" covering multiple languages and frameworks (TypeScript, Python, Go, Rust, Java, PHP, and more), dozens of specialized subagents (code review, build-fix, E2E testing, security review), and a \"continuous learning\" system that extracts patterns from your past sessions and injects them into future ones automatically." },
      { h: "Security as a built-in layer", p: "A companion tool called AgentShield scans the agent's own configuration for exposed secrets, excessive permissions, and MCP injection risks — with 102 static-analysis rules, plus an optional mode that runs three Claude Opus models as attacker, defender, and auditor to assess real exploit chains, not just pattern matching." },
      { h: "A practical angle", p: "The project supports Claude Code, Cursor, Codex, OpenCode, Gemini CLI, Zed, and GitHub Copilot, among others — the same rules and skills travel with you between tools. Before a full install, pick exactly one path (the ready plugin or manual install) and avoid stacking both, since the project's own documentation flags that as the most common cause of duplicated behavior and conflicting configuration." },
    ],
    refs: [{ label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" }],
  },
  {
    slug: "meetily-local-ai-meeting-assistant",
    title: "Meetily: مساعد اجتماعات ذكي يعمل بالكامل على جهازك",
    titleEn: "Meetily: An AI Meeting Assistant That Runs Entirely on Your Machine",
    date: "2026-07",
    tag: "SELF-HOSTED",
    excerpt:
      "أدوات تفريغ الاجتماعات السحابية تعني إرسال نقاشاتك الحساسة لخوادم لا تملكها. مشروع مفتوح المصدر يفرّغ ويلخّص اجتماعاتك بالكامل محليًا — بلا سحابة، بلا اشتراك، وبخصوصية كاملة.",
    excerptEn:
      "Cloud meeting-transcription tools mean sending your sensitive discussions to servers you don't own. An open-source project transcribes and summarizes your meetings entirely locally — no cloud, no subscription, full privacy.",
    body: [
      { p: "تكلفة متوسط اختراق البيانات بلغت 4.4 مليون دولار عام 2024 حسب تقرير IBM، وغرامات GDPR تجاوزت 5.88 مليار يورو حتى 2025 — أرقام تجعل أي مسؤول تقني يعيد التفكير قبل رفع تسجيل اجتماع حساس لأداة سحابية. مشروع Meetily يحل هذا بمعالجة كاملة على الجهاز نفسه، دون إرسال أي بيانات للسحابة." },
      { h: "كيف يعمل", p: "يسجّل الاجتماع (المايكروفون وصوت النظام معًا)، يفرّغه لحظيًا عبر نماذج Whisper أو Parakeet (أسرع بأربع مرات حسب مطوّري المشروع)، ثم يولّد ملخصًا عبر نموذج لغوي من اختيارك — Ollama محليًا، أو Claude وGroq وOpenRouter، أو أي نقطة نهاية متوافقة مع OpenAI." },
      { h: "البنية التقنية", p: "تطبيق سطح مكتب واحد مبني بإطار Tauri، بخلفية Rust تتولى كل المنطق الأساسي وواجهة Next.js للاستخدام. يدعم تسريع العتاد تلقائيًا على كل منصة وقت البناء — Metal وCoreML على macOS، وCUDA وVulkan على Windows/Linux." },
      { h: "زاوية عملية", p: "النسخة المجتمعية مجانية ومفتوحة المصدر بالكامل، وتغطي التفريغ اللحظي والتلخيص محليًا. نسخة PRO تجارية تضيف دقة أعلى وقوالب تصدير وتمييزًا للمتحدثين — مناسبة للفرق، لكن جوهر الخصوصية والمعالجة المحلية يبقى في النسخة المجانية." },
    ],
    bodyEn: [
      { p: "The average cost of a data breach hit $4.4M in 2024 per IBM, and GDPR fines topped €5.88 billion through 2025 — numbers that make any IT lead think twice before uploading a sensitive meeting recording to a cloud tool. Meetily solves this with full on-device processing, sending no data to the cloud at all." },
      { h: "How it works", p: "It records the meeting (microphone and system audio together), transcribes it live via Whisper or Parakeet models (claimed 4x faster by the project's developers), then generates a summary through a language model of your choice — Ollama locally, or Claude, Groq, OpenRouter, or any OpenAI-compatible endpoint." },
      { h: "Technical architecture", p: "A single desktop app built with the Tauri framework, with a Rust backend handling all core logic and a Next.js frontend for the interface. It supports hardware acceleration on every platform automatically at build time — Metal and CoreML on macOS, CUDA and Vulkan on Windows/Linux." },
      { h: "A practical angle", p: "The community edition is free and fully open-source, covering live transcription and local summarization. A commercial PRO tier adds higher accuracy, export templates, and speaker identification — useful for teams, but the core privacy and local-processing promise stays in the free edition." },
    ],
    refs: [{ label: "Zackriya-Solutions/meetily", url: "https://github.com/Zackriya-Solutions/meetily" }],
  },
  {
    slug: "lightpanda-headless-browser-ai-agents",
    title: "متصفح بلا واجهة مبني من الصفر لوكلاء الذكاء الاصطناعي",
    titleEn: "A Headless Browser Built From Scratch for AI Agents",
    date: "2026-07",
    tag: "AGENTIC AI",
    excerpt:
      "تشغيل Chrome بلا واجهة لأتمتة الوكلاء مكلف على الذاكرة والمعالج. متصفح مفتوح المصدر جديد مكتوب من الصفر بلغة Zig يعد بأداء أسرع بأضعاف واستهلاك ذاكرة أقل بكثير من Headless Chrome.",
    excerptEn:
      "Running headless Chrome for agent automation is expensive on memory and CPU. A new open-source browser written from scratch in Zig promises multiples-faster performance and far lower memory use than headless Chrome.",
    body: [
      { p: "مشروع Lightpanda Browser متصفح بلا واجهة رسومية (headless) مبني من الصفر بلغة Zig — ليس فرعًا من Chromium ولا من WebKit. الهدف صريح منذ البداية: أتمتة الويب ووكلاء الذكاء الاصطناعي، لا التصفح البشري." },
      { h: "الفرق في الأداء", p: "وفق اختبارات المشروع نفسه على 933 صفحة حقيقية، يستهلك Lightpanda نحو 123 ميجابايت ذاكرة مقابل 2 جيجابايت لـ Headless Chrome عند نفس الحمل، وينجز المهمة في نحو 5 ثوانٍ مقابل 46 ثانية تقريبًا — فرق يقارب 9 أضعاف بالسرعة و16 ضعفًا بالذاكرة." },
      { h: "وضع الوكيل (Agent mode)", p: "يوفر المشروع وضع تشغيل يقود فيه وكيل ذكاء اصطناعي المتصفح مباشرة بأوامر بلغة طبيعية — تصفح، ضغط، تعبئة نماذج، استخراج بيانات — مع دعم Anthropic وOpenAI وGemini وHugging Face والنماذج المحلية عبر Ollama. أي جلسة وكيل يمكن تصديرها كسكربت جافاسكريبت قابل لإعادة التشغيل دون الحاجة لنموذج لغوي وقت التشغيل لاحقًا." },
      { h: "زاوية عملية", p: "يدعم بروتوكول CDP القياسي (نفس بروتوكول Chrome DevTools)، فيعمل مباشرة مع Puppeteer وPlaywright دون تعديل كبير على السكربتات الحالية. المشروع لسا في مرحلة Beta وتغطيته لواجهات الويب لا تصل بعد لمستوى Chrome الكامل — يستحق التجربة في مهام زحف وأتمتة محددة، لا كبديل كامل فوري." },
    ],
    bodyEn: [
      { p: "Lightpanda Browser is a headless browser built entirely from scratch in Zig — not a fork of Chromium or WebKit. Its stated goal from the start is explicit: web automation and AI agents, not human browsing." },
      { h: "The performance difference", p: "Per the project's own benchmarks on 933 real web pages, Lightpanda uses about 123MB of memory versus 2GB for headless Chrome under the same load, finishing in around 5 seconds versus roughly 46 — close to a 9x speed difference and 16x less memory." },
      { h: "Agent mode", p: "The project ships a mode where an AI agent drives the browser directly through natural-language commands — navigating, clicking, filling forms, extracting structured data — supporting Anthropic, OpenAI, Gemini, Hugging Face, and local models via Ollama. Any agent session can be exported as a replayable JavaScript script that needs no model at runtime afterward." },
      { h: "A practical angle", p: "It speaks the standard CDP protocol (the same one Chrome DevTools uses), so it works directly with Puppeteer and Playwright without major changes to existing scripts. The project is still in beta and its web-API coverage hasn't reached full Chrome parity yet — worth trying for specific crawling and automation tasks, not yet a full drop-in replacement." },
    ],
    refs: [{ label: "lightpanda-io/browser", url: "https://github.com/lightpanda-io/browser" }],
  },
  {
    slug: "openworker-ai-desktop-coworker",
    title: "OpenWorker: زميل عمل بالذكاء الاصطناعي يعيش على سطح مكتبك",
    titleEn: "OpenWorker: An AI Coworker That Lives on Your Desktop",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "أغلب أدوات الذكاء الاصطناعي تعطيك ردًا نصيًا وتترك التنفيذ لك. مشروع مفتوح المصدر من أندرو إنغ يقلب المعادلة: وكيل يعمل على جهازك فعليًا، ويسلّمك عملًا جاهزًا — مستند، رد Slack بالأرقام، تقويم محدّث — لا مجرد اقتراح.",
    excerptEn:
      "Most AI tools hand you a text reply and leave execution to you. Andrew Ng's open-source project flips that: an agent that actually runs on your machine and delivers finished work — a document, a Slack reply with the numbers, an updated calendar — not just a suggestion.",
    body: [
      { p: "أغلب أدوات الذكاء الاصطناعي للمطورين والمستخدمين تقترح وتترك التنفيذ لك. OpenWorker، المشروع مفتوح المصدر من Andrew Ng، يذهب بالفكرة خطوة أبعد: تطبيق سطح مكتب يعمل كزميل عمل حقيقي — يفهم الهدف، يخطط، ينفّذ عبر ملفاتك وأدواتك، ويسلّمك النتيجة النهائية جاهزة، لا قائمة مهام." },
      { h: "كيف يعمل", p: "تخبر OpenWorker بالنتيجة اللي تبيها — \"جهّز ملخص عميل\"، \"رتّب تقويمي\"، \"اكتب تقريرًا\" — فيقسّم المهمة إلى خطوات وينفذها عبر سطح مكتبك وملفاتك وطرفيتك (terminal) وأدواتك المتصلة. قبل أي خطوة حسّاسة — إرسال رسالة، تعديل تقويم، تشغيل أمر — يتوقف ويطلب موافقتك أو توجيهك. النتيجة: ملف جاهز تفتحه وتشاركه، لا اقتراح تنفذه بنفسك." },
      { h: "البنية التقنية", p: "المحرك مبني على مكتبة aisuite (من نفس الفريق) اللي توحّد واجهة الدردشة عبر مزودي النماذج المختلفين، مع طبقة وكلاء وأدوات ودعم MCP. التطبيق نفسه: قشرة سطح مكتب (Tauri) فوق خادم وكيل محلي بلغة Python، بلا قفل على مزود نموذج معين — تربطه بمفتاحك الخاص من OpenAI أو Anthropic أو Google، أو تشغّله بالكامل محليًا عبر Ollama." },
      { h: "الخصوصية والتكامل", p: "المشروع \"محلي أولًا\": حلقة الوكيل، محادثاتك، رموز الاتصال بالخدمات، ومفاتيح النماذج — كلها تعيش في مخزن أسرار محلي على جهازك. القطعة السحابية الوحيدة خدمة صغيرة لتوسّط عمليات OAuth مع أكثر من 25 تكاملًا (GitHub، Slack، Jira، Notion، Gmail، وغيرها)، وتقدر تستخدمه بالكامل دون تسجيل دخول عبر مفاتيح API يدوية." },
      { h: "زاوية عملية", p: "يدعم العمل من داخل Slack مباشرة (منشن @OpenWorker يفتح جلسة على جهازك)، وأتمتة مجدولة (تقرير صباحي، مراقبة قناة أسبوعية). قبل منحه صلاحية تنفيذ فعلية على بيانات أو حسابات حقيقية، جرّبه أولًا على مهام محدودة النطاق وراقب نمط طلبات الموافقة قبل توسيع الصلاحيات — نفس المبدأ المتكرر مع كل وكيل تنفيذي: الثقة تُبنى تدريجيًا، لا تُمنح دفعة واحدة." },
    ],
    bodyEn: [
      { p: "Most AI tools for developers and everyday users suggest and leave execution to you. OpenWorker, an open-source project from Andrew Ng, takes the idea a step further: a desktop app that acts as a real coworker — it understands the goal, plans, executes across your files and tools, and hands you the finished result, not a to-do list." },
      { h: "How it works", p: "You tell OpenWorker the outcome you want — \"prepare a customer brief,\" \"untangle my calendar,\" \"draft a report\" — and it breaks the task into steps and executes across your desktop, files, terminal, and connected tools. Before anything consequential — sending a message, changing a calendar, running a command — it stops and asks for your approval or direction. The result: a finished file you open and share, not a suggestion you have to execute yourself." },
      { h: "Technical architecture", p: "The engine is built on aisuite (from the same team), a lightweight library that unifies the chat-completions API across different model providers, plus an agents layer with tools and MCP support. The app itself: a desktop shell (Tauri) on top of a local Python agent server, with no lock-in to any specific model provider — bring your own key from OpenAI, Anthropic, or Google, or run fully local via Ollama." },
      { h: "Privacy and integrations", p: "The project is \"local-first\": the agent loop, your conversations, connector tokens, and model keys all live in a local secret store on your machine. The only cloud piece is a small service that brokers OAuth handshakes for 25+ integrations (GitHub, Slack, Jira, Notion, Gmail, and more), and you can use the app entirely without signing in via manually-created API keys." },
      { h: "A practical angle", p: "It supports working directly from Slack (mentioning @OpenWorker opens a session on your machine) and scheduled automations (a morning brief, a standing weekly channel watch). Before granting it real execution authority over real data or accounts, try it first on narrow-scope tasks and watch the pattern of its approval requests before expanding permissions — the same principle that repeats with every executing agent: trust is built gradually, not granted all at once." },
    ],
    refs: [
      { label: "andrewyng/openworker", url: "https://github.com/andrewyng/openworker" },
      { label: "andrewyng/aisuite", url: "https://github.com/andrewyng/aisuite" },
    ],
  },
  {
    slug: "portainer-container-management",
    title: "Portainer: إدارة Docker وKubernetes بواجهة واحدة",
    titleEn: "Portainer: One Interface for Docker and Kubernetes",
    date: "2026-07",
    tag: "CONTAINERS",
    excerpt:
      "عندما تتجاوز حاوياتك العشرة، يصبح سطر الأوامر وحده عبئًا. Portainer يعطيك رؤية كاملة وتحكمًا مركزيًا — سواء في homelab أو بيئة إنتاج.",
    excerptEn:
      "Past a handful of containers, the CLI alone becomes a burden. Portainer gives you full visibility and centralized control — whether in a homelab or production.",
    body: [
      { p: "أدوات إدارة الحاويات كثيرة، لكن Portainer (مشروع مفتوح المصدر بأكثر من 37 ألف نجمة على GitHub) يتميز بشيء واحد: البساطة دون التضحية بالعمق. واجهة ويب واحدة تدير Docker وKubernetes وDocker Swarm، من بيئة واحدة إلى أسطول كامل من الخوادم." },
      { h: "لماذا يهم مهندس البنية التحتية", p: "القيمة الحقيقية ليست في الواجهة الجميلة، بل في الحوكمة: إدارة صلاحيات المستخدمين على مستوى البيئات، قوالب نشر موحدة، ومراجعة سريعة لاستهلاك الموارد والسجلات دون الدخول لكل خادم عبر SSH." },
      { h: "من تجربتي", p: "أشغّل Portainer فوق بيئة حاويات متعددة الخدمات في مختبري المنزلي. الدرس الأهم: استخدمه كطبقة رؤية وتشغيل يومي، لكن أبقِ تعريفات الخدمات في ملفات compose مُدارة بالإصدارات — الواجهة للتشغيل، والكود للحقيقة المصدرية." },
    ],
    bodyEn: [
      { p: "Container management tools are plentiful, but Portainer (an open-source project with over 37,000 GitHub stars) stands out for one thing: simplicity without sacrificing depth. A single web interface manages Docker, Kubernetes, and Docker Swarm — from one environment to a full fleet of servers." },
      { h: "Why it matters for infrastructure engineers", p: "The real value isn't the polished UI — it's governance: environment-level user permissions, standardized deployment templates, and quick review of resource usage and logs without SSH-ing into every host." },
      { h: "From experience", p: "I run Portainer over a multi-service container environment in my home lab. The key lesson: use it as a daily visibility and operations layer, but keep service definitions in version-controlled compose files — the UI is for running things, the code is the source of truth." },
    ],
    refs: [{ label: "portainer/portainer", url: "https://github.com/portainer/portainer" }],
  },
  {
    slug: "zero-trust-mesh-ztm",
    title: "ما بعد الـ VPN التقليدي: Zero Trust Mesh مع مشروع ZTM",
    titleEn: "Beyond Traditional VPNs: Zero Trust Mesh with ZTM",
    date: "2026-06",
    tag: "NETWORK",
    excerpt:
      "الشبكات الخاصة التقليدية تفترض أن من دخل المحيط موثوق. نموذج Zero Trust يقلب المعادلة — ومشروع ZTM مفتوح المصدر يطبقه كشبكة مشفرة لامركزية.",
    excerptEn:
      "Traditional private networks assume anyone inside the perimeter is trusted. Zero Trust flips that — and the open-source ZTM project implements it as a decentralized encrypted mesh.",
    body: [
      { p: "لعقود، بنينا أمن الشبكات على فكرة المحيط: جدار ناري قوي في الخارج، وثقة واسعة في الداخل. لكن العمل عن بعد والخدمات السحابية جعلت \"الداخل\" و\"الخارج\" مفهومين بلا معنى. هنا يأتي نموذج Zero Trust: لا ثقة افتراضية لأي طرف." },
      { h: "ماذا يقدم ZTM", p: "مشروع ZTM من Flomesh يطبق هذا النموذج كشبكة معرفة برمجيًا، لامركزية، مشفرة end-to-end، مبنية على HTTP/2 — تعمل خلف CGNAT، عبر البروكسيات، وفي الشبكات المقيدة. بديل عملي مفتوح المصدر لحلول مثل Tailscale." },
      { h: "زاوية عملية", p: "لمن يدير homelab خلف CGNAT، هذه الفئة من الحلول تغيّر قواعد اللعبة: وصول آمن دون فتح منافذ ودون المرور بخادم مركزي. ابدأ بخدمة واحدة غير حرجة وقس زمن الاستجابة قبل التعميم." },
    ],
    bodyEn: [
      { p: "For decades, network security was built on the perimeter model: a strong firewall outside, broad trust inside. Remote work and cloud services made \"inside\" and \"outside\" meaningless. This is where Zero Trust comes in: no default trust for any party." },
      { h: "What ZTM offers", p: "Flomesh's ZTM implements this as a software-defined, decentralized, end-to-end encrypted network built on HTTP/2 — working behind CGNAT, through proxies, and on restricted networks. A practical open-source alternative to solutions like Tailscale." },
      { h: "A practical angle", p: "For anyone running a homelab behind CGNAT, this class of solution changes the game: secure access without opening ports, and without a central server owned by a third party. Start with one non-critical service and measure latency before rolling it out further." },
    ],
    refs: [{ label: "flomesh-io/ztm", url: "https://github.com/flomesh-io/ztm" }],
  },
  {
    slug: "pigsty-enterprise-postgres",
    title: "Pigsty: PostgreSQL بمواصفات مؤسسية دون تكلفة الترخيص",
    titleEn: "Pigsty: Enterprise-Grade PostgreSQL Without License Costs",
    date: "2026-06",
    tag: "DATABASES",
    excerpt:
      "توافر عالٍ، نسخ احتياطي بنقطة استعادة زمنية، مراقبة جاهزة، وبنية ككود — توزيعة مفتوحة المصدر تحوّل PostgreSQL إلى منصة بيانات مؤسسية كاملة.",
    excerptEn:
      "High availability, point-in-time recovery, ready-made monitoring, and infrastructure as code — an open-source distribution that turns PostgreSQL into a full enterprise data platform.",
    body: [
      { p: "الفجوة بين \"تثبيت PostgreSQL\" و\"تشغيله بمستوى إنتاج مؤسسي\" فجوة ضخمة. مشروع Pigsty يغلقها بتوزيعة متكاملة تضم أكثر من 500 إضافة PostgreSQL جاهزة، مع Patroni للتوافر العالي وGrafana للمراقبة." },
      { h: "لماذا يستحق الانتباه", p: "كثير من المؤسسات تدفع تراخيص ضخمة لقواعد بيانات تجارية بينما 80% من احتياجها يغطيه PostgreSQL. توزيعة مثل Pigsty تختصر شهورًا من بناء النضج التشغيلي يدويًا." },
      { h: "نصيحة تشغيلية", p: "لا تقيّم أي حل قواعد بيانات بالتثبيت الناجح، بل بتمرين الاستعادة الفعلي: أوقف العقدة الرئيسية عمدًا وراقب الـ failover، ثم نفّذ استعادة كاملة لوقت محدد." },
    ],
    bodyEn: [
      { p: "The gap between \"installing PostgreSQL\" and \"running it at enterprise production standard\" is huge. Pigsty closes it with a complete distribution bundling 500+ ready PostgreSQL extensions, Patroni for high availability, and Grafana for monitoring." },
      { h: "Why it deserves attention", p: "Many organizations pay hefty licenses for commercial databases when PostgreSQL covers 80% of their needs. A distribution like Pigsty compresses months of manual operational maturity into a ready foundation." },
      { h: "Operational advice", p: "Never judge a database solution by a successful install — judge it by an actual recovery drill: deliberately kill the primary node and watch the failover, then run a full point-in-time restore." },
    ],
    refs: [{ label: "pgsty/pigsty", url: "https://github.com/pgsty/pigsty" }],
  },
  {
    slug: "vllm-llm-inference-infra",
    title: "vLLM: عندما يصبح استدلال النموذج مسألة بنية تحتية",
    titleEn: "vLLM: When Model Inference Becomes an Infrastructure Problem",
    date: "2026-05",
    tag: "AI INFRA",
    excerpt:
      "تشغيل نموذج لغوي شيء، وتقديمه لعشرات المستخدمين بكفاءة شيء آخر تمامًا. vLLM يعالج المشكلة من زاوية هندسة الذاكرة — وهذا درس لكل مهندس بنية تحتية.",
    excerptEn:
      "Running a language model is one thing; serving it efficiently to dozens of concurrent users is another. vLLM solves this from a memory-engineering angle — a lesson for every infrastructure engineer.",
    body: [
      { p: "معظم من يجرب النماذج المحلية يبدأ بأداة مثل Ollama — ممتازة للاستخدام الفردي. لكن حين تريد تقديم النموذج لعدة مستخدمين متزامنين، تصطدم بعنق الزجاجة الحقيقي: ذاكرة الـ GPU وإدارة الـ KV Cache. هنا يتفوق vLLM بفضل تقنية PagedAttention." },
      { h: "الفكرة الجوهرية", p: "PagedAttention تستعير مفهوم الـ paging من أنظمة التشغيل: بدل حجز كتل ذاكرة متصلة ضخمة لكل طلب، تُدار الذاكرة بصفحات صغيرة قابلة للمشاركة — إنتاجية أعلى بأضعاف على نفس العتاد." },
      { h: "الخلاصة", p: "الذكاء الاصطناعي التوليدي في المؤسسات سيصبح عبء عمل تديره فرق البنية التحتية: تخطيط سعة GPU، وقياس tokens/second كمؤشر خدمة. من يفهم أدوات مثل vLLM يبني ميزة مهنية واضحة." },
    ],
    bodyEn: [
      { p: "Most people trying local models start with a tool like Ollama — great for individual use. But serving a model to multiple concurrent users hits the real bottleneck: GPU memory and KV cache management. This is where vLLM excels, thanks to PagedAttention." },
      { h: "The core idea", p: "PagedAttention borrows the paging concept from operating systems: instead of reserving huge contiguous memory blocks per request, memory is managed in small, shareable pages — multiplying throughput on the same hardware." },
      { h: "The takeaway", p: "Generative AI in enterprises will become a workload infrastructure teams manage: GPU capacity planning, tokens/second as a service metric. Understanding tools like vLLM today builds a clear professional edge." },
    ],
    refs: [{ label: "vllm-project/vllm", url: "https://github.com/vllm-project/vllm" }],
  },
  {
    slug: "selfhosted-toolbox",
    title: "عدة الاستضافة الذاتية: أدوات صغيرة تصنع فرقًا كبيرًا",
    titleEn: "The Self-Hosting Toolbox: Small Tools, Big Difference",
    date: "2026-05",
    tag: "SELF-HOSTED",
    excerpt:
      "Dashy للوحة موحدة، Neko لمتصفح معزول، Pluton للنسخ الاحتياطي المشفر، وStressdisk لاختبار الأقراس قبل الثقة بها — جولة في أدوات تستحق مكانًا في بنيتك.",
    excerptEn:
      "Dashy for a unified dashboard, Neko for an isolated browser, Pluton for encrypted backups, and Stressdisk for testing disks before trusting them — a tour of tools worth a place in your stack.",
    body: [
      { p: "قوة الاستضافة الذاتية ليست في الخدمات الكبيرة فقط، بل في الأدوات الصغيرة التي تحل مشكلة واحدة بإتقان. أربع أدوات مفتوحة المصدر تستحق التقييم." },
      { h: "Dashy — نقطة الدخول الموحدة", p: "لوحة تحكم تجمع كل خدماتك بواجهة واحدة مع فحص حالة وودجتس. الفائدة الخفية: صفحة البداية الموحدة توثّق بنيتك ضمنيًا." },
      { h: "Neko — متصفح معزول في حاوية", p: "متصفح كامل داخل Docker تصل إليه عبر WebRTC — تصفح معزول لفحص روابط مشبوهة، أو جلسة مشتركة يشاهدها أكثر من شخص." },
      { h: "Pluton وStressdisk", p: "Pluton حل نسخ احتياطي ذاتي الاستضافة بتشفير كامل. وStressdisk أداة من مطور rclone تختبر الأقراس قبل أن تأتمنها على بياناتك — العتاد يخذلك في أسوأ وقت، فاختبره في وقت تختاره أنت." },
    ],
    bodyEn: [
      { p: "The power of self-hosting isn't just in the big services — it's in small tools that solve one problem well. Four open-source tools worth evaluating." },
      { h: "Dashy — a unified entry point", p: "A dashboard that gathers all your services in one interface with status checks and widgets. The hidden benefit: a unified home page implicitly documents your infrastructure." },
      { h: "Neko — an isolated browser in a container", p: "A full browser inside Docker, accessed via WebRTC — isolated browsing for checking suspicious links, or a shared session multiple people can watch." },
      { h: "Pluton and Stressdisk", p: "Pluton is a self-hosted backup solution with full encryption. Stressdisk, from rclone's author, stress-tests disks before you trust them with your data — hardware fails at the worst time, so test it on your own schedule." },
    ],
    refs: [
      { label: "lissy93/dashy", url: "https://github.com/lissy93/dashy" },
      { label: "m1k1o/neko", url: "https://github.com/m1k1o/neko" },
      { label: "plutonhq/pluton", url: "https://github.com/plutonhq/pluton" },
      { label: "ncw/stressdisk", url: "https://github.com/ncw/stressdisk" },
    ],
  },
  {
    slug: "aws-local-emulator-cloud-testing",
    title: "قبل أن تدفع فلسًا للسحابة: المحاكاة المحلية لبيئات AWS",
    titleEn: "Before You Spend a Cent on Cloud: Local AWS Emulation",
    date: "2026-07",
    tag: "CLOUD",
    excerpt:
      "كل تجربة على بيئة سحابية حقيقية لها فاتورة وزمن انتظار. أدوات محاكاة السحابة محليًا تقلب المعادلة: طوّر واختبر بسرعة الحاسوب المحلي، وادفع فقط عند اليقين.",
    excerptEn:
      "Every test on a real cloud environment carries a bill and a wait. Local cloud emulation flips that: develop and test at local-machine speed, and pay only once you're sure.",
    body: [
      { p: "أكبر احتكاك في تطوير البنية السحابية هو حلقة التغذية الراجعة البطيئة: تدفع تغييرًا، تنتظر، تختبر، تكتشف خطأ. أدوات المحاكاة المحلية لـ AWS تحل هذا بتشغيل نسخة طبق الأصل على جهازك أو في CI." },
      { h: "لماذا يهم هذا مهندس البنية التحتية", p: "بيئة محاكاة محلية تعني اختبار سكربتات النشر وسيناريوهات الفشل قبل لمس بيئة حقيقية بفاتورة — وتجعل الـ CI قادرًا على اختبارات تكامل كاملة دون حساب سحابي فعلي." },
      { h: "أين ينتهي دورها", p: "المحاكاة أداة تسريع، لا بديل عن بيئة تحقق حقيقية قبل الإنتاج. طوّر واختبر محليًا بسرعة، ثم تحقّق على بيئة سحابية حقيقية صغيرة قبل الدفع للإنتاج." },
    ],
    bodyEn: [
      { p: "The biggest friction in cloud infrastructure development is a slow feedback loop: push a change, wait, test, find a bug. Local AWS emulation tools solve this by running a faithful copy on your machine or in CI." },
      { h: "Why it matters for infrastructure engineers", p: "A local emulation environment means testing deployment scripts and failure scenarios before touching a real environment with a bill or sensitive data — and it lets CI run full integration tests without an actual cloud account." },
      { h: "Where its role ends", p: "Emulation is a development accelerator, not a substitute for a real staging environment before production. Develop and test locally at speed, then verify on a small real cloud environment before shipping to production." },
    ],
    refs: [{ label: "floci-io/floci", url: "https://github.com/floci-io/floci" }],
  },
  {
    slug: "ai-agent-goose-beyond-suggestions",
    title: "وكيل الذكاء الاصطناعي الذي ينفّذ لا يقترح فقط",
    titleEn: "The AI Agent That Executes, Not Just Suggests",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "أغلب أدوات الذكاء الاصطناعي للمطورين تقترح كودًا وتترك التنفيذ لك. جيل جديد من الوكلاء مفتوحة المصدر يتجاوز الاقتراح إلى التثبيت والتنفيذ والتعديل والاختبار — بأي نموذج لغوي تختاره.",
    excerptEn:
      "Most AI dev tools suggest code and leave execution to you. A new generation of open-source agents goes beyond suggestion to installing, running, editing, and testing — with any language model you choose.",
    body: [
      { p: "الفرق الجوهري بين مساعد كود ووكيل ذكاء اصطناعي هو حلقة التنفيذ: المساعد يقترح نصًا وينتظر، بينما الوكيل يمر بدورة كاملة — يفهم الهدف، يخطط، ينفّذ الأوامر، ويتحقق من النتيجة بنفسه." },
      { h: "استقلالية اختيار النموذج", p: "ما يميز هذا النوع من الوكلاء أنه لا يربطك بمزوّد واحد — يعمل مع أي نموذج تختاره، محليًا أو عبر واجهة برمجية. يمنحك حرية الموازنة بين التكلفة والجودة وموقع البيانات." },
      { h: "زاوية عملية للتبني المؤسسي", p: "قبل منح وكيل صلاحية التنفيذ الفعلي، جرّبه في مستودع تجريبي معزول ومهام محدودة النطاق، وراقب نمط قراراته لا نتيجته فقط." },
    ],
    bodyEn: [
      { p: "The core difference between a code assistant and an AI agent is the execution loop: an assistant proposes text and waits, while an agent runs a full cycle — understanding the goal, planning, executing commands, and verifying the outcome itself." },
      { h: "Model independence", p: "What sets this class of agents apart is that they aren't locked to one provider — they work with any model you choose, local or API-based, giving you freedom to balance cost, quality, and data residency." },
      { h: "A practical angle for adoption", p: "Before granting an agent real execution rights, trial it in an isolated sandbox repo on narrow-scope tasks, and watch its decision pattern, not just its outcomes." },
    ],
    refs: [{ label: "aaif-goose/goose", url: "https://github.com/aaif-goose/goose" }],
  },
  {
    slug: "agentic-ai-infrastructure-mcp",
    title: "Agentic AI تدير البنية التحتية: عندما يتحدث الوكيل مباشرة مع خوادمك",
    titleEn: "Agentic AI Runs Infrastructure: When the Agent Talks to Your Servers Directly",
    date: "2026-06",
    tag: "AGENTIC AI",
    excerpt:
      "بروتوكول MCP فتح الباب لوكلاء الذكاء الاصطناعي للتحدث مباشرة مع أدوات إدارة البنية التحتية — من تشغيل خادم افتراضي إلى إدارة حاوية، بلغة طبيعية وصلاحيات محكومة.",
    excerptEn:
      "The MCP protocol opened the door for AI agents to talk directly to infrastructure management tools — from spinning up a VM to managing a container — in natural language, under governed permissions.",
    body: [
      { p: "الأتمتة التقليدية تنفذ سيناريو مكتوبًا مسبقًا. الوكيل الذي يتحدث عبر Model Context Protocol مختلف: تحدد له الهدف والصلاحية، وهو يقرر بنفسه أي أداة يستدعي." },
      { h: "مثال ملموس", p: "خوادم MCP المخصصة لمنصات مثل Proxmox تتيح لوكيل الذكاء الاصطناعي إدارة الأجهزة الافتراضية والحاويات مباشرة عبر أوامر بلغة طبيعية." },
      { h: "القاعدة الذهبية", p: "امنح وكيل الـ MCP أقل صلاحية ممكنة، وابدأ بوصول للقراءة فقط، وسجّل كل استدعاء أداة في سجل تدقيق قابل للمراجعة." },
    ],
    bodyEn: [
      { p: "Traditional automation runs a pre-written script. An agent speaking Model Context Protocol is different: you give it a goal and a permission scope, and it decides which tool to call." },
      { h: "A concrete example", p: "MCP servers built for platforms like Proxmox let an AI agent manage virtual machines and containers directly through natural-language commands." },
      { h: "The golden rule", p: "Grant an MCP agent the least privilege possible, start with read-only access, and log every tool call in a reviewable audit trail." },
    ],
    refs: [
      { label: "canvrno/ProxmoxMCP", url: "https://github.com/canvrno/ProxmoxMCP" },
      { label: "EricGrill/mcp-proxmox-admin", url: "https://github.com/EricGrill/mcp-proxmox-admin" },
    ],
  },
  {
    slug: "ai-pentest-strix-security-agent",
    title: "وكيل ذكاء اصطناعي يخترق تطبيقك قبل أن يخترقه أحد آخر",
    titleEn: "An AI Agent Breaks Into Your App Before Someone Else Does",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "اختبار الاختراق التقليدي يستغرق أسابيع وفريقًا متخصصًا. أداة مفتوحة المصدر جديدة تستخدم وكيل ذكاء اصطناعي لمحاكاة هجوم حقيقي على تطبيقك تلقائيًا، وتكتسب زخمًا سريعًا هذا الشهر.",
    excerptEn:
      "Traditional penetration testing takes weeks and a specialized team. A new open-source tool uses an AI agent to automatically simulate a real attack on your app — and it's gaining fast momentum this month.",
    body: [
      { p: "اختبار الاختراق تقليديًا عملية بشرية بطيئة. أدوات الوكلاء الأمنية الجديدة تقلب هذا: وكيل يتصفح التطبيق كما يفعل مهاجم حقيقي، يكتشف الثغرات، ويحاول استغلالها فعليًا." },
      { h: "لماذا هذا مختلف", p: "أدوات الفحص التقليدية تُخرج قائمة طويلة أغلبها إنذارات كاذبة. الوكيل الأمني يذهب أبعد: يخطط سلسلة هجوم منطقية وينفذها فعليًا." },
      { h: "أين يقف مهندس البنية التحتية", p: "يمكن تشغيله في كل نشر كطبقة فحص أولى سريعة. القاعدة نفسها تتكرر: شغّله في بيئة معزولة، وتحقق يدويًا قبل اتخاذ إجراء." },
    ],
    bodyEn: [
      { p: "Penetration testing has traditionally been a slow, human-driven process. New security agent tools flip this: an agent browses the app like a real attacker, finds vulnerabilities, and actually attempts to exploit them." },
      { h: "Why this is different", p: "Traditional scanners produce a long list, mostly false positives. A security agent goes further: it plans a coherent attack chain and actually executes it." },
      { h: "Where infrastructure engineers fit in", p: "It can run in every deployment as a quick first-pass check layer. The same rule applies: run it in an isolated environment, and manually verify before acting." },
    ],
    refs: [{ label: "usestrix/strix", url: "https://github.com/usestrix/strix" }],
  },
  {
    slug: "pulumi-infrastructure-as-real-code",
    title: "البنية التحتية بلغة برمجة حقيقية لا ملفات YAML",
    titleEn: "Infrastructure in a Real Programming Language, Not YAML Files",
    date: "2026-07",
    tag: "CLOUD",
    excerpt:
      "أغلب أدوات البنية ككود تجبرك على تعلم لغة تعريفية جديدة. أداة مفتوحة المصدر راسخة تتيح لك كتابة بنيتك التحتية بلغة البرمجة التي تعرفها فعلًا — Python أو TypeScript أو Go.",
    excerptEn:
      "Most Infrastructure-as-Code tools force you to learn a new declarative syntax. An established open-source tool lets you write your infrastructure in a language you already know — Python, TypeScript, or Go.",
    body: [
      { p: "أدوات البنية ككود التقليدية تستخدم لغات تعريفية خاصة بها — صياغة جديدة عليك تعلمها. البديل: كتابة تعريف البنية التحتية بلغة برمجة عامة تعرفها فعلًا." },
      { h: "الفائدة العملية", p: "تستطيع إعادة استخدام المنطق نفسه الذي تستخدمه في تطبيقاتك: دوال قابلة لإعادة الاستخدام، فحص الأنواع، ومكتبات الاختبار المعتادة لديك." },
      { h: "نصيحة للتبني التدريجي", p: "لا تعيد كتابة بنيتك التحتية دفعة واحدة. ابدأ بمورد واحد غير حرج، اكتبه بالطريقة الجديدة، وقارن النتيجة." },
    ],
    bodyEn: [
      { p: "Traditional infrastructure-as-code tools use their own declarative languages — a new syntax you have to learn. The alternative: writing your infrastructure definition in a general-purpose language you already know." },
      { h: "The practical benefit", p: "You can reuse the same logic patterns you use in your applications: reusable functions, type checking, and the testing libraries you're already comfortable with." },
      { h: "Advice for gradual adoption", p: "Don't rewrite your existing infrastructure all at once. Start with one non-critical resource, write it the new way, and compare the results." },
    ],
    refs: [{ label: "pulumi/pulumi", url: "https://github.com/pulumi/pulumi" }],
  },
  {
    slug: "dokploy-self-hosted-paas",
    title: "منصتك السحابية الخاصة: بديل ذاتي الاستضافة لـ Heroku وVercel",
    titleEn: "Your Own Cloud Platform: A Self-Hosted Alternative to Heroku and Vercel",
    date: "2026-07",
    tag: "SELF-HOSTED",
    excerpt:
      "منصات النشر الجاهزة مريحة لكن مكلفة على المدى الطويل وتحبسك بمزود واحد. منصة PaaS مفتوحة المصدر تتيح لك نشر تطبيقاتك بنقرة واحدة على خادمك الخاص، بلا رسوم شهرية متصاعدة.",
    excerptEn:
      "Ready-made deployment platforms are convenient but grow costly over time and lock you to one vendor. An open-source PaaS lets you deploy apps with one click on your own server, with no escalating monthly fees.",
    body: [
      { p: "منصات مثل Heroku وVercel أزالت تعقيد النشر، لكن هذه الراحة لها ثمن يتصاعد، وتعني أن بنيتك التشغيلية تعيش في بنية تحتية لا تملكها. منصات الـ PaaS ذاتية الاستضافة تعيد هذا التوازن." },
      { h: "ما الذي تحصل عليه فعليًا", p: "نشر تطبيقات Node وPython وDocker بإعداد شبه صفري، شهادات SSL تلقائية، وواجهة إدارة مرئية — فوق خادمك الخاص عبر Docker." },
      { h: "أين تكمن المسؤولية الإضافية", p: "أمن الخادم وتحديثاته ونسخه الاحتياطية أصبحت مسؤوليتك أنت. تأكد من خطة نسخ احتياطي مُختبرة فعليًا قبل نقل أي حمل إنتاجي." },
    ],
    bodyEn: [
      { p: "Platforms like Heroku and Vercel removed deployment complexity, but that convenience carries a rising price, and means your operational stack lives on infrastructure you don't own. Self-hosted PaaS platforms restore that balance." },
      { h: "What you actually get", p: "Near-zero-config deployment for Node, Python, and Docker apps, automatic SSL certificates, and a visual management interface — all on top of your own server via Docker." },
      { h: "Where the extra responsibility lies", p: "Server security, patching, and backups now fall on you. Make sure you have an actually-tested backup plan before moving any real production workload." },
    ],
    refs: [{ label: "Dokploy/dokploy", url: "https://github.com/Dokploy/dokploy" }],
  },
  {
    slug: "browser-use-agentic-web-automation",
    title: "عندما يتصفح وكيل الذكاء الاصطناعي الإنترنت بدلًا عنك",
    titleEn: "When an AI Agent Browses the Web on Your Behalf",
    date: "2026-07",
    tag: "AGENTIC AI",
    excerpt:
      "أغلب وكلاء الذكاء الاصطناعي مقيدون بواجهات برمجية جاهزة. مكتبة مفتوحة المصدر تكتسب زخمًا سريعًا تمنح الوكيل تحكمًا كاملًا في متصفح حقيقي — يضغط، يملأ نماذج، ويقرأ الصفحة كإنسان.",
    excerptEn:
      "Most AI agents are limited to pre-built APIs. A fast-growing open-source library gives an agent full control of a real browser — clicking, filling forms, and reading the page like a human would.",
    body: [
      { p: "كثير من المهام اليومية — حجز موعد، تعبئة نموذج حكومي، أو مقارنة أسعار — لا تملك واجهة برمجية رسمية. الحل التقليدي كان أتمتة هشة تعتمد على محددات HTML ثابتة تنكسر مع أول تحديث للموقع." },
      { h: "كيف يرى الوكيل الصفحة", p: "مكتبات التصفح الوكيلي الجديدة تمنح النموذج رؤية منظمة لعناصر الصفحة الحقيقية — الأزرار، الحقول، الروابط — فيقرر بنفسه أين يضغط وماذا يكتب." },
      { h: "حدود يجب معرفتها", p: "التصفح الوكيلي أبطأ وأقل قابلية للتنبؤ من واجهة برمجية مباشرة حين تكون متوفرة — فضّل الـ API دائمًا إن وُجد. استخدم التصفح الوكيلي فقط حين لا يوجد بديل، وفي بيئة معزولة." },
    ],
    bodyEn: [
      { p: "Many everyday tasks — booking an appointment, filling out a government form, comparing prices across sites — have no official API. The traditional fix was brittle automation relying on fixed HTML selectors that break with the first site update." },
      { h: "How the agent sees the page", p: "New agentic browsing libraries give the language model a structured view of real page elements — buttons, fields, links — so it decides on its own where to click and what to type." },
      { h: "Limits worth knowing", p: "Agentic browsing is slower and less predictable than a direct API when one exists — always prefer the API if available. Use browsing agents only when there's no alternative, and in an isolated environment." },
    ],
    refs: [{ label: "browser-use/browser-use", url: "https://github.com/browser-use/browser-use" }],
  },
  {
    slug: "n8n-self-hosted-workflow-automation",
    title: "أتمتة سير العمل بدون رسوم شهرية: n8n على خادمك الخاص",
    titleEn: "Workflow Automation Without a Monthly Fee: n8n on Your Own Server",
    date: "2026-07",
    tag: "SELF-HOSTED",
    excerpt:
      "أدوات الأتمتة السحابية الجاهزة رائعة حتى تصل الفاتورة الشهرية إلى مبلغ يفوق قيمة ما توفره. منصة أتمتة مفتوحة المصدر تجمع مئات التكاملات مع عقد ذكاء اصطناعي جاهزة، وتعمل بالكامل على بنيتك الخاصة.",
    excerptEn:
      "Cloud automation tools are great until the monthly bill outgrows the value they save. An open-source automation platform bundles hundreds of integrations with ready AI nodes — and runs entirely on your own infrastructure.",
    body: [
      { p: "أدوات ربط الأنظمة السحابية (مثل Zapier) تحل مشكلة حقيقية: ربط تطبيقات لا تتحدث مع بعضها أصلًا. لكن نموذج التسعير بالحدث الواحد يتحول سريعًا إلى فاتورة كبيرة." },
      { h: "ما يميز الحل ذاتي الاستضافة", p: "منصة مثل n8n تقدم محررًا مرئيًا لسير العمل، مع مئات التكاملات الجاهزة وعقد ذكاء اصطناعي مدمجة — لكن التنفيذ يبقى على خادمك، بلا حد أقصى للأحداث." },
      { h: "أين تبدأ", p: "لا تبدأ بأتمتة حرجة للعمل. اختر مهمة تكرارية بسيطة وابنها أولًا لتتعلم حدود المنصة." },
    ],
    bodyEn: [
      { p: "Cloud integration tools (like Zapier) solve a real problem: connecting apps that don't natively talk to each other. But per-event pricing quickly turns into a large bill as automation volume grows." },
      { h: "What sets the self-hosted option apart", p: "A platform like n8n offers a visual workflow editor with hundreds of ready integrations and built-in AI nodes — but execution stays entirely on your server, with no event cap." },
      { h: "Where to start", p: "Don't start with a business-critical automation. Pick a simple recurring task and build that first to learn the platform's limits." },
    ],
    refs: [{ label: "n8n-io/n8n", url: "https://github.com/n8n-io/n8n" }],
  },
  {
    slug: "e2b-sandboxes-agent-code-execution",
    title: "قبل أن تدع وكيل الذكاء الاصطناعي ينفّذ كودًا: بيئات معزولة آمنة",
    titleEn: "Before You Let an AI Agent Execute Code: Secure Sandboxes",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt: "وكيل ذكاء اصطناعي يكتب كودًا شيء، ووكيل ينفّذ ذلك الكود فعليًا على جهازك شيء مختلف تمامًا في المخاطر. مشروع مفتوح المصدر يوفر بيئات معزولة سريعة الإنشاء مصممة خصيصًا لتشغيل كود الوكلاء بأمان.",
    excerptEn: "An AI agent that writes code is one thing; an agent that actually executes that code on your machine is a different risk category entirely. An open-source project provides fast, disposable sandboxes built specifically for running agent-generated code safely.",
    body: [
      { p: "وكيل ذكاء اصطناعي قادر على كتابة الكود شيء مفيد، لكن السؤال الأخطر هو: أين يُنفّذ هذا الكود؟ تنفيذه مباشرة على جهازك أو خادمك الفعلي يعني أن أي خطأ في منطق الوكيل — أو أي محاولة اختراق ناجحة عبر حقن أوامر — قد يطال بيانات حقيقية وأنظمة حقيقية." },
      { h: "الحل: بيئة يمكن التخلص منها", p: "مشاريع بيئات التنفيذ المعزولة توفر آلاف البيئات الافتراضية الخفيفة والسريعة الإنشاء (ثوانٍ لا دقائق)، كل واحدة بنظام ملفات وشبكة وموارد خاصة بها، تُنشأ للمهمة وتُحذف بعدها بالكامل. الوكيل ينفذ فيها ما يشاء دون أن يلمس أي شيء خارجها." },
      { h: "لماذا يهم مهندس البنية التحتية تحديدًا", p: "هذا النمط يحوّل 'هل أثق بهذا الوكيل؟' إلى سؤال أقل أهمية — لأن الثقة لم تعد الحاجز الوحيد، بل العزل الفعلي هو الحاجز. ابدأ بمهام قراءة فقط داخل البيئة المعزولة، وراقب سجل كل عملية تنفيذ قبل توسيع الصلاحيات." },
    ],
    bodyEn: [
      { p: "An AI agent that can write code is useful, but the more dangerous question is: where does that code actually run? Executing it directly on your real machine or server means any flaw in the agent's logic — or any successful prompt-injection attack — can reach real data and real systems." },
      { h: "The fix: a disposable environment", p: "Isolated execution environment projects provide thousands of lightweight, fast-spinning-up virtual environments (seconds, not minutes), each with its own filesystem, network, and resources, created for the task and fully deleted afterward. The agent executes whatever it needs inside without touching anything outside." },
      { h: "Why this specifically matters for infrastructure engineers", p: "This pattern turns 'do I trust this agent?' into a less critical question — because trust is no longer the only barrier; actual isolation is. Start with read-only tasks inside the sandbox, and review the execution log for every run before expanding permissions." },
    ],
    refs: [{ label: "e2b-dev/e2b", url: "https://github.com/e2b-dev/e2b" }],
  },
  {
    slug: "omniroute-multi-provider-ai-gateway",
    title: "بوابة واحدة إلى 290 مزود ذكاء اصطناعي: نهاية الارتباط بمزود واحد",
    titleEn: "One Gateway to 290 AI Providers: The End of Vendor Lock-In",
    date: "2026-07",
    tag: "AI INFRA",
    excerpt: "كل مزود ذكاء اصطناعي له مفتاحه الخاص وواجهته الخاصة وحدوده الخاصة. بوابة ذكاء اصطناعي مفتوحة المصدر تكتسب زخمًا سريعًا توحّد الوصول إلى أكثر من 290 مزودًا خلف نقطة نهاية واحدة، مع تبديل تلقائي عند انقطاع أي مزود.",
    excerptEn: "Every AI provider has its own key, its own API shape, its own limits. A fast-growing open-source AI gateway unifies access to 290+ providers behind a single endpoint, with automatic fallback when any one goes down.",
    body: [
      { p: "من بنى منصة محادثة متعددة النماذج يعرف الألم جيدًا: كل مزود نموذج له مفتاح API مختلف، وصيغة طلب مختلفة، وحدود استخدام مختلفة تتغير دون إشعار مسبق. بوابة الذكاء الاصطناعي الموحدة تختصر هذا كله في نقطة نهاية واحدة." },
      { h: "ما الذي تحله فعليًا", p: "الميزة الجوهرية ليست التوحيد فقط، بل التبديل التلقائي عند فشل الطلب أو نفاد حصة مزود معين — النظام ينتقل لمزود بديل دون أن يشعر المستخدم النهائي بشيء. تضاف لذلك تقنيات ضغط السياق التي تقلّص استهلاك التوكنات بنسب كبيرة." },
      { h: "الدرس لمن يبني بنية ذكاء اصطناعي مؤسسية", p: "الارتهان بمزود واحد نقطة فشل حقيقية — انقطاع خدمة أو تغيير تسعير مفاجئ يعطّل كل ما بنيته فوقه. طبقة بوابة موحدة، سواء بنيتها بنفسك أو استخدمت أداة جاهزة، هي التأمين العملي ضد هذا السيناريو." },
    ],
    bodyEn: [
      { p: "Anyone who has built a multi-model chat platform knows the pain well: every model provider has a different API key, a different request shape, and different usage limits that change without notice. A unified AI gateway compresses all of this into a single endpoint." },
      { h: "What it actually solves", p: "The core value isn't just unification — it's automatic fallback when a request fails or a provider's quota runs out; the system switches to an alternative provider without the end user noticing anything. On top of that, context-compression techniques cut token usage significantly." },
      { h: "The lesson for anyone building enterprise AI infrastructure", p: "Locking into a single provider is a real single point of failure — an outage or a sudden pricing change breaks everything built on top of it. A unified gateway layer, whether you build it yourself or use a ready tool, is the practical insurance against that scenario." },
    ],
    refs: [{ label: "diegosouzapw/OmniRoute", url: "https://github.com/diegosouzapw/OmniRoute" }],
  },
  {
    slug: "agent-reach-internet-access-for-agents",
    title: "عيون لوكيل الذكاء الاصطناعي: قراءة الإنترنت كله بأمر واحد",
    titleEn: "Eyes for Your AI Agent: Reading the Whole Internet with One Command",
    date: "2026-07",
    tag: "AGENTIC AI",
    excerpt:
      "وكلاء الذكاء الاصطناعي يكتبون الكود ويديرون المشاريع، لكن يعجزون غالبًا عن قراءة تغريدة أو منشور Reddit أو ترجمة فيديو يوتيوب. أداة مفتوحة المصدر تحل هذه الفجوة بأمر تثبيت واحد، بلا رسوم API.",
    excerptEn:
      "AI agents can write code and manage projects, but they usually can't read a tweet, a Reddit post, or a YouTube transcript. An open-source tool closes that gap with a single install command — no API fees.",
    body: [
      { p: "المفارقة المعتادة: وكيل ذكاء اصطناعي قادر على تعديل مشروع كامل، لكنه يصطدم فورًا حين تطلب منه قراءة تغريدة أو منشور من Reddit أو تلخيص فيديو يوتيوب — كل منصة لها عائقها الخاص: واجهة برمجية مدفوعة، حظر لعناوين IP، أو تسجيل دخول إلزامي." },
      { h: "الفكرة", p: "بدل أن يخوض كل مطور نفس التجربة بحثًا عن أداة تتجاوز كل عائق على حدة، يجمع هذا المشروع طبقة تثبيت وإعداد واحدة فوق أدوات مفتوحة المصدر موجودة أصلًا لكل منصة — قراءة الصفحات، تفريغ ترجمات يوتيوب، البحث في GitHub، وقراءة تغريدات وReddit عبر تسجيل دخول بملفات تعريف الارتباط. أمر تثبيت واحد يُرسل للوكيل، وهو يتولى الباقي." },
      { h: "زاوية عملية", p: "كل قناة في الأداة قابلة للاستبدال بشكل مستقل — إن لم تعجبك أداة قراءة الصفحات المستخدمة مثلًا، تستبدلها بأخرى دون المساس بباقي النظام. بيانات تسجيل الدخول تبقى محليًا على جهازك فقط، ولا يُنصح باستخدام حسابات رئيسية مع المنصات التي تتطلب تسجيل دخول، تجنبًا لمخاطر الحظر." },
    ],
    bodyEn: [
      { p: "The usual paradox: an AI agent can rewrite an entire codebase, yet trips immediately when asked to read a tweet, a Reddit thread, or summarize a YouTube video — each platform has its own blocker: a paid API, IP bans, or a mandatory login." },
      { h: "The idea", p: "Instead of every developer repeating the same hunt for a workaround per platform, this project bundles a single install-and-configure layer over existing open-source tools for each platform — reading web pages, extracting YouTube transcripts, searching GitHub, and reading tweets and Reddit posts via cookie-based login. One install command sent to the agent, and it handles the rest." },
      { h: "A practical angle", p: "Each channel in the tool is independently swappable — if you don't like the page-reading tool it uses, you can replace it without touching the rest of the system. Login credentials stay entirely local to your machine, and using primary accounts on platforms requiring login isn't recommended, to avoid ban risk." },
    ],
    refs: [{ label: "Panniantong/Agent-Reach", url: "https://github.com/Panniantong/Agent-Reach" }],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
