export type Block = {
  h?: string;
  p?: string;
  list?: string[];
  code?: { lang?: string; text: string };
  table?: { headers: string[]; rows: string[][] };
  svg?: string;
};

export type Post = {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  tag: string;
  excerpt: string;
  excerptEn: string;
  body: Block[];
  bodyEn: Block[];
  refs?: { label: string; url: string }[];
};

import {
  POSTURE_SVG,
  ARCH_SVG,
  SKILL_LOOP_SVG,
  DECISION_SVG,
} from "./diagrams/hermes-openclaw";

export const posts: Post[] = [
  {
    slug: "mcp-vs-api-ai-agents",
    title: "MCP مقابل API التقليدي: كيف يتصل وكيل الذكاء الاصطناعي بأنظمتك فعليًا",
    titleEn: "MCP vs Traditional APIs: How an AI Agent Actually Connects to Your Systems",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "شرح كامل للفرق بين ربط الوكيل عبر تكامل API مخصص وربطه عبر بروتوكول MCP: مشكلة N×M، البنية، الفوائد، أمثلة كود عملية، والمخاطر الأمنية الموثّقة — مع المراجع.",
    excerptEn:
      "A complete breakdown of connecting an agent through custom API integration versus the MCP protocol: the N×M problem, the architecture, the benefits, working code examples, and documented security risks — with references.",
    body: [
      { p: "أي وكيل ذكاء اصطناعي بلا اتصال بأنظمتك هو مجرد نموذج يتكلم. القيمة تبدأ حين يقرأ من أنظمتك ويكتب فيها. والسؤال الذي يواجه كل من يبني هذا: أربطه بتكامل API مخصص، أم عبر بروتوكول MCP؟" },
      { p: "الجواب المختصر: MCP لا يحل محل الـ API — بل يغلّفه في طبقة موحّدة يستطيع النموذج التنقل فيها. لنفهم لماذا." },

      { h: "المشكلة الأصلية: N×M" },
      { p: "قبل MCP، كل ربط بين وكيل وأداة كان تكاملًا ثنائيًا مستقلًا. وكيل يتصل بقاعدة بيانات يحتاج كودًا مخصصًا. ونفس الوكيل مع تقويم يحتاج كودًا مختلفًا. ومتصفحًا يحتاج ثالثًا." },
      { p: "النتيجة معادلة غير مستدامة: عدد الوكلاء (N) مضروبًا في عدد الأدوات (M) — كل زوج بتكامل خاص. عشرة وكلاء وعشر أدوات تعني مئة تكامل." },
      { p: "MCP يحوّل المعادلة إلى N+M: كل وكيل يتكلم MCP، وكل أداة تعرض خادم MCP، وأي وكيل يستطيع استخدام أي أداة. عشرة وكلاء وعشر أدوات تصبح عشرين مكوّنًا بدل مئة." },

      { h: "ما هو MCP بدقة" },
      { p: "بروتوكول مفتوح أطلقته Anthropic في نوفمبر 2024، ثم تبرّعت به لمؤسسة Agentic AI Foundation تحت مظلة Linux Foundation — فأصبح معيارًا محايدًا لا يملكه مزوّد واحد." },
      { p: "أطرافه الثلاثة:" },
      {
        list: [
          "المضيف (Host): التطبيق الذي يعمل فيه الوكيل — Claude Desktop، VS Code، أو تطبيقك.",
          "العميل (Client): المكوّن داخل المضيف الذي يتصل بالخوادم ويستهلك قدراتها.",
          "الخادم (Server): برنامج محلي أو بعيد يعرض القدرات بصيغة موحّدة.",
        ],
      },
      { p: "والخادم يعرض ثلاثة أنواع من القدرات، والتمييز بينها مهم عمليًا:" },
      {
        list: [
          "الأدوات (Tools): أفعال ينفّذها الوكيل — إنشاء سجل، إرسال رسالة، تشغيل أمر.",
          "الموارد (Resources): بيانات للقراءة — ملفات، سجلات قاعدة بيانات، مخططات.",
          "القوالب (Prompts): سير عمل جاهز يوجّه سلوك الوكيل في مهمة متكررة.",
        ],
      },
      { p: "الفكرة الجوهرية أن MCP يعامل التكاملات كمزوّدات سياق لا كنقاط بيانات خام. أي أنه لا يعرض عمليات CRUD مجردة، بل قدرات موصوفة يفهم النموذج متى يستخدمها." },

      { h: "الفرق المعماري" },
      {
        table: {
          headers: ["المحور", "API تقليدي", "MCP"],
          rows: [
            ["اكتشاف القدرات", "نقاط نهاية مكتوبة يدويًا في الكود", "الوكيل يكتشف الأدوات وقت التشغيل عبر طلب tools/list"],
            ["إدارة الحالة", "REST بلا حالة — كل طلب مستقل وينسى المرسل", "جلسة JSON-RPC 2.0 لها حالة مستمرة"],
            ["المستهلك المستهدف", "مطوّر يكتب الاستدعاء بنفسه", "نموذج يقرر الاستدعاء بنفسه"],
            ["إعادة الاستخدام", "تكامل لكل نظام ولكل نموذج", "خادم واحد يخدم أي عميل متوافق"],
            ["عند تغيير النموذج", "غالبًا إعادة كتابة التكاملات", "لا تغيير — البروتوكول واحد"],
          ],
        },
      },
      { p: "النقطة الحاسمة هي الاكتشاف وقت التشغيل. في التكامل التقليدي أنت تخبر النموذج مسبقًا بكل أداة متاحة. في MCP، الوكيل يسأل الخادم عمّا يستطيع فعله، فيتعلّم قدرات جديدة دون إعادة برمجته." },

      { h: "متى تستخدم كل واحد" },
      { p: "الخلط بينهما مكلف في الاتجاهين. القاعدة العملية:" },
      {
        list: [
          "استخدم MCP حين يحتاج الوكيل اكتشاف أدوات واستدعاءها ديناميكيًا عبر عدة أنظمة.",
          "استخدم API مباشرًا حين تريد تحكمًا حتميًا مباشرًا في تكامل واحد داخل كود التطبيق.",
          "نقطة التحول العملية: من يشغّل ثلاثة تكاملات أو أكثر مرتبطة بالذكاء الاصطناعي يبدأ يرى MCP يقلّل التعقيد فعليًا.",
        ],
      },
      { p: "وأغلب خوادم MCP في الواقع أغلفة رقيقة فوق واجهات REST موجودة أصلًا. القيمة ليست في استبدال الـ API بل في طبقة التوحيد فوقه." },

      { h: "التطبيق الفني: الطريقة التقليدية" },
      { p: "في نمط استدعاء الدوال التقليدي، تعرّف كل أداة يدويًا للنموذج بمخطط JSON، ثم تكتب منطق التنفيذ وتربطه باسم الأداة:" },
      {
        code: {
          lang: "typescript",
          text: `// تعريف الأداة للنموذج — يدويًا لكل نظام
const tools = [{
  name: "get_ticket_status",
  description: "يرجّع حالة تذكرة دعم برقمها",
  parameters: {
    type: "object",
    properties: { ticketId: { type: "string" } },
    required: ["ticketId"],
  },
}];

// منطق التنفيذ — تكتبه وتصونه بنفسك
async function runTool(name, args) {
  if (name === "get_ticket_status") {
    const res = await fetch(
      \`https://itsm.internal/api/tickets/\${args.ticketId}\`,
      { headers: { Authorization: \`Bearer \${process.env.ITSM_TOKEN}\` } }
    );
    return res.json();
  }
  throw new Error("أداة غير معروفة");
}`,
        },
      },
      { p: "هذا يعمل جيدًا لنظام واحد. لكن أضف Oracle وActive Directory وCisco، ثم قرر تبديل النموذج — وستكتشف حجم التكرار." },

      { h: "التطبيق الفني: خادم MCP" },
      { p: "نفس الوظيفة كخادم MCP. تبنيه مرة واحدة، ويعمل مع أي عميل متوافق:" },
      {
        code: {
          lang: "typescript",
          text: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "itsm-gateway",
  version: "1.0.0",
});

server.tool(
  "get_ticket_status",
  "يرجّع حالة تذكرة دعم برقمها",
  { ticketId: z.string().describe("رقم التذكرة") },
  async ({ ticketId }) => {
    const res = await fetch(
      \`https://itsm.internal/api/tickets/\${ticketId}\`,
      { headers: { Authorization: \`Bearer \${process.env.ITSM_TOKEN}\` } }
    );
    const data = await res.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

await server.connect(new StdioServerTransport());`,
        },
      },
      { p: "لاحظ ثلاثة فروق جوهرية في هذا المثال:" },
      {
        list: [
          "المخطط معرَّف بـ Zod، فيُتحقق من المدخلات على الخادم لا في ثقة عمياء بمخرجات النموذج.",
          "الوصف جزء من تعريف الأداة نفسها، فالوكيل يكتشفها ويفهم متى يستخدمها تلقائيًا.",
          "المفتاح يعيش في متغير بيئة على الخادم، ولا يمر عبر النموذج إطلاقًا.",
        ],
      },

      { h: "ربط الخادم بالعميل" },
      { p: "بعد بناء الخادم، تعريفه في أي عميل متوافق سطور قليلة:" },
      {
        code: {
          lang: "json",
          text: `{
  "mcpServers": {
    "itsm-gateway": {
      "command": "node",
      "args": ["/opt/mcp/itsm-gateway/index.js"],
      "env": { "ITSM_TOKEN": "\${ITSM_TOKEN}" }
    }
  }
}`,
        },
      },
      { p: "نفس هذا الملف تقريبًا يعمل في Claude Desktop وCursor وVS Code وغيرها. هذي هي القيمة العملية للمعيارية." },

      { h: "الفوائد الملموسة" },
      {
        list: [
          "تكامل واحد يخدم كل الوكلاء: تبني الخادم مرة، وتستخدمه في مشاريع متعددة.",
          "استقلال عن المزوّد: تبديل النموذج لا يعني إعادة كتابة التكاملات.",
          "قدرات ديناميكية: الوكيل يتعلّم أدوات جديدة دون تحديث كوده.",
          "فصل المسؤوليات: فريق النظام يملك خادمه، وفريق الوكيل لا يحتاج معرفة تفاصيله الداخلية.",
          "نقطة تحكم واحدة: الصلاحيات والتدقيق في مكان واحد بدل تكرارها في كل تكامل.",
        ],
      },

      { h: "المخاطر الأمنية — الجزء الذي يُهمَل" },
      { p: "MCP يمركز الاعتمادات (credentials) لعدة أنظمة في مكان واحد، وهذا يخلق نقطة فشل واحدة: خادم واحد مخترق قد يعطي المهاجم وصولًا لكل قاعدة بيانات ونظام ملفات وخدمة سحابية مرتبطة بمساعدك." },
      { p: "المخاطر الموثّقة في المجتمع والأبحاث:" },
      {
        list: [
          "تسميم الأدوات (Tool poisoning): وصف أداة مُعدّل خبيثًا يوجّه الوكيل لتنفيذ ما لم يطلبه المستخدم — وهناك مستودعات إثبات مفهوم توضّح تسريب مفاتيح SSH بهذي الطريقة.",
          "حقن الأوامر: بحث من Equixly في مارس 2025 وجد 43% من تطبيقات MCP المفحوصة عرضة لحقن الأوامر.",
          "خوادم بلا مصادقة: نشر خادم دون ضوابط مصادقة يفتح كل ما خلفه.",
          "صلاحيات مفرطة: خادم بصلاحيات أوسع من اللازم يمنح وكيلًا مخترقًا وصولًا أكبر من المقصود.",
          "سجل غير موثّق: السجل الرسمي للخوادم مفتوح للنشر بلا تحقق أمني، ونسبة معتبرة من الإدخالات بلا مستودع مصدري يمكن فحصه.",
        ],
      },
      { p: "وحتى الخوادم المرجعية الرسمية صدرت لها تنبيهات أمنية — مثل ثغرات اجتياز مسارات وحقن معاملات في خادم Git. والتوثيق الرسمي نفسه يوضح أن هذي الخوادم أمثلة تعليمية لا حلول جاهزة للإنتاج." },

      { h: "ضوابط عملية قبل الإنتاج" },
      {
        list: [
          "شغّل الخوادم غير الموثوقة داخل حاويات معزولة، وافترض انعدام الثقة حتى التحقق.",
          "خزّن الاعتمادات في متغيرات بيئة فقط — لا في مخططات الأدوات ولا في محتوى الموارد.",
          "تحقق من كل مدخلات الأدوات على الخادم بمخططات صارمة (Zod أو Pydantic). لا تثق أبدًا أن النموذج سيرسل معاملات سليمة.",
          "سجّل كل استدعاء أداة بالوقت والمعاملات (منقّاة من البيانات الحساسة) والنتيجة.",
          "افرض TLS ومصادقة متبادلة (mTLS) للاتصالات بين الخوادم.",
          "ابدأ بوضع قراءة فقط، ووسّع الصلاحيات بعد مراجعة السجل فعليًا.",
        ],
      },

      { h: "الخلاصة العملية" },
      { p: "لو كان لديك نظام واحد وتكامل بسيط لا تخطط لتوسعته، فالـ API المباشر أسرع وأبسط. أما إن كانت لديك عدة أنظمة وتتوقع مشاريع وكلاء متعددة أو تغيير النماذج مستقبلًا، فبناء خادم MCP لكل نظام رئيسي يوفّر عليك تكرارًا كبيرًا." },
      { p: "والقاعدة الذهبية لا تتغير بأي من الطريقتين: أقل صلاحية ممكنة، قراءة فقط أولًا، وسجل تدقيق قابل للمراجعة لكل استدعاء." },
    ],
    bodyEn: [
      { p: "Any AI agent without a connection to your systems is just a model that talks. Value begins when it reads from and writes to your systems. And the question facing everyone building this: wire it with a custom API integration, or through the MCP protocol?" },
      { p: "The short answer: MCP doesn't replace APIs — it wraps them into a standardized layer the model can navigate. Let's see why." },

      { h: "The original problem: N×M" },
      { p: "Before MCP, every agent-to-tool connection was an independent pairwise integration. An agent connecting to a database needed custom code. The same agent with a calendar needed different code. A browser needed a third." },
      { p: "The result was an unsustainable equation: the number of agents (N) times the number of tools (M) — each pair with its own integration. Ten agents and ten tools means a hundred integrations." },
      { p: "MCP collapses this to N+M: each agent speaks MCP, each tool exposes an MCP server, and any agent can use any tool. Ten agents and ten tools become twenty components instead of a hundred." },

      { h: "What MCP is precisely" },
      { p: "An open protocol released by Anthropic in November 2024, then donated to the Agentic AI Foundation under the Linux Foundation — making it a vendor-neutral standard no single provider owns." },
      { p: "Its three parties:" },
      {
        list: [
          "Host: the application the agent runs in — Claude Desktop, VS Code, or your own app.",
          "Client: the component inside the host that connects to servers and consumes their capabilities.",
          "Server: a local or remote program exposing capabilities in a standardized form.",
        ],
      },
      { p: "And a server exposes three kinds of capability, with a distinction that matters practically:" },
      {
        list: [
          "Tools: actions the agent can invoke — create a record, send a message, run a command.",
          "Resources: read-only data — files, database records, schemas.",
          "Prompts: pre-structured workflows that guide agent behavior on a recurring task.",
        ],
      },
      { p: "The core idea is that MCP treats integrations as context providers rather than raw data endpoints. It doesn't expose bare CRUD operations, but described capabilities the model understands when to use." },

      { h: "The architectural difference" },
      {
        table: {
          headers: ["Dimension", "Traditional API", "MCP"],
          rows: [
            ["Capability discovery", "Endpoints hardcoded manually", "The agent discovers tools at runtime via a tools/list request"],
            ["State management", "Stateless REST — each request independent, the server forgets the caller", "A stateful JSON-RPC 2.0 session"],
            ["Intended consumer", "A developer writing the call themselves", "A model deciding the call itself"],
            ["Reusability", "One integration per system and per model", "One server serving any compatible client"],
            ["When you change models", "Usually rewriting the integrations", "No change — the protocol is the same"],
          ],
        },
      },
      { p: "The decisive point is runtime discovery. In traditional integration you tell the model in advance about every available tool. With MCP, the agent asks the server what it can do, so it learns new capabilities without being reprogrammed." },

      { h: "When to use each" },
      { p: "Confusing the two is costly in both directions. The practical rule:" },
      {
        list: [
          "Use MCP when agents need to discover and invoke tools dynamically across multiple systems.",
          "Use a direct API when you want deterministic, direct control over a single integration in application code.",
          "The practical crossover: teams running three or more AI-connected integrations start seeing MCP genuinely reduce complexity.",
        ],
      },
      { p: "And most MCP servers are in fact thin wrappers over existing REST APIs. The value isn't replacing the API but the standardization layer above it." },

      { h: "Technical implementation: the traditional way" },
      { p: "In classic function calling, you define each tool manually for the model with a JSON schema, then write execution logic bound to the tool name:" },
      {
        code: {
          lang: "typescript",
          text: `// Declaring the tool to the model — manually, per system
const tools = [{
  name: "get_ticket_status",
  description: "Returns a support ticket's status by ID",
  parameters: {
    type: "object",
    properties: { ticketId: { type: "string" } },
    required: ["ticketId"],
  },
}];

// Execution logic — you write and maintain it yourself
async function runTool(name, args) {
  if (name === "get_ticket_status") {
    const res = await fetch(
      \`https://itsm.internal/api/tickets/\${args.ticketId}\`,
      { headers: { Authorization: \`Bearer \${process.env.ITSM_TOKEN}\` } }
    );
    return res.json();
  }
  throw new Error("Unknown tool");
}`,
        },
      },
      { p: "This works fine for one system. But add Oracle, Active Directory, and Cisco, then decide to switch models — and you'll discover the scale of the duplication." },

      { h: "Technical implementation: an MCP server" },
      { p: "The same function as an MCP server. You build it once, and it works with any compatible client:" },
      {
        code: {
          lang: "typescript",
          text: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "itsm-gateway",
  version: "1.0.0",
});

server.tool(
  "get_ticket_status",
  "Returns a support ticket's status by ID",
  { ticketId: z.string().describe("The ticket number") },
  async ({ ticketId }) => {
    const res = await fetch(
      \`https://itsm.internal/api/tickets/\${ticketId}\`,
      { headers: { Authorization: \`Bearer \${process.env.ITSM_TOKEN}\` } }
    );
    const data = await res.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

await server.connect(new StdioServerTransport());`,
        },
      },
      { p: "Note three fundamental differences in this example:" },
      {
        list: [
          "The schema is defined with Zod, so inputs are validated on the server rather than blindly trusting model output.",
          "The description is part of the tool definition itself, so the agent discovers it and understands when to use it automatically.",
          "The credential lives in a server-side environment variable and never passes through the model at all.",
        ],
      },

      { h: "Wiring the server to a client" },
      { p: "Once the server is built, registering it in any compatible client is a few lines:" },
      {
        code: {
          lang: "json",
          text: `{
  "mcpServers": {
    "itsm-gateway": {
      "command": "node",
      "args": ["/opt/mcp/itsm-gateway/index.js"],
      "env": { "ITSM_TOKEN": "\${ITSM_TOKEN}" }
    }
  }
}`,
        },
      },
      { p: "Nearly this same file works in Claude Desktop, Cursor, VS Code, and others. That is the practical value of standardization." },

      { h: "Concrete benefits" },
      {
        list: [
          "One integration serving every agent: build the server once, use it across multiple projects.",
          "Provider independence: switching models doesn't mean rewriting integrations.",
          "Dynamic capabilities: the agent learns new tools without a code update.",
          "Separation of concerns: the system team owns its server, and the agent team needs no knowledge of its internals.",
          "A single control point: permissions and auditing in one place instead of duplicated per integration.",
        ],
      },

      { h: "Security risks — the neglected part" },
      { p: "MCP centralizes credentials for multiple systems in one place, creating a single point of failure: one compromised server may give an attacker access to every database, filesystem, and cloud service your assistant connects to." },
      { p: "Risks documented in the community and research:" },
      {
        list: [
          "Tool poisoning: a maliciously altered tool description steering the agent to do what the user never asked — public proof-of-concept repositories demonstrate SSH key exfiltration this way.",
          "Command injection: Equixly research in March 2025 found 43% of examined MCP implementations vulnerable to command injection.",
          "Servers with no authentication: publishing a server without auth controls opens everything behind it.",
          "Over-privileged servers: a server with broader permissions than needed gives a compromised agent more access than intended.",
          "An unvetted registry: the official server registry is open to publish with no security verification, and a notable share of entries have no inspectable source repository.",
        ],
      },
      { p: "Even the official reference servers have had security advisories — such as path traversal and argument injection issues in the Git server. And the official documentation itself states these servers are educational examples, not production-ready solutions." },

      { h: "Practical controls before production" },
      {
        list: [
          "Run untrusted servers inside isolated containers, and assume zero trust until verified.",
          "Store credentials in environment variables only — never in tool schemas or resource payloads.",
          "Validate all tool inputs server-side with strict schemas (Zod or Pydantic). Never trust the model to emit well-formed parameters.",
          "Log every tool invocation with timestamp, arguments (sanitized of sensitive data), and result.",
          "Enforce TLS and mutual authentication (mTLS) for server-to-server communication.",
          "Start in read-only mode, and expand permissions only after actually reviewing the log.",
        ],
      },

      { h: "The practical bottom line" },
      { p: "If you have one system and a simple integration you don't plan to expand, a direct API is faster and simpler. But if you have several systems and expect multiple agent projects or model changes ahead, building an MCP server per major system saves you substantial duplication." },
      { p: "And the golden rule doesn't change either way: least privilege possible, read-only first, and a reviewable audit trail for every invocation." },
    ],
    refs: [
      { label: "modelcontextprotocol/modelcontextprotocol", url: "https://github.com/modelcontextprotocol/modelcontextprotocol" },
      { label: "modelcontextprotocol/servers", url: "https://github.com/modelcontextprotocol/servers" },
      { label: "modelcontextprotocol/registry", url: "https://github.com/modelcontextprotocol/registry" },
      { label: "MCP Specification — modelcontextprotocol.io", url: "https://modelcontextprotocol.io" },
      { label: "Repello-AI/mcp-exploit-demo (بحث أمني)", url: "https://github.com/Repello-AI/mcp-exploit-demo" },
    ],
  },
  {
    slug: "bi-agentic-mcp-power-bi",
    title: "Power BI ووكلاء الذكاء الاصطناعي: من السؤال إلى التقرير بلا كتابة كود",
    titleEn: "Power BI and AI Agents: From Question to Report Without Writing Code",
    date: "2026-07",
    tag: "BI / AGENTIC",
    excerpt:
      "دليل عملي لربط وكيل ذكاء اصطناعي بنماذج Power BI: ما هو بروتوكول MCP، كيف تبدو دورة السؤال والجواب فعليًا، ما الأدوات المتاحة رسميًا ومفتوحة المصدر، وأين تفشل هذي المشاريع عادة.",
    excerptEn:
      "A practical guide to wiring an AI agent into Power BI models: what MCP actually is, what the question-to-answer cycle really looks like, which official and open-source tools exist, and where these projects usually fail.",
    body: [
      { p: "في أغلب المؤسسات، الفجوة ليست في البيانات بل في الوصول إليها. المدير يريد رقمًا، فيفتح تذكرة لفريق البيانات، وينتظر يومين، ليحصل على تقرير يولّد ثلاثة أسئلة جديدة. المحلل نفسه يقضي وقته في طلبات متكررة بدل التحليل العميق." },
      { p: "وكلاء الذكاء الاصطناعي المرتبطون بـ Power BI يعالجون هذي الحلقة تحديدًا: المستخدم يسأل بلغته، والوكيل يترجم السؤال لاستعلام، وينفّذه، ويرجّع الجواب. لكن الفكرة تُساء فهمها كثيرًا، فلنبدأ من الأساس." },

      { h: "ما هو MCP ولماذا غيّر المعادلة" },
      { p: "Model Context Protocol بروتوكول مفتوح يعرّف كيف يتحدث نموذج الذكاء الاصطناعي مع أدوات ومصادر بيانات خارجية بشكل منظّم وآمن. قبله، كل ربط بين نموذج ونظام كان تكاملًا مخصصًا يُبنى من الصفر." },
      { p: "المصطلحات الثلاثة التي ستراها في كل توثيق:" },
      {
        list: [
          "المضيف (Host): البيئة التي تعمل فيها — مثل VS Code.",
          "العميل (Client): المكوّن الذي يتصل بالخوادم ويستهلك قدراتها — مثل Copilot.",
          "الخادم (Server): برنامج محلي أو بعيد يعرض الأدوات والموارد — مثل خادم Power BI.",
        ],
      },
      { p: "أهمية هذا التقسيم عملية لا نظرية: أي عميل يدعم البروتوكول يستطيع استخدام أي خادم يدعمه. تبني التكامل مرة واحدة، ويعمل مع Claude وCopilot وغيرهما." },

      { h: "كيف تبدو الدورة فعليًا" },
      { p: "لنأخذ سؤالًا واقعيًا: «كم عدد التذاكر المفتوحة أكثر من 30 يومًا لكل إدارة؟» ما يحدث خلف الكواليس:" },
      {
        list: [
          "الوكيل يقرأ مخطط النموذج الدلالي: الجداول والأعمدة والعلاقات والمقاييس المعرَّفة.",
          "يحدد الجداول ذات الصلة ويبني استعلام DAX مناسبًا.",
          "ينفّذ الاستعلام عبر نقطة نهاية XMLA الخاصة بالنموذج.",
          "يستقبل النتيجة الخام ويصيغها بلغة طبيعية مفهومة.",
        ],
      },
      { p: "النقطة الحاسمة أمنيًا: التنفيذ يتم بصلاحيات المستخدم السائل نفسه. فلو كان لديه وصول لإدارته فقط، الوكيل لن يرى غيرها — سياسات أمن مستوى الصف تعمل تلقائيًا." },
      { p: "وهذا يفسّر لماذا جودة النموذج الدلالي تحدد جودة الإجابة. إن كانت الأعمدة بأسماء مثل COL_A وCOL_B وبلا أوصاف، فالوكيل يخمّن. وإن كانت بأسماء واضحة ومترادفات معرّفة وعلاقات صحيحة، تصبح الإجابات دقيقة." },

      { h: "الخيارات الرسمية من مايكروسوفت" },
      {
        table: {
          headers: ["الخيار", "ماذا يفعل", "متى تستخدمه"],
          rows: [
            ["خادم MCP البعيد", "استعلام النماذج الدلالية بالمحادثة وتوليد DAX", "تحليل واستكشاف البيانات"],
            ["خادم MCP المحلي", "تأليف وتعديل النماذج الدلالية", "بناء الجداول والمقاييس والعلاقات"],
            ["Power BI Agentic", "حزمة مهارات وأدوات تُثبَّت في وكيلك البرمجي", "تطوير النماذج والتقارير بأفضل الممارسات"],
            ["Fabric Data Agent", "وكيل محادثة فوق عدة مصادر بيانات", "واجهة سؤال وجواب لغير التقنيين"],
          ],
        },
      },

      { h: "Fabric Data Agent بالتفصيل" },
      { p: "هذا الخيار الأقرب لفكرة «وكيل يتصل بكل أنظمتي». يربط حتى خمسة مصادر لكل وكيل بأي تركيبة: Lakehouse وWarehouse ونماذج Power BI وقواعد KQL وOntologies وMicrosoft Graph." },
      { p: "آلية عمله: يحلل السؤال، يحدد المصدر الأنسب من بين المتصلة، يولّد الاستعلام المناسب لنوع المصدر — SQL أو KQL أو DAX — وينفّذه ويصيغ النتيجة." },
      { p: "حدوده التي يجب معرفتها قبل البناء:" },
      {
        list: [
          "خمسة مصادر كحد أقصى لكل وكيل. للتغطية الأوسع تُنشئ عدة وكلاء متخصصين.",
          "الردود محدودة بـ25 صفًا و25 عمودًا — مصمَّم للرؤى لا لتصدير مجموعات بيانات.",
          "يتطلب سعة Fabric بحجم F2 أو أعلى.",
          "يوفّر نقطة نهاية API تُستدعى من Copilot Studio وMicrosoft Foundry وتطبيقاتك.",
        ],
      },
      { p: "وحدّ الخمسة مصادر ليس عيبًا بقدر ما هو توجيه تصميمي: وكيل واحد يعرف كل شيء يعطي إجابات أسوأ من عدة وكلاء متخصصين، كل واحد يفهم مجاله بعمق." },

      { h: "أدوات مفتوحة المصدر" },
      { p: "الخوادم الرسمية تغطي الأساسيات، والمجتمع يغطي الفجوات — خاصة في الحوكمة وتحرير التقارير." },
      {
        table: {
          headers: ["المشروع", "ما يضيفه"],
          rows: [
            ["sulaiman013/powerbi-mcp", "حوكمة: إخفاء PII قبل وصولها للنموذج، حجب أو تجزئة أعمدة، سجل تدقيق مقاوم للتلاعب، ووضع قراءة فقط. وللمشرفين: جرد كل مساحات العمل ورصد النماذج بلا تصنيف حساسية"],
            ["mateuscbrito/powerbi-server", "تحكم برمجي في تقارير PBIR: إنشاء وتعديل المقاييس، بناء العلاقات، إنشاء أدوار RLS، وقائمة بأثقل الأعمدة استهلاكًا للذاكرة"],
          ],
        },
      },
      { p: "ميزة وضع القراءة فقط تحديدًا تستحق الانتباه. تجعل الوكيل قادرًا على النظر دون التعديل — وهذي أول ما تفعّله في أي تجربة أولى." },

      { h: "الترتيب الصحيح للبناء" },
      { p: "أكبر سوء فهم في هذا المجال: أن الوكيل «يتصل بكل الأنظمة». الوكيل لا يتصل بشيء — بل يستعلم عن طبقة بيانات موحّدة يجب أن تكون موجودة أصلًا." },
      { p: "الترتيب الذي يعمل:" },
      {
        list: [
          "تكامل البيانات: جمع أنظمتك المتفرقة في مستودع أو Lakehouse موحّد.",
          "نموذج دلالي نظيف: أسماء أعمال واضحة، أوصاف، مترادفات، وعلاقات صحيحة.",
          "مقاييس معرَّفة مسبقًا: عرّف «معدل الإنجاز» و«التذاكر المتأخرة» كمقاييس، لا تترك الوكيل يخترعها.",
          "وكيل فوق الطبقة الجاهزة، بوضع قراءة فقط أولًا.",
          "توسيع تدريجي بعد قياس الدقة على أسئلة حقيقية.",
        ],
      },
      { p: "تخطي الخطوتين الثانية والثالثة هو سبب فشل أغلب هذي المشاريع. تحصل على وكيل يعطيك نصف صورة بثقة كاملة — وهذا أسوأ من عدم وجوده، لأن الثقة الزائفة تُبنى عليها قرارات." },

      { h: "أين تفشل هذي المشاريع" },
      {
        list: [
          "نموذج دلالي فوضوي: أسماء تقنية بلا أوصاف تجعل الوكيل يخمّن العلاقات.",
          "غياب المقاييس المعرَّفة: كل سؤال يُحسب بطريقة مختلفة، فتختلف الأرقام بين جلسة وأخرى.",
          "توقعات غير واقعية: المستخدمون يتوقعون تصدير بيانات، والأداة مصممة للرؤى المختصرة.",
          "تجاهل التحقق: لا أحد يقارن مخرجات الوكيل بتقرير معروف صحته.",
          "منح صلاحيات تعديل مبكرًا قبل إثبات دقة القراءة.",
        ],
      },

      { h: "محاذير موثّقة رسميًا" },
      { p: "التوثيق نفسه ينبّه بوضوح: النموذج اللغوي قد ينتج نتائج غير متوقعة أو غير دقيقة تؤدي لتغييرات غير مقصودة في النموذج الدلالي. كما قد يكشف معلومات حساسة — بيانات أو بيانات وصفية — في السجلات أو الردود." },
      { p: "التوصية العملية: خذ نسخة احتياطية من النموذج قبل أي عملية تعديل، وابدأ بوضع القراءة فقط على نموذج غير حرج، وراجع سجل الاستدعاءات قبل توسيع الصلاحيات." },
    ],
    bodyEn: [
      { p: "In most organizations the gap isn't data — it's access to it. A manager wants a number, opens a ticket with the data team, waits two days, and gets a report that raises three new questions. The analyst spends their time on repeat requests instead of deep analysis." },
      { p: "AI agents wired into Power BI target exactly that loop: the user asks in plain language, the agent translates it into a query, executes it, and returns the answer. But the idea is widely misunderstood, so let's start from the foundation." },

      { h: "What MCP is and why it changed things" },
      { p: "The Model Context Protocol is an open standard defining how an AI model talks to external tools and data sources in a structured, secure way. Before it, every model-to-system connection was a custom integration built from scratch." },
      { p: "The three terms you'll see in every doc:" },
      {
        list: [
          "Host: the environment you work in — such as VS Code.",
          "Client: the component that connects to servers and consumes their capabilities — such as Copilot.",
          "Server: a local or remote program exposing tools and resources — such as the Power BI server.",
        ],
      },
      { p: "This split matters practically, not theoretically: any client supporting the protocol can use any server supporting it. You build the integration once, and it works with Claude, Copilot, and others." },

      { h: "What the cycle actually looks like" },
      { p: "Take a real question: \"how many tickets have been open more than 30 days, per department?\" What happens behind the scenes:" },
      {
        list: [
          "The agent reads the semantic model schema: tables, columns, relationships, and defined measures.",
          "It identifies the relevant tables and builds an appropriate DAX query.",
          "It executes the query through the model's XMLA endpoint.",
          "It receives the raw result and phrases it in understandable natural language.",
        ],
      },
      { p: "The critical security point: execution runs under the asking user's own permissions. If they only have access to their department, the agent won't see beyond it — row-level security applies automatically." },
      { p: "This explains why semantic model quality determines answer quality. If columns are named COL_A and COL_B with no descriptions, the agent guesses. With clear names, defined synonyms, and correct relationships, answers become accurate." },

      { h: "The official Microsoft options" },
      {
        table: {
          headers: ["Option", "What it does", "When to use it"],
          rows: [
            ["Remote MCP server", "Conversational querying of semantic models and DAX generation", "Analysis and data exploration"],
            ["Local MCP server", "Authoring and editing semantic models", "Building tables, measures, and relationships"],
            ["Power BI Agentic", "A skills and tools bundle installed into your coding agent", "Developing models and reports per best practices"],
            ["Fabric Data Agent", "A conversational agent across several data sources", "A Q&A interface for non-technical users"],
          ],
        },
      },

      { h: "Fabric Data Agent in detail" },
      { p: "This is the option closest to the \"an agent connected to all my systems\" idea. It connects up to five sources per agent in any combination: Lakehouse, Warehouse, Power BI models, KQL databases, ontologies, and Microsoft Graph." },
      { p: "How it works: it parses the question, determines the most relevant connected source, generates the query type appropriate to that source — SQL, KQL, or DAX — then executes it and phrases the result." },
      { p: "Its limits, which you should know before building:" },
      {
        list: [
          "Five sources maximum per agent. For broader coverage you create several specialized agents.",
          "Responses cap at 25 rows and 25 columns — designed for insight, not dataset export.",
          "It requires F2 or higher Fabric capacity.",
          "It exposes an API endpoint callable from Copilot Studio, Microsoft Foundry, and your own apps.",
        ],
      },
      { p: "The five-source cap is less a flaw than a design signal: one agent that knows everything gives worse answers than several specialized agents that each understand their domain deeply." },

      { h: "Open-source tools" },
      { p: "The official servers cover the fundamentals; the community covers the gaps — particularly governance and report editing." },
      {
        table: {
          headers: ["Project", "What it adds"],
          rows: [
            ["sulaiman013/powerbi-mcp", "Governance: mask PII before the AI sees it, block or hash columns, a tamper-evident audit log, and read-only mode. For admins: inventory every workspace and find models with no sensitivity label"],
            ["mateuscbrito/powerbi-server", "Programmatic control over PBIR reports: create and update measures, build relationships, create RLS roles, and list the heaviest columns by memory usage"],
          ],
        },
      },
      { p: "The read-only mode deserves particular attention. It lets the agent look but not touch — and it's the first thing you enable in any initial trial." },

      { h: "The correct build order" },
      { p: "The biggest misconception in this space: that the agent \"connects to all systems.\" The agent connects to nothing — it queries a unified data layer that must already exist." },
      { p: "The order that works:" },
      {
        list: [
          "Data integration: consolidate scattered systems into a unified warehouse or Lakehouse.",
          "A clean semantic model: clear business names, descriptions, synonyms, and correct relationships.",
          "Pre-defined measures: define \"completion rate\" and \"overdue tickets\" as measures; don't let the agent invent them.",
          "An agent on top of the ready layer, in read-only mode first.",
          "Gradual expansion after measuring accuracy on real questions.",
        ],
      },
      { p: "Skipping steps two and three is why most of these projects fail. You get an agent that gives you half a picture with full confidence — worse than none, because decisions get built on false confidence." },

      { h: "Where these projects fail" },
      {
        list: [
          "A messy semantic model: technical names with no descriptions force the agent to guess relationships.",
          "Missing defined measures: every question is calculated differently, so numbers shift between sessions.",
          "Unrealistic expectations: users expect data export while the tool is built for concise insight.",
          "No validation: nobody compares the agent's output against a report known to be correct.",
          "Granting write permissions early, before read accuracy is proven.",
        ],
      },

      { h: "Officially documented cautions" },
      { p: "The documentation itself warns clearly: the language model may produce unexpected or inaccurate results leading to unintended changes in the semantic model. It may also expose sensitive information — data or metadata — in logs or responses." },
      { p: "The practical recommendation: back up the model before any modifying operation, start in read-only mode against a non-critical model, and review the call log before expanding permissions." },
    ],
    refs: [
      { label: "Power BI MCP servers — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/mcp-servers-overview" },
      { label: "Fabric data agent — Microsoft Learn", url: "https://learn.microsoft.com/en-us/fabric/data-science/concept-data-agent" },
      { label: "Power BI Agentic — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/developer/agentic/power-bi-agentic-overview" },
      { label: "sulaiman013/powerbi-mcp", url: "https://github.com/sulaiman013/powerbi-mcp" },
      { label: "mateuscbrito/powerbi-server", url: "https://github.com/mateuscbrito/powerbi-server" },
    ],
  },
  {
    slug: "aiops-root-cause-analysis-stack",
    title: "AIOps: كيف تنتقل من مراقبة تُنبّهك إلى نظام يشخّص العطل",
    titleEn: "AIOps: Moving From Monitoring That Alerts You to a System That Diagnoses",
    date: "2026-07",
    tag: "OPERATIONS",
    excerpt:
      "كل منصة مراقبة تدّعي اليوم أنها مدعومة بالذكاء الاصطناعي. لكن الفرق بين كشف الشذوذ وتشخيص السبب الجذري فرق جوهري — هنا شرح للفرق، وتصنيف للأدوات، وخطة تبنٍّ قابلة للتنفيذ.",
    excerptEn:
      "Every monitoring platform now claims to be AI-powered. But the gap between flagging an anomaly and diagnosing a root cause is fundamental — here's the difference explained, the tools classified, and an adoption plan you can execute.",
    body: [
      { p: "مشكلة فرق التشغيل ليست نقص البيانات بل فائضها. عشرات آلاف التنبيهات شهريًا، وأغلبها ضجيج. ومهندس المناوبة يقضي أول عشرين دقيقة من كل حادثة يجمع الصورة يدويًا من ثلاث لوحات مختلفة." },
      { p: "الأسوأ أن كثرة الإنذارات الكاذبة تولّد ما يُسمى إرهاق التنبيهات: الفريق يتجاهل التنبيهات تدريجيًا، فيمر التنبيه الحقيقي دون انتباه. AIOps وُجدت لمعالجة هذي الحلقة." },

      { h: "الفرق بين الارتباط والسببية" },
      { p: "هذا الفرق هو جوهر الموضوع كله، وأغلب التسويق يتجاهله عمدًا. لنوضحه بمثال." },
      { p: "تخيّل حادثة: تطبيقك بطيء. الأداة تخبرك أن استهلاك المعالج ارتفع في قاعدة البيانات، وأن زمن الاستجابة زاد، وأن معدل الأخطاء ارتفع — كلها في نفس اللحظة." },
      {
        list: [
          "أداة ارتباط (correlation) تقول لك: هذي الثلاثة حدثت معًا. وتترك لك استنتاج العلاقة بينها.",
          "أداة سببية (causation) تقول لك: نشر جديد أدخل استعلامًا بلا فهرس، فارتفع استهلاك المعالج، فتأخرت الاستجابات، فبدأت المهل تنتهي بأخطاء.",
        ],
      },
      { p: "الأولى تعطيك ثلاث نوافذ لتفتحها. الثانية تعطيك سببًا وإجراءً. الفرق بينهما هو الفرق بين تقليل الضجيج وتقليل زمن الإصلاح فعليًا." },

      { h: "ثلاث فئات، والخلط بينها أشيع خطأ في الشراء" },
      {
        table: {
          headers: ["الفئة", "أمثلة", "تقدّم", "لا تقدّم"],
          rows: [
            ["منصات مراقبة", "Datadog · Dynatrace · New Relic", "البيانات وكشف الشذوذ", "التحقيق يبقى يدويًا في الغالب"],
            ["AIOps تقليدي", "Moogsoft · BigPanda", "تقليل الضجيج وتجميع التنبيهات المترابطة", "لا تشخّص السبب الجذري"],
            ["تحقيق أصلي بالذكاء الاصطناعي", "الجيل الوكيلي الجديد", "تحقيق مؤتمت وتتبّع سلاسل سببية بالأدلة", "يحتاج طبقة تتبع ناضجة أسفله"],
          ],
        },
      },
      { p: "النتيجة العملية: أغلب المؤسسات لا تعتمد على أداة واحدة، بل تبني سلسلة من طبقتين أو ثلاث — طبقة مراقبة تجمع البيانات، وفوقها طبقة تحقيق." },

      { h: "الأساس الذي لا يُتخطّى: طبقة التتبع" },
      { p: "لا توجد طبقة AIOps ناجحة فوق بيانات مجزّأة. الأساس هو OpenTelemetry بمخططها الموحّد للإشارات الثلاث." },
      {
        list: [
          "المقاييس (Metrics): أرقام عبر الزمن — استهلاك المعالج، عدد الطلبات، زمن الاستجابة. تخبرك أن شيئًا تغيّر.",
          "السجلات (Logs): أحداث نصية بتفاصيل. تخبرك ماذا حدث بالضبط في لحظة معينة.",
          "التتبعات (Traces): رحلة الطلب الواحد عبر كل الخدمات. تخبرك أين تأخّر بالضبط.",
        ],
      },
      { p: "قيمة التوحيد أن الثلاثة تتشارك معرّفات مشتركة. فحين يرى النموذج ارتفاعًا في المقاييس، يستطيع القفز مباشرة للتتبعات المرتبطة به، ومنها للسجلات — وهذا يحسّن دقة السبب الجذري تحسينًا كبيرًا مقارنة بتنبيه مقياس معزول." },
      { p: "ونقطة جوهرية: التنبيه التقليدي القائم على قواعد ثابتة يكشف أنماط الفشل المعروفة مسبقًا فقط. أما جوهر AIOps فهو كشف الشذوذ غير المتوقع — وهو ما يسبب حصة كبيرة من أعطال الإنتاج." },

      { h: "أدوات مفتوحة المصدر — ابدأ من هنا" },
      {
        table: {
          headers: ["الأداة", "تقدّم"],
          rows: [
            ["HolmesGPT", "تحليل سبب جذري مدعوم بالذكاء الاصطناعي فوق بيئات Kubernetes"],
            ["keephq/keep", "ربط تنبيهات وrunbooks ذاتية التشغيل: إعادة تشغيل، توسعة، وتراجع عن إعداد"],
            ["Aurora", "وكلاء LangGraph يحققون عبر AWS وAzure وGCP وKubernetes، بتكامل PagerDuty وDatadog وGrafana وSlack — رخصة Apache 2.0"],
          ],
        },
      },
      { p: "هذي الأدوات تتعامل فعليًا مع كثير من الحوادث الروتينية دون تدخل بشري، فيتفرغ المهندسون للأعطال المعقدة الجديدة التي تحتاج حكمًا بشريًا حقيقيًا." },

      { h: "الخيارات التجارية" },
      { p: "Dynatrace يقود للمؤسسات الكبيرة المحتاجة تحليلًا سببيًا حتميًا لا ارتباطًا إحصائيًا — أي محرك يبني خريطة اعتماديات فعلية بين المكوّنات." },
      { p: "وLogz.io OrionIQ يمثّل الجيل الوكيلي: وكلاء يبدأون العمل لحظة إطلاق التنبيه، ويحللون السجلات والمقاييس والتتبعات في آن واحد، وينتجون سببًا جذريًا موحّدًا قبل أن يفتح المهندس أي لوحة. والأهم أنهم يعملون ضمن الإجراءات والـ runbooks التي وضعها فريقك فعلًا." },
      { p: "أما OpenObserve فيجمع طبقة ذكاء ثلاثية مع تتبع كامل الدقة بتكلفة تخزين أقل بكثير من المنصات التقليدية — نقطة تستحق الحساب في البيئات كثيفة السجلات." },

      { h: "كيف تقيس النجاح فعليًا" },
      { p: "لا تقيّم أداة AIOps بالعرض التجريبي. قِسها بأرقام قبل وبعد على بيئتك أنت:" },
      {
        list: [
          "نسبة تقليل التنبيهات: كم تنبيهًا وصل للمناوب قبل التطبيق وبعده؟",
          "دقة التشخيص: من أصل عشر حوادث حقيقية، كم مرة أصاب السبب الجذري؟",
          "معدل الخطأ الواثق: كم مرة أعطى سببًا خاطئًا بصياغة واثقة؟ هذا أخطر مقياس.",
          "زمن الوصول للسبب: كم دقيقة وفّر مقارنة بالتحقيق اليدوي؟",
          "التغطية: كم نسبة من أنظمتك مشمولة فعليًا بالتتبع؟",
        ],
      },
      { p: "المقياس الثالث تحديدًا يُهمَل دائمًا. أداة تخطئ بصمت أفضل من أداة تخطئ بثقة، لأن الثانية تقود الفريق في الاتجاه الخاطئ بسرعة." },

      { h: "السؤال الحاسم عند المقارنة" },
      { p: "هل تتعلم الأداة من بيئتك مع الوقت؟ أداة تعطيك في اليوم المئة نفس التحليل العام الذي أعطته في اليوم الأول لم تلتقط المعرفة المؤسسية التي تجعل المهندس المخضرم فعّالًا." },
      { p: "ابحث عمّا يبني معرفة خاصة بمنظمتك من الحوادث السابقة والـ runbooks وتغذية الفريق الراجعة. هذا ما يفصل مساعدًا مفيدًا عن شريك تشخيص حقيقي." },

      { h: "خطة تبنٍّ عملية" },
      {
        list: [
          "ابدأ من طبقة المراقبة التي تملكها أصلًا وفعّل ميزات كشف الشذوذ فيها قبل أي شراء جديد.",
          "وحّد المصادر تدريجيًا عبر OpenTelemetry collector بدل أن تبقى كل أداة جزيرة.",
          "اختر بيئة واحدة غير حرجة كساحة تجربة.",
          "جرّب أداة مفتوحة المصدر عليها لمدة شهر على الأقل.",
          "قِس المقاييس الخمسة أعلاه بصدق ودوّنها.",
          "وسّع للبيئات الأهم فقط بعد إثبات القيمة، ثم قيّم الحل التجاري.",
        ],
      },

      { h: "أخطاء شائعة" },
      {
        list: [
          "شراء منصة تجارية قبل توحيد التتبع — تدفع لأداة ذكية تقرأ بيانات ناقصة.",
          "توقّع أتمتة كاملة: الأدوات تقلّل زمن الإصلاح وإرهاق التنبيهات، لكنها لا تلغي الحاجة للحكم البشري.",
          "منح صلاحيات إصلاح تلقائي مبكرًا قبل قياس دقة التشخيص.",
          "إهمال الـ runbooks: أقوى الأدوات الوكيلية تعمل ضمن إجراءاتك المكتوبة — فإن لم تكن مكتوبة، تفقد أهم ميزة.",
        ],
      },
    ],
    bodyEn: [
      { p: "The problem for operations teams isn't a shortage of data but a surplus. Tens of thousands of alerts a month, most of them noise. And the on-call engineer spends the first twenty minutes of every incident manually assembling the picture from three different dashboards." },
      { p: "Worse, the volume of false alarms produces what's called alert fatigue: the team gradually starts ignoring alerts, so the real one passes unnoticed. AIOps exists to break that loop." },

      { h: "The difference between correlation and causation" },
      { p: "This distinction is the heart of the entire subject, and most marketing deliberately blurs it. Let's make it concrete." },
      { p: "Imagine an incident: your app is slow. The tool tells you database CPU spiked, response time increased, and error rate rose — all at the same moment." },
      {
        list: [
          "A correlation tool says: these three happened together. It leaves you to infer the relationship.",
          "A causation tool says: a new deployment introduced an unindexed query, which spiked CPU, which delayed responses, which caused timeouts to surface as errors.",
        ],
      },
      { p: "The first gives you three windows to open. The second gives you a cause and an action. That difference is the difference between reducing noise and actually reducing time to repair." },

      { h: "Three categories, and conflating them is the most common purchasing mistake" },
      {
        table: {
          headers: ["Category", "Examples", "Provides", "Doesn't provide"],
          rows: [
            ["Observability platforms", "Datadog · Dynatrace · New Relic", "The data and anomaly surfacing", "Investigation largely stays manual"],
            ["Classic AIOps", "Moogsoft · BigPanda", "Noise reduction and grouping of related alerts", "No root-cause diagnosis"],
            ["AI-native investigation", "The new agentic generation", "Automated investigation and causal-chain tracing with evidence", "Needs a mature telemetry layer beneath"],
          ],
        },
      },
      { p: "The practical upshot: most organizations don't rely on a single tool but build a chain of two or three layers — an observability layer gathering the data, with an investigation layer on top." },

      { h: "The foundation you can't skip: the telemetry layer" },
      { p: "No AIOps layer succeeds on fragmented data. The foundation is OpenTelemetry, with its unified schema across the three signals." },
      {
        list: [
          "Metrics: numbers over time — CPU usage, request counts, response time. They tell you something changed.",
          "Logs: textual events with detail. They tell you what exactly happened at a given moment.",
          "Traces: a single request's journey across every service. They tell you where exactly it was delayed.",
        ],
      },
      { p: "The value of unification is that all three share common identifiers. So when the model sees a metric spike, it can jump straight to the associated traces, and from there to the logs — dramatically improving root-cause accuracy compared to an isolated metric alert." },
      { p: "And a core point: traditional rule-based alerting catches only pre-known failure modes. The whole point of AIOps is detecting the unexpected anomalies — which cause a significant share of production outages." },

      { h: "Open-source tools — start here" },
      {
        table: {
          headers: ["Tool", "Provides"],
          rows: [
            ["HolmesGPT", "AI-powered root cause analysis over Kubernetes environments"],
            ["keephq/keep", "Alert correlation and autonomous runbooks: restarts, scale-outs, and config rollbacks"],
            ["Aurora", "LangGraph agents investigating across AWS, Azure, GCP, and Kubernetes, integrating with PagerDuty, Datadog, Grafana, and Slack — Apache 2.0"],
          ],
        },
      },
      { p: "These tools genuinely handle many routine incidents without human intervention, freeing engineers for the complex, novel failures that require real human judgment." },

      { h: "Commercial options" },
      { p: "Dynatrace leads for large enterprises needing deterministic causal AI rather than statistical correlation — an engine that builds an actual dependency map between components." },
      { p: "Logz.io's OrionIQ represents the agentic generation: agents begin the moment an alert fires, analyzing logs, metrics, and traces simultaneously, and producing a consolidated root cause before an engineer opens a single dashboard. Crucially, they operate within the procedures and runbooks your team has already established." },
      { p: "OpenObserve combines a three-layer AI stack with full-fidelity telemetry at dramatically lower storage cost than legacy platforms — worth calculating in log-heavy environments." },

      { h: "How to actually measure success" },
      { p: "Don't judge an AIOps tool by the demo. Measure it with before-and-after numbers on your own environment:" },
      {
        list: [
          "Alert reduction: how many alerts reached the on-call before and after?",
          "Diagnostic accuracy: out of ten real incidents, how many times did it get the root cause right?",
          "Confident-error rate: how often did it give a wrong cause in confident phrasing? This is the most dangerous metric.",
          "Time to cause: how many minutes did it save versus manual investigation?",
          "Coverage: what share of your systems is actually instrumented?",
        ],
      },
      { p: "The third metric is always neglected. A tool that fails silently is better than one that fails confidently, because the second leads the team in the wrong direction faster." },

      { h: "The decisive comparison question" },
      { p: "Does the tool learn from your environment over time? A tool that gives you the same generic analysis on day 100 as on day 1 hasn't captured the institutional knowledge that makes an experienced engineer effective." },
      { p: "Look for what builds organization-specific knowledge from past incidents, runbooks, and team feedback. That's what separates a useful assistant from a genuine diagnostic partner." },

      { h: "A practical adoption plan" },
      {
        list: [
          "Start from the monitoring layer you already own and enable its anomaly detection before buying anything new.",
          "Unify sources gradually through an OpenTelemetry collector instead of leaving each tool an island.",
          "Pick one non-critical environment as your proving ground.",
          "Trial an open-source tool on it for at least a month.",
          "Measure the five metrics above honestly and write them down.",
          "Expand to more important environments only after proving value, then evaluate the commercial option.",
        ],
      },

      { h: "Common mistakes" },
      {
        list: [
          "Buying a commercial platform before unifying telemetry — you pay for a smart tool reading incomplete data.",
          "Expecting full automation: these tools reduce MTTR and alert fatigue, but don't remove the need for human judgment.",
          "Granting auto-remediation permissions early, before measuring diagnostic accuracy.",
          "Neglecting runbooks: the strongest agentic tools operate within your written procedures — if they aren't written, you lose the biggest advantage.",
        ],
      },
    ],
    refs: [
      { label: "OpenTelemetry", url: "https://opentelemetry.io" },
      { label: "keephq/keep", url: "https://github.com/keephq/keep" },
      { label: "GitHub — root-cause-analysis topic", url: "https://github.com/topics/root-cause-analysis" },
    ],
  },
  {
    slug: "ai-voice-chat-internal-systems-integration",
    title: "بناء وكيل صوت ومحادثة متصل بأنظمتك الداخلية: الدليل الكامل",
    titleEn: "Building a Voice and Chat Agent Wired Into Your Internal Systems: The Full Guide",
    date: "2026-07",
    tag: "VOICE AI",
    excerpt:
      "الوكيل الذي لا يقرأ من أنظمتك ولا يكتب فيها ليس أكثر من IVR بصوت أجمل. هنا شرح للمعمارية الكاملة، وكيف يبدو استدعاء نظام أثناء المكالمة، والأدوات، وميزانية الاستجابة، والمتطلبات النظامية في السعودية.",
    excerptEn:
      "An agent that can't read from or write to your systems is just an IVR with a nicer voice. Here's the full architecture explained, what a mid-call system invocation actually looks like, the tools, the latency budget, and the Saudi regulatory requirements.",
    body: [
      { p: "أغلب مشاريع الوكلاء الصوتية تتوقف عند عرض تجريبي جميل: صوت طبيعي يجيب عن أسئلة عامة. لكن القيمة الحقيقية لا تبدأ إلا حين يتصل الوكيل بأنظمتك فعليًا — يقرأ حالة طلب، يفتح تذكرة، يتحقق من هوية." },
      { p: "هذي المقالة تشرح كيف يحدث ذلك تقنيًا، وما القيود التي ستصطدم بها." },

      { h: "الفرق الجوهري عن IVR التقليدي" },
      { p: "الـ IVR شجرة خيارات ثابتة: اضغط 1 للمبيعات، 2 للدعم. أي طلب خارج الشجرة يفشل. والوكيل الصوتي مختلف في ثلاثة أمور." },
      {
        list: [
          "يفهم اللغة الطبيعية بدل الأرقام: المتصل يقول ما يريد بجملة واحدة.",
          "يحتفظ بسياق المحادثة: يتذكر ما قيل قبل ثلاث جمل ويبني عليه.",
          "يتخذ قرارًا بأي أداة يستدعي، بدل تنفيذ مسار مكتوب مسبقًا.",
        ],
      },
      { p: "وهذا الفارق الثالث تحديدًا هو ما يجعل التكامل مع الأنظمة ممكنًا أصلًا." },

      { h: "المعمارية: نمط السلسلة (Cascade)" },
      { p: "النمط الافتراضي والأكثر تحكمًا يمر بأربع مراحل متتابعة لكل دورة حوار." },
      {
        list: [
          "الاتصالات (Telephony): استقبال المكالمة عبر SIP أو WebRTC.",
          "تحويل الكلام لنص (STT): يجب أن يكون streaming لا batch، أي يحوّل أثناء الكلام لا بعده.",
          "النموذج اللغوي (LLM): يفهم النية ويقرر الرد أو استدعاء أداة.",
          "تحويل النص لكلام (TTS): ينطق الرد بصوت طبيعي.",
        ],
      },
      { p: "وفوق هذي المراحل تجلس طبقة التنسيق (Orchestration) التي تدير الدورة كلها. البديل هو نموذج Speech-to-Speech واحد، لكنه صندوق مغلق لا يمكن ضبطه للهجات المحلية — لذلك السلسلة هي الافتراضي الصحيح للعربية." },
      { p: "ونقطة حاسمة: دقة تحويل الكلام لنص تحكم كل ما بعدها. لو كان النسخ خاطئًا، فكل مرحلة تالية خاطئة مهما كان النموذج ذكيًا." },

      { h: "ما الذي تحله طبقة التنسيق" },
      { p: "هذي الطبقة مسؤولة عن كل ما يجعل المحادثة تبدو طبيعية لا آلية." },
      {
        list: [
          "تحديد نهاية الدور: متى انتهى المتصل من كلامه فعلًا؟",
          "المقاطعة (barge-in): إسكات الوكيل فورًا حين يبدأ المستخدم بالكلام.",
          "كلمات التأكيد القصيرة أثناء الاستماع لتبدو المحادثة حية.",
          "ملء الفراغ الصوتي أثناء انتظار النموذج بدل صمت محرج.",
          "الاحتفاظ بحالة الجلسة عبر دورات الحوار.",
          "استدعاء الأنظمة الخارجية أثناء المكالمة.",
        ],
      },

      { h: "كيف يبدو استدعاء نظام أثناء المكالمة" },
      { p: "لنأخذ سيناريو واقعيًا: موظف يتصل ليسأل عن حالة طلب صيانة. ما يحدث فعليًا:" },
      {
        list: [
          "المتصل يقول: «أبي أعرف وش صار في طلب الصيانة حقي».",
          "الوكيل يحتاج رقم هوية أو رقم طلب، فيسأل عنه.",
          "بعد الحصول عليه، يستدعي دالة معرَّفة مسبقًا مثل get_ticket_status برقم الطلب كمعامل.",
          "البوابة الوسيطة تستقبل الاستدعاء، تتحقق من الصلاحيات، وتستعلم من نظام التذاكر.",
          "ترجع النتيجة كبيانات منظمة: الحالة، تاريخ آخر تحديث، الفني المسؤول.",
          "الوكيل يصيغها بلغة طبيعية وينطقها.",
        ],
      },
      { p: "الخطوة الرابعة هي جوهر التصميم الآمن. الوكيل لا يتصل بنظام التذاكر مباشرة أبدًا — بل يمر عبر طبقة تتحكم بما يُسمح به." },

      { h: "الأدوات حسب نموذج التشغيل" },
      {
        table: {
          headers: ["الأداة", "النوع", "الأنسب لـ"],
          rows: [
            ["LiveKit Agents", "مفتوح المصدر (WebRTC)", "تحكم كامل واستضافة ذاتية وسيادة بيانات — الوكيل process ينضم للغرفة كمشارك"],
            ["Pipecat", "مفتوح المصدر (Python)", "تحكم دقيق في الـ pipeline والاستجابة، والأوضح للتعلّم لأنك ترى كل طبقة"],
            ["Vapi · Retell · Bland", "مُدارة", "سرعة الإطلاق بلا بنية تحتية — لكن ضعفها الأساسي في اللهجات العربية"],
            ["Hams.AI · نبرة · Hamsa", "محلية وإقليمية", "اللهجة السعودية والخليجية، وتكامل الهاتف وواتساب"],
          ],
        },
      },
      { p: "الاختيار بين مفتوح ومُدار ليس تقنيًا فقط. الاستضافة الذاتية تعطيك سيطرة على مكان البيانات، وهذي نقطة نظامية لا رفاهية هندسية في السعودية." },

      { h: "أربعة أسئلة تفصل الادعاء عن الواقع" },
      { p: "عند تقييم أي مزوّد، هذي الأسئلة تكشف القدرة الفعلية على التكامل:" },
      {
        list: [
          "هل يدعم استدعاء الدوال أثناء المكالمة لا بعدها فقط؟ وكم يضيف كل استدعاء من زمن استجابة؟",
          "هل يدعم رؤوس مصادقة مخصصة — OAuth2 أو مفاتيح API أو mTLS؟",
          "هل يستطيع الوصول لأنظمة محلية خلف جدار ناري، أم يشترط كشفها للإنترنت؟",
          "هل يوفّر webhooks للأحداث: بداية المكالمة ونهايتها، النص الكامل، والنتيجة؟",
        ],
      },
      { p: "السؤال الثالث هو الفاصل عمليًا. أغلب المنصات المُدارة تتطلب نقطة نهاية عامة، وهذا يعني أنك ستبني طبقة وسيطة على أي حال." },

      { h: "المعمارية الواقعية للأنظمة المحلية" },
      { p: "التصميم الذي يعمل: الوكيل يتحدث إلى بوابة API تملكها أنت، وهي وحدها من يتحدث لأنظمتك الداخلية." },
      { p: "هذي الطبقة تعطيك أربعة مكاسب دفعة واحدة:" },
      {
        list: [
          "تحكم دقيق بالصلاحيات: تحدد بالضبط أي عمليات مسموحة وعلى أي بيانات.",
          "سجل تدقيق لكل استدعاء: من طلب ماذا ومتى وبأي نتيجة.",
          "إخفاء تفاصيل الأنظمة الداخلية عن المزوّد الخارجي.",
          "حرية تبديل مزوّد الصوت لاحقًا دون إعادة بناء التكاملات من الصفر.",
        ],
      },
      { p: "المكسب الرابع يُستهان به دائمًا. سوق الوكلاء الصوتية يتغيّر بسرعة، ومن يبني تكاملاته مباشرة داخل منصة مزوّد واحد يدفع ثمن التبديل مرتين." },

      { h: "ميزانية الاستجابة تحكم كل قرار" },
      { p: "في العالم الصوتي، زمن الاستجابة هو المنتج نفسه. لا تقيّم أي مكوّن دون حساب كلفته الزمنية." },
      {
        list: [
          "أقل من 300 ملي ثانية: يُحس طبيعيًا كإنسان.",
          "من 300 إلى 500: مقبول وطبيعي.",
          "من 500 إلى 800: يبدأ يبدو آليًا.",
          "فوق 1500: المتصل يقفل الخط.",
        ],
      },
      { p: "كل استدعاء API أثناء المكالمة يُخصم من هذي الميزانية. أمامك خياران: تصميم استدعاءات سريعة جدًا بفهارس مناسبة، أو تشغيل صوت انتظار قصير أثناء الجلب — والثاني أسهل وأكثر واقعية مع الأنظمة القديمة." },

      { h: "الجانب النظامي في السعودية" },
      { p: "هذا القسم يُطرح في الأسبوع الأول لا في الشهر السادس، لأن النظام قد يوقف المشروع قبل أن تفعل التقنية." },
      {
        list: [
          "أي جهة تقدّم أو تعيد بيع خدمات صوتية داخل المملكة يجب أن تعمل عبر مشغّل مرخّص من هيئة الاتصالات والفضاء والتقنية (CST).",
          "هناك تصريح VVSP منفصل للخدمات الصوتية الافتراضية.",
          "وتسجيل منفصل لخدمات مراكز الاتصال يتطلب سجلًا تجاريًا ساريًا.",
          "نظام حماية البيانات الشخصية (PDPL) بإشراف SDAIA يحكم البيانات المجمّعة عبر المكالمات، بغرامات تصل إلى 5 ملايين ريال قابلة للمضاعفة عند تكرار المخالفة.",
        ],
      },
      { p: "ونقطة أخلاقية تتحول تدريجيًا لمتطلب نظامي: إفصاح الوكيل عن كونه نظامًا آليًا لا إنسانًا في بداية المكالمة." },
      { p: "هذا ليس استشارة قانونية — راجع cst.gov.sa وsdaia.gov.sa مباشرة، وأشرك الجهة القانونية قبل أي التزام تعاقدي." },

      { h: "من أين تبدأ عمليًا" },
      {
        list: [
          "اختر حالة استخدام واحدة ضيقة ومتكررة، مثل الاستعلام عن حالة طلب.",
          "ابنِ البوابة الوسيطة أولًا واختبرها بدون أي وكيل صوتي.",
          "جرّب النص قبل الصوت: وكيل محادثة نصي يكشف مشاكل المنطق بتكلفة أقل بكثير.",
          "أضف الصوت بعد استقرار المنطق، وقِس زمن الاستجابة في كل دورة.",
          "اختبر بلهجة حقيقية من متصلين فعليين لا بتسجيلات معملية.",
        ],
      },
      { p: "الخطأ الأشيع في التسلسل: البدء بالصوت مباشرة. تنتهي وأنت تصحّح مشاكل منطق واستدعاءات وأنت تحت ضغط زمن الاستجابة — بدل أن تكون قد حللتها في واجهة نصية هادئة." },
    ],
    bodyEn: [
      { p: "Most voice agent projects stall at a pretty demo: a natural voice answering generic questions. But the real value only begins when the agent actually connects to your systems — reading a request's status, opening a ticket, verifying an identity." },
      { p: "This article explains how that happens technically, and which constraints you'll run into." },

      { h: "The fundamental difference from a traditional IVR" },
      { p: "An IVR is a fixed decision tree: press 1 for sales, 2 for support. Anything outside the tree fails. A voice agent differs in three ways." },
      {
        list: [
          "It understands natural language instead of digits: the caller states what they want in one sentence.",
          "It holds conversational context: it remembers what was said three turns ago and builds on it.",
          "It decides which tool to invoke, instead of executing a pre-written path.",
        ],
      },
      { p: "That third difference is precisely what makes system integration possible at all." },

      { h: "The architecture: the cascade pattern" },
      { p: "The default and most controllable pattern runs four sequential stages per conversational turn." },
      {
        list: [
          "Telephony: receiving the call over SIP or WebRTC.",
          "Speech-to-text (STT): must be streaming, not batch — transcribing while speaking, not after.",
          "The language model (LLM): understands intent and decides to reply or call a tool.",
          "Text-to-speech (TTS): speaks the reply in a natural voice.",
        ],
      },
      { p: "Above these stages sits the orchestration layer managing the whole cycle. The alternative is a single speech-to-speech model, but that's a closed box that can't be tuned for local dialects — which is why the cascade is the correct default for Arabic." },
      { p: "A decisive point: STT accuracy gates everything downstream. If transcription is wrong, every later stage is wrong no matter how capable the model is." },

      { h: "What the orchestration layer solves" },
      { p: "This layer is responsible for everything that makes a conversation feel natural rather than mechanical." },
      {
        list: [
          "Turn detection: when has the caller actually finished speaking?",
          "Barge-in: silencing the agent instantly when the user starts talking.",
          "Short acknowledgments while listening, so the conversation feels alive.",
          "Filling the audio gap while waiting on the model instead of awkward silence.",
          "Holding session state across conversational turns.",
          "Calling external systems during the call.",
        ],
      },

      { h: "What a mid-call system invocation looks like" },
      { p: "Take a realistic scenario: an employee calls to ask about a maintenance request status. What actually happens:" },
      {
        list: [
          "The caller says: \"I want to know what happened with my maintenance request.\"",
          "The agent needs an ID or request number, so it asks for one.",
          "Once it has it, it invokes a pre-defined function such as get_ticket_status with the request number as a parameter.",
          "The middleware gateway receives the call, checks permissions, and queries the ticketing system.",
          "It returns the result as structured data: status, last update date, assigned technician.",
          "The agent phrases it in natural language and speaks it.",
        ],
      },
      { p: "Step four is the heart of a secure design. The agent never talks to the ticketing system directly — it goes through a layer that controls what's permitted." },

      { h: "Tools by operating model" },
      {
        table: {
          headers: ["Tool", "Type", "Best for"],
          rows: [
            ["LiveKit Agents", "Open source (WebRTC)", "Full control, self-hosting, and data sovereignty — the agent is a process that joins the room as a participant"],
            ["Pipecat", "Open source (Python)", "Fine-grained pipeline and latency control, and the clearest for learning since you see every layer"],
            ["Vapi · Retell · Bland", "Managed", "Fast launch with no infrastructure — but their core weakness is Arabic dialect"],
            ["Hams.AI · Nabrah · Hamsa", "Local and regional", "Saudi and Gulf dialect, with telephony and WhatsApp integration"],
          ],
        },
      },
      { p: "Choosing between open and managed isn't purely technical. Self-hosting gives you control over where data lives, and in Saudi Arabia that's a regulatory point, not an engineering luxury." },

      { h: "Four questions that separate claim from reality" },
      { p: "When evaluating any provider, these questions expose actual integration capability:" },
      {
        list: [
          "Does it support function calling during the call, not just afterward? And how much latency does each call add?",
          "Does it support custom authentication headers — OAuth2, API keys, or mTLS?",
          "Can it reach on-premise systems behind a firewall, or does it require them internet-exposed?",
          "Does it provide event webhooks: call start and end, full transcript, and outcome?",
        ],
      },
      { p: "The third question is the practical dividing line. Most managed platforms require a public endpoint, which means you'll be building a middleware layer regardless." },

      { h: "The realistic architecture for on-premise systems" },
      { p: "The design that works: the agent talks to an API gateway you own, and that gateway alone talks to your internal systems." },
      { p: "This layer gives you four wins at once:" },
      {
        list: [
          "Fine-grained permission control: you define exactly which operations are allowed on which data.",
          "An audit log of every invocation: who requested what, when, and with what result.",
          "Concealment of internal system details from the external provider.",
          "Freedom to swap voice providers later without rebuilding integrations from scratch.",
        ],
      },
      { p: "The fourth win is consistently underrated. The voice agent market is shifting fast, and whoever builds integrations directly inside one provider's platform pays the switching cost twice." },

      { h: "The latency budget governs every decision" },
      { p: "In the voice world, latency is the product itself. Never evaluate a component without accounting for its time cost." },
      {
        list: [
          "Under 300 milliseconds: feels human.",
          "300 to 500: acceptable and natural.",
          "500 to 800: starts to feel robotic.",
          "Above 1500: the caller hangs up.",
        ],
      },
      { p: "Every API call during a conversation is deducted from that budget. You have two options: design very fast calls with proper indexing, or play a short filler sound while fetching — the second is easier and more realistic with legacy systems." },

      { h: "The regulatory side in Saudi Arabia" },
      { p: "This section belongs in week one, not month six, because regulation can stop the project before the technology does." },
      {
        list: [
          "Any entity providing or reselling voice services inside the Kingdom must operate through a carrier licensed by the Communications, Space & Technology Commission (CST).",
          "There is a separate VVSP permit for virtual voice services.",
          "And a separate call-center services registration requiring a valid commercial registration.",
          "The Personal Data Protection Law (PDPL), enforced by SDAIA, governs data collected through calls, with fines reaching SAR 5 million, doubleable on repeat violation.",
        ],
      },
      { p: "One ethical point is gradually becoming a regulatory requirement: the agent disclosing that it's an automated system rather than a human at the start of the call." },
      { p: "This is not legal advice — consult cst.gov.sa and sdaia.gov.sa directly, and involve your legal function before any contractual commitment." },

      { h: "Where to start practically" },
      {
        list: [
          "Pick one narrow, repetitive use case, such as checking a request's status.",
          "Build the middleware gateway first and test it with no voice agent at all.",
          "Try text before voice: a text chat agent exposes logic problems at far lower cost.",
          "Add voice after the logic is stable, and measure latency on every turn.",
          "Test with real dialect from actual callers, not lab recordings.",
        ],
      },
      { p: "The most common sequencing error: starting with voice directly. You end up debugging logic and invocation problems while under latency pressure — instead of having solved them in a calm text interface first." },
    ],
    refs: [
      { label: "livekit/agents", url: "https://github.com/livekit/agents" },
      { label: "pipecat-ai/pipecat", url: "https://github.com/pipecat-ai/pipecat" },
      { label: "CST — هيئة الاتصالات والفضاء والتقنية", url: "https://www.cst.gov.sa" },
      { label: "SDAIA — الهيئة السعودية للبيانات والذكاء الاصطناعي", url: "https://sdaia.gov.sa" },
    ],
  },
  {
    slug: "hermes-vs-openclaw",
    title: "Hermes مقابل OpenClaw: وكيل يطوّر نفسه أم طبقة تحكم محلية؟",
    titleEn: "Hermes vs OpenClaw: A Self-Evolving Agent or a Local Control Plane?",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "الاثنان يشغّلان وكلاء ذكاء اصطناعي محليًا، لكن مركز ثقل كل واحد مختلف تمامًا: Hermes وكيل واحد يتعلّم طريقته مع الوقت، وOpenClaw طبقة تشغيل تدير قنوات وأجهزة ومساحات عمل ووكلاء متعددين.",
    excerptEn:
      "Both run AI agents locally, but their centers of gravity differ completely: Hermes is one agent that learns its own method over time, while OpenClaw is a runtime layer managing channels, devices, workspaces, and multiple agents.",
    body: [
      { p: "السؤال الحقيقي في المقارنة بين Hermes وOpenClaw ليس «أيهما أفضل»، بل «أي نموذج تشغيل يناسب طريقة عملك». الأول وكيل واحد تدرّبه ليتحسّن مع الوقت، والثاني منصة تشغّل عليها بيئة ذكاء اصطناعي محلية كاملة." },
      { svg: POSTURE_SVG },
      { h: "ما هو Hermes", p: "وكيل من Nous Research مبني حول حلقة تعلّم داخلية: يستطيع توليد مهارات من تجربته الفعلية، تحسينها أثناء الاستخدام، الاحتفاظ بذاكرة محدودة بين الجلسات، البحث في محادثات سابقة، وبناء نموذج أعمق عن المستخدم تدريجيًا. عمليًا يشبه موظفًا تدرّبه، لا مجرد واجهة أسئلة وأجوبة." },
      { h: "ما هو OpenClaw", p: "مركز ثقله مختلف: الـ Gateway هو النواة — خادم WebSocket يدير القنوات والعقد والجلسات والـ hooks. Gateway واحد طويل العمر يملك أسطح المراسلة، وتتصل به عملاء التحكم (تطبيق macOS، سطر الأوامر، واجهة الويب، الأتمتة). العقد (nodes) تتصل بقدرات معرّفة وأوامر على مستوى الجهاز." },
      { h: "لماذا ليسا بديلين مباشرين", p: "كلاهما يتصل بالنماذج، يستخدم أدوات، يحمّل مهارات، ويدعم مهامًا طويلة. لكن أقوى فكرة في كل منهما مختلفة: Hermes يتفوق حين تهمّك قدرة الوكيل على تحويل الدروس إلى ذاكرة إجرائية قابلة لإعادة الاستخدام، وOpenClaw يتفوق حين يهمّك تشغيل نظام محلي أوسع بتحكم أوضح في سلوك الـ gateway وحدود مساحات العمل وتوجيه القنوات والإضافات المثبّتة وإعداد وكلاء متعددين." },
      { h: "جدول المقارنة", p: "" },
      {
        table: {
          headers: ["المحور", "Hermes", "OpenClaw"],
          rows: [
            ["التموضع", "وكيل أولًا", "طبقة تحكم أولًا"],
            ["البنية الأساسية", "وكيل مستقل بحلقة تعلّم وذاكرة ومهارات", "زمن تشغيل حول Gateway للقنوات والعقد والجلسات"],
            ["نظام المهارات", "المهارات ذاكرة إجرائية يكتبها الوكيل ويعدّلها بنفسه", "تثبيت وتوزيع وتحميل على مستوى مساحة العمل عبر ClawHub"],
            ["التطوّر الذاتي للمهارات", "الميزة الجوهرية", "ليست هوية المنتج الأساسية"],
            ["نموذج الذاكرة", "ذاكرة محدودة + بحث بالجلسات + مزودات خارجية اختيارية", "ملفات مساحة عمل وجلسات وملفات مصادقة وتوجيه"],
            ["تعدد الوكلاء", "وكلاء فرعيون ومسارات عمل متوازية", "توجيه متعدد الوكلاء وعزل أصيل في التصميم"],
            ["التوسعة و MCP", "دعم MCP مع منظومة مهارات", "مهارات وإضافات وClawHub وعقد وتكاملات قنوات"],
            ["عزل مساحات العمل", "ممكن لكنه ليس محور المنتج", "جزء رئيسي من نموذج التشغيل"],
            ["الأنسب لـ", "الأفراد والفرق الصغيرة والعمل كثيف المنهجية", "المشغّلين وبيئات متعددة الوكلاء والقنوات"],
          ],
        },
      },
      { h: "البنية: وكيل أولًا مقابل طبقة تحكم أولًا", p: "Hermes وكيل واحد يتعلّم عبر الزمن، يملك ذاكرة ومهارات وأدوات ومزودات، ويحتفظ بما تعلّمه بين الجلسات. OpenClaw مبني حول الـ Gateway: القنوات والعقد والجلسات والـ hooks والعملاء والأجهزة ولوحة التحكم كلها تمر من خلاله — فيبدو كمنصة أو نظام تشغيل، لا كوكيل واحد يتحسّن." },
      { svg: ARCH_SVG },
      { p: "هذا الفرق يظهر حتى في الوصول للنماذج: Hermes أبسط حين تريد وكيلًا واحدًا متطورًا موصولًا بواجهة نموذج متوافقة، بينما OpenClaw أنسب حين يكون إعداد المزوّد جزءًا من نظام أكبر فيه ملفات مصادقة ومساحات عمل وتوجيه ووكلاء متعددون." },
      { h: "المهارات: أكبر فرق عملي", p: "مهارات Hermes ليست إضافات تجميلية — التوثيق يصفها كذاكرة إجرائية، تُخزَّن في مجلد مخصص وتُحمَّل عند الحاجة، وقد تكون مضمّنة أو مثبّتة أو خارجية أو من إنتاج الوكيل نفسه. المفتاح أن الوكيل يستطيع إنشاء مهاراته وتحديثها وحذفها عبر أداة مخصصة: بعد مهمة معقدة ناجحة، أو فشل تم تجاوزه، أو تصحيح من المستخدم، يحوّل التجربة لطريقة عمل قابلة لإعادة الاستخدام." },
      { svg: SKILL_LOOP_SVG },
      { p: "OpenClaw يدعم المهارات أيضًا لكن بتركيز مختلف: عبر ClawHub تبحث وتثبّت وتحدّث وتدير المهارات والإضافات لمساحة عمل محددة — قوته في التوزيع والتخصيص والتوسعة بالإضافات، لا في توليد المهارات ذاتيًا." },
      { h: "المقايضة التي يجب الانتباه لها", p: "التطوّر الذاتي للمهارات سيف ذو حدّين: مهارة يولّدها الوكيل قد تحسّن سير العمل، وقد تسبب انحرافًا (drift) إذا غيّرت عملية مستقرة في الاتجاه الخطأ. للاستخدام الفردي هذا مقبول؛ لسير عمل إنتاجي يحتاج مراجعة وضبطًا أقوى." },
      { h: "الشفافية والثقة", p: "السؤال ليس أيهما أكثر شفافية بشكل مطلق، بل أي جزء من النظام تحتاج شفافية فيه. Hermes يجعل حلقة الوكيل نفسها مقروءة — تربط المخرجات بالذاكرة والمهارات والتصحيحات السابقة. OpenClaw يعطيك نوعًا آخر من الرؤية: حالة الخدمة، وضع الـ gateway، توجيه الجلسات، بنية مساحات العمل، وتثبيت الإضافات — أنسب حين تكون المشكلة تعقيدًا تشغيليًا لا تشكيل سلوك وكيل." },
      { h: "أيهما تختار؟", p: "" },
      { svg: DECISION_SVG },
      { h: "الخلاصة", p: "Hermes أفضل لتدريب وكيل عمل موثوق يراكم الخبرة، وOpenClaw أفضل لبناء منصة وكلاء أوسع. إن كانت أولويتك تراكم القدرة عبر الذاكرة وتوليد المهارات، فـ Hermes يملك الفكرة الأميز. وإن كانت أولويتك تشغيل بيئة ذكاء اصطناعي محلية بأسطح متعددة ووكلاء معزولين وتحكم في الـ gateway، فـ OpenClaw يملك القصة الهندسية الأقوى. السؤال باختصار: هل تريد تطوير وكيل، أم تشغيل طبقة تحكم؟" },
    ],
    bodyEn: [
      { p: "The real question in comparing Hermes and OpenClaw isn't \"which is better,\" but \"which operating model fits how you work.\" One is a single agent you train to improve over time; the other is a platform on which you run an entire local AI environment." },
      { svg: POSTURE_SVG },
      { h: "What Hermes is", p: "An agent from Nous Research built around an internal learning loop: it can create skills from actual experience, refine them during use, persist bounded memory across sessions, search prior conversations, and gradually build a deeper model of its user. In practice it feels like a worker you train, not a question-and-answer interface." },
      { h: "What OpenClaw is", p: "Its center of gravity is different: the Gateway is the core — a WebSocket server managing channels, nodes, sessions, and hooks. A single long-lived Gateway owns the messaging surfaces, with control clients (macOS app, CLI, web UI, automations) connecting to it. Nodes connect with declared capabilities and device-level commands." },
      { h: "Why they aren't direct substitutes", p: "Both connect to models, use tools, load skills, and support longer-running work. But their strongest ideas differ: Hermes excels when you care about an agent encoding lessons into reusable procedural memory, while OpenClaw excels when you care about running a broader local system with clearer control over gateway behavior, workspace boundaries, channel routing, installed plugins, and multi-agent setup." },
      { h: "Comparison table", p: "" },
      {
        table: {
          headers: ["Dimension", "Hermes", "OpenClaw"],
          rows: [
            ["Posture", "Agent-first", "Control-plane-first"],
            ["Core architecture", "Autonomous agent with a learning loop, memory, and skills", "Gateway-centered runtime for channels, nodes, and sessions"],
            ["Skills system", "Skills as procedural memory the agent writes and patches itself", "Install, distribution, and workspace-level loading via ClawHub"],
            ["Skill self-evolution", "The core differentiator", "Not the main product identity"],
            ["Memory model", "Bounded memory plus session search and optional external providers", "Workspace files, sessions, auth profiles, and routing state"],
            ["Multi-agent", "Subagents and parallel workstreams", "Native multi-agent routing and first-class isolation"],
            ["Extensibility / MCP", "MCP support plus a skills ecosystem", "Skills, plugins, ClawHub, nodes, and channel integrations"],
            ["Workspace isolation", "Possible, but not the product's main story", "A major part of the operating model"],
            ["Best fit", "Solo builders, small teams, method-heavy work", "Operators, multi-agent and multi-channel environments"],
          ],
        },
      },
      { h: "Architecture: agent-first vs control-plane-first", p: "Hermes is a single agent that learns over time, holding memory, skills, tools, and providers, and keeping what it learns between sessions. OpenClaw is built around the Gateway: channels, nodes, sessions, hooks, clients, devices, and the dashboard all flow through it — making it feel like a platform or runtime system, not one agent that keeps improving." },
      { svg: ARCH_SVG },
      { p: "This difference even shows up in model access: Hermes is simpler when you want one evolving agent wired to a compatible model API, while OpenClaw makes more sense when provider setup is part of a larger system with auth profiles, workspaces, routing, and multiple agents." },
      { h: "Skills: the biggest practical difference", p: "Hermes skills aren't cosmetic add-ons — the docs describe them as procedural memory, stored in a dedicated directory and loaded on demand, sourced from bundled, installed, external, or agent-created origins. The key point is that the agent can create, update, and delete its own skills through a dedicated tool: after a successful complex task, a recovered failure, or a user correction, it turns experience into a reusable working method." },
      { svg: SKILL_LOOP_SVG },
      { p: "OpenClaw supports skills too, but with a different emphasis: through ClawHub you search, install, update, and manage skills and plugins for a specific workspace — its strength is distribution, customization, and plugin-based extension, not self-generated skills." },
      { h: "The tradeoff worth noting", p: "Skill self-evolution cuts both ways: an agent-generated skill may improve a workflow, or cause drift if it changes a stable process in the wrong direction. For individual use that's acceptable; for production workflows it demands stronger review and control." },
      { h: "Transparency and trust", p: "The question isn't which is more transparent in the absolute, but which part of the system you need transparency into. Hermes makes the agent loop itself legible — you connect outputs back to memory, skills, and prior corrections. OpenClaw gives a different kind of visibility: service state, gateway status, session routing, workspace structure, and plugin installation — better when the problem is operational complexity rather than shaping agent behavior." },
      { h: "Which should you choose?", p: "" },
      { svg: DECISION_SVG },
      { h: "The verdict", p: "Hermes is better for training a dependable working agent that compounds experience; OpenClaw is better for building a broader agent platform. If your priority is compounding capability through memory and skill creation, Hermes has the more distinctive idea. If your priority is operating a local AI environment with multiple surfaces, isolated agents, and gateway control, OpenClaw has the stronger systems story. In short: do you want to develop an agent, or operate a control plane?" },
    ],
    refs: [
      { label: "المصدر: Kimi — Hermes vs OpenClaw", url: "https://www.kimi.com/resources/hermes-vs-openclaw" },
      { label: "NousResearch/hermes-agent", url: "https://github.com/NousResearch/hermes-agent" },
      { label: "openclaw/openclaw", url: "https://github.com/openclaw/openclaw" },
    ],
  },
  {
    slug: "tencentdb-agent-memory-layered-local-memory",
    title: "TencentDB Agent Memory: ذاكرة طويلة الأمد محلية بالكامل لوكلاء الذكاء الاصطناعي",
    titleEn: "TencentDB Agent Memory: Fully Local Long-Term Memory for AI Agents",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "أغلب أنظمة الذاكرة تكدس كل شيء في مخزن متجهات مسطح وتفقد التتبع عند الاستدعاء. مشروع من Tencent يبني ذاكرة هرمية بأربع طبقات مع رسوم بيانية رمزية (Mermaid) تقلل استهلاك التوكنات بأكثر من 60% وتحسّن دقة استرجاع الشخصية من 48% إلى 76%.",
    excerptEn:
      "Most memory systems dump everything into a flat vector store and lose traceability on recall. A Tencent project builds a 4-tier hierarchical memory with symbolic (Mermaid) graphs, cutting token usage by over 60% and raising persona-recall accuracy from 48% to 76%.",
    body: [
      { p: "أنظمة الذاكرة التقليدية للوكلاء تقطّع المحادثات لشظايا وتضعها في مخزن متجهات مسطح — يتحول الاسترجاع لبحث أعمى بلا سياق هرمي. مشروع TencentDB Agent Memory يرفض هذا النمط، ويبني بدلًا منه هرمًا دلاليًا بأربع طبقات: محادثة خام (L0)، حقائق ذرية (L1)، مشاهد (L2)، وأخيرًا ملف شخصي مكثف للمستخدم (L3) — كل طبقة يمكن الغوص منها للطبقة الأسفل عند الحاجة لتفاصيل دقيقة." },
      { h: "الذاكرة الرمزية لضغط السياق", p: "أكبر مستهلك للتوكنات في المهام الطويلة هو سجلات الأدوات المطولة (نتائج بحث، كود، أخطاء). المشروع يرحّل هذه السجلات الكاملة لملفات خارجية، ويبقي في السياق فقط خريطة Mermaid خفيفة تلخّص حالة المهمة — الوكيل يستدل من الرسم، ويرجع للنص الخام فقط عبر معرّف عقدة (node_id) عند الحاجة الفعلية للتحقق." },
      { h: "أرقام حقيقية من الاختبارات", p: "عند دمجه مع منصة OpenClaw، خفّض استهلاك التوكنات حتى 61.38% ورفع معدل نجاح المهام 51.52% نسبيًا على اختبار WideSearch، ورفع دقة استرجاع الشخصية (PersonaMem) من 48% إلى 76% — نتائج مقاسة عبر جلسات طويلة مستمرة لا لفتات معزولة." },
      { h: "زاوية عملية", p: "يعمل كإضافة (plugin) مباشرة لمنصتي OpenClaw وHermes، بخلفية SQLite محلية افتراضيًا بدون أي اعتماد على خدمة سحابية خارجية إلزامية. كل الملفات الوسيطة (الشخصية، المشاهد، خرائط المهام) نصوص Markdown أو Mermaid قابلة للفتح والفحص مباشرة — تصحيح الأخطاء يصير مسارًا واضحًا من الملف الشخصي رجوعًا للمحادثة الخام، لا صندوقًا أسود من درجات تشابه متجهية." },
    ],
    bodyEn: [
      { p: "Traditional agent memory systems shred conversations into fragments and drop them into a flat vector store — recall degenerates into a blind search with no hierarchical context. TencentDB Agent Memory rejects that pattern, building instead a four-layer semantic pyramid: raw conversation (L0), atomic facts (L1), scenes (L2), and finally a condensed user persona (L3) — with a deterministic drill-down path back to lower layers whenever precise detail is needed." },
      { h: "Symbolic memory for context compression", p: "The biggest token consumer in long-running tasks is verbose tool logs (search results, code, error traces). The project offloads these full logs to external files, keeping only a lightweight Mermaid task map in context — the agent reasons over the diagram, and only pulls the raw text back in via a node_id when it actually needs to verify a detail." },
      { h: "Real numbers from benchmarks", p: "When integrated with the OpenClaw platform, it cut token usage by up to 61.38% and raised task success by 51.52% relative on the WideSearch benchmark, and raised persona-recall accuracy (PersonaMem) from 48% to 76% — results measured over continuous long-horizon sessions, not isolated turns." },
      { h: "A practical angle", p: "It runs as a direct plugin for both the OpenClaw and Hermes platforms, defaulting to a local SQLite backend with no mandatory external cloud dependency. Every intermediate artifact (persona, scenes, task canvases) is a plain Markdown or Mermaid file you can open and inspect directly — debugging becomes a clear walk from the persona back down to the raw conversation, not an opaque black box of vector similarity scores." },
    ],
    refs: [{ label: "TencentCloud/TencentDB-Agent-Memory", url: "https://github.com/TencentCloud/TencentDB-Agent-Memory" }],
  },
  {
    slug: "microsoft-agent-governance-toolkit",
    title: "Agent Governance Toolkit: طبقة تحكم إلزامية على قرارات وكلاء الذكاء الاصطناعي",
    titleEn: "Agent Governance Toolkit: Enforced Control Over What AI Agents Are Allowed to Do",
    date: "2026-07",
    tag: "AI AGENTS",
    excerpt:
      "طلب اللطف من نموذج ذكاء اصطناعي بـ«اتبع القواعد» ليس ضابط أمان حقيقي. أداة من مايكروسوفت تفرض السياسات على مستوى الكود قبل أي استدعاء أداة، بحيث تصبح المخالفة مستحيلة هيكليًا لا مجرد نادرة.",
    excerptEn:
      "Politely asking a model to \"follow the rules\" isn't a real security control. A Microsoft project enforces policy in application code before any tool call, making violations structurally impossible, not just unlikely.",
    body: [
      { p: "هجمات حقن الأوامر (prompt injection) نجحت بنسبة تقارب 100% ضد نماذج كبرى في أبحاث أكاديمية حديثة — أي ضابط أمان يعتمد فقط على تعليمات داخل الـ prompt نفسه غير موثوق. مشروع Agent Governance Toolkit من مايكروسوفت يحل هذا بطريقة مختلفة تمامًا: يعترض كل استدعاء أداة أو رسالة أو تفويض في كود التطبيق نفسه، قبل ما تصل نية النموذج للتنفيذ الفعلي." },
      { h: "كيف تبدو الحوكمة عمليًا", p: "سطران فقط: تلف أي دالة أداة بدالة govern() مع ملف سياسة بصيغة YAML، وكل استدعاء يصبح مُقيَّمًا ومسجّلًا ومنفذًا وفق القاعدة — عملية حذف جدول مثلًا تُرفض تلقائيًا وتتطلب موافقة بشرية صريحة، بينما عملية قراءة عادية تمر بلا احتكاك." },
      { h: "طبقات اختيارية حسب الحاجة", p: "فوق محرك السياسات، توجد طبقات إضافية اختيارية: هوية بمعايير Zero-Trust لتمييز أي وكيل نفّذ أي إجراء بالضبط في نظام متعدد الوكلاء، عزل تنفيذ بأربع مستويات صلاحية، سجل تدقيق مقاوم للتلاعب، وحتى بوابة أمان مخصصة لبروتوكول MCP تكتشف تسميم الأدوات ومحاولات الانتحال. أغلب الفرق تكتفي بمحرك السياسات وسجل التدقيق فقط." },
      { h: "زاوية عملية", p: "يغطي المشروع كل بنود قائمة OWASP Agentic Top 10 العشرة، ومتاح كحزمة لخمس لغات (Python، TypeScript، C#، Rust، Go) بالإضافة لتكامل جاهز مع Claude Code وGitHub Copilot CLI ومعظم أطر عمل الوكلاء الشائعة (LangChain، CrewAI، AutoGen، Semantic Kernel). لسا في مرحلة Public Preview من مايكروسوفت — يستحق التجربة على مشروع غير حرج أولًا قبل الإنتاج." },
    ],
    bodyEn: [
      { p: "Prompt injection attacks have hit near-100% success rates against major models in recent academic research — any safety approach that relies solely on instructions inside the prompt itself is unreliable. Microsoft's Agent Governance Toolkit takes an entirely different approach: it intercepts every tool call, message, and delegation in the application's own code, before the model's intent ever reaches actual execution." },
      { h: "What governance looks like in practice", p: "Two lines: wrap any tool function with govern() alongside a YAML policy file, and every call gets evaluated, logged, and enforced against the rule — a table-drop action, for example, is denied automatically and requires explicit human approval, while an ordinary read passes through with no friction." },
      { h: "Optional layers as needed", p: "On top of the policy engine sit optional additional layers: zero-trust identity to know exactly which agent performed which action in a multi-agent system, execution sandboxing with four privilege rings, a tamper-evident audit log, and even a dedicated MCP security gateway that detects tool poisoning and impersonation attempts. Most teams stick with just the policy engine plus audit logging." },
      { h: "A practical angle", p: "The project covers all ten categories of the OWASP Agentic Top 10, and ships as a package for five languages (Python, TypeScript, C#, Rust, Go), with ready integrations for Claude Code, GitHub Copilot CLI, and most popular agent frameworks (LangChain, CrewAI, AutoGen, Semantic Kernel). It's still in Microsoft's Public Preview — worth trying on a non-critical project first before production." },
    ],
    refs: [{ label: "microsoft/agent-governance-toolkit", url: "https://github.com/microsoft/agent-governance-toolkit" }],
  },
  {
    slug: "superfile-modern-terminal-file-manager",
    title: "Superfile: مدير ملفات طرفية عصري وأنيق",
    titleEn: "Superfile: A Fancy, Modern Terminal File Manager",
    date: "2026-07",
    tag: "CLI TOOLS",
    excerpt:
      "أوامر ls وcd وcp الكلاسيكية تكفي، لكن مدير ملفات طرفية حديث يجمع سهولة الأدوات الرسومية مع سرعة الطرفية — بواجهة ملونة، لوحات متعددة، وإضافات قابلة للتوسيع.",
    excerptEn:
      "The classic ls, cd, and cp commands are enough, but a modern terminal file manager combines the ease of graphical tools with terminal speed — a colorful interface, multiple panels, and an extensible plugin system.",
    body: [
      { p: "مديرو الملفات الطرفية التقليدية (مثل ranger أو nnn) قوية لكن واجهاتها قديمة وتعلّمها صعب. Superfile مكتوب بلغة Go فوق مكتبة Bubble Tea الشهيرة، يقدم واجهة حديثة ملونة داخل الطرفية نفسها — بدون التضحية بسرعة أو خفة الأدوات النصية." },
      { h: "التثبيت والتشغيل", p: "أمر تثبيت واحد لكل نظام تشغيل (macOS، Linux، Windows عبر winget أو scoop)، وأمر spf يفتح الواجهة مباشرة. يدعم عدة لوحات (panels) مفتوحة بجانب بعض، تصفح متعدد الألسنة، ونظام سمات (themes) قابل للتخصيص بالكامل." },
      { h: "الإضافات والتخصيص", p: "نظام إضافات (plugins) وسمات جاهزة عبر ويكي منفصل، ومفاتيح اختصار قابلة لإعادة التعيين بالكامل — تتضمن حتى إعدادًا جاهزًا لمستخدمي vim/nvim. تحديث تلقائي اختياري يتحقق من وجود إصدار جديد كل 24 ساعة." },
      { h: "زاوية عملية", p: "مفيد لمن يقضي أغلب وقته في الطرفية ويحتاج إدارة ملفات بصرية دون فتح مدير ملفات رسومي منفصل — خصوصًا على خوادم بلا واجهة رسومية أو أثناء الاتصال عبر SSH." },
    ],
    bodyEn: [
      { p: "Traditional terminal file managers (like ranger or nnn) are powerful but dated-looking and have a learning curve. Superfile, written in Go on top of the popular Bubble Tea library, offers a modern, colorful interface right inside the terminal — without sacrificing the speed or lightness of a text-based tool." },
      { h: "Install and run", p: "One install command per OS (macOS, Linux, Windows via winget or scoop), and a single `spf` command opens the interface. It supports multiple side-by-side panels, multi-tab browsing, and a fully customizable theming system." },
      { h: "Plugins and customization", p: "A plugin system and ready-made themes are documented in a separate wiki, and hotkeys are fully remappable — there's even a ready preset for vim/nvim users. Optional auto-update checks for a new version every 24 hours." },
      { h: "A practical angle", p: "Useful for anyone who spends most of their time in the terminal and needs visual file management without opening a separate GUI file manager — especially on headless servers or over an SSH connection." },
    ],
    refs: [{ label: "yorukot/superfile", url: "https://github.com/yorukot/superfile" }],
  },
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
