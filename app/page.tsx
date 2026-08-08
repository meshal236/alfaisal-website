"use client";

import Constellation from "@/components/Constellation";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: {
    heroSub:
      "قيادة البنية التحتية والعمليات التقنية، من الشبكات ومراكز البيانات إلى الحوسبة السحابية والذكاء الاصطناعي.",
    whoHeading: "من أنا",
    about1a: "قيادي في مجال ",
    about1b:
      "، بخبرة واسعة في القطاعين الحكومي والخاص امتدت من إدارة الشبكات ومراكز البيانات إلى قيادة أقسام تشغيل تقنية متكاملة. أتولى قيادة فرق متعددة التخصصات تغطي الأنظمة والشبكات وقواعد البيانات وأمن المعلومات والدعم التقني، مع بناء بيئة عمل واضحة الأدوار وجاهزة تشغيليًا على مدار الساعة.",
    about1strong: "البنية التحتية والعمليات التقنية",
    about2a: "يتمحور نهجي حول ",
    about2strong: "رفع الكفاءة التشغيلية والتحسين المستمر",
    about2b:
      ": حوكمة الخدمات التقنية وفق أفضل الممارسات، تحديد نقاط الضعف ومعالجتها استباقيًا، وقيادة مشاريع البنية التحتية والتحول التقني من التخطيط حتى التسليم، مع ترجمة التفاصيل التقنية إلى رؤية واضحة تدعم القرار التنفيذي وأهداف المؤسسة.",
    domainsHeading: "مجالات الخبرة",
    domains: [
      {
        mono: "NETWORK",
        title: "الشبكات والأمن",
        desc: "تطبيق وتشغيل شبكات مراكز البيانات المؤسسية، من سياسات الوصول إلى طبقات الحماية المتكاملة.",
      },
      {
        mono: "OPERATIONS",
        title: "عمليات التشغيل والمراقبة",
        desc: "تشغيل ومراقبة الأنظمة الحرجة على مدار الساعة عبر مراكز التشغيل (NOC)، باستجابة سريعة للحوادث وتقارير تنفيذية واضحة.",
      },
      {
        mono: "ITSM",
        title: "حوكمة الخدمات التقنية",
        desc: "حوكمة الخدمات التقنية وفق ITIL، من اتفاقيات مستوى الخدمة إلى إدارة الطلبات والتغييرات بانضباط.",
      },
      {
        mono: "CLOUD",
        title: "الخدمات السحابية",
        desc: "تطبيق بيئات موحّدة تجمع السحابة العامة (Azure · GCP · Alibaba) مع مراكز البيانات المحلية، قابلة للتوسع بلا تعقيد.",
      },
      {
        mono: "AI / LLM",
        title: "الذكاء الاصطناعي ووكلاء الذكاء الاصطناعي",
        desc: "خبرة عملية في بناء وتشغيل وكلاء الذكاء الاصطناعي وخدماته، محليًا وسحابيًا، وربطها بالأنظمة عبر بروتوكول MCP.",
      },
      {
        mono: "LEADERSHIP",
        title: "قيادة الفرق والمشاريع",
        desc: "قيادة فرق تقنية متعددة التخصصات، وترجمة مشاريع البنية التحتية إلى قرارات تنفيذية واضحة.",
      },
    ],
    skillsHeading: "المهارات والخبرة",
  },
  en: {
    heroSub:
      "Leading infrastructure and IT operations, from networks and data centers to cloud computing and AI.",
    whoHeading: "Who I Am",
    about1a: "A leader in ",
    about1b:
      ", with extensive experience across public and private sectors, from managing networks and data centers to leading full-scale technology operations departments. I lead cross-functional teams covering systems, networking, databases, information security, and technical support, building an operating environment with clear roles and round-the-clock readiness.",
    about1strong: "infrastructure and IT operations",
    about2a: "My approach centers on ",
    about2strong: "operational efficiency and continuous improvement",
    about2b:
      ": governing technology services against best practices, proactively identifying and closing weak points, and leading infrastructure and digital transformation projects from planning through delivery, translating technical detail into a clear picture that supports executive decisions and organizational goals.",
    domainsHeading: "Areas of Expertise",
    domains: [
      {
        mono: "NETWORK",
        title: "Networks & Security",
        desc: "Designing and running enterprise data center networks, advanced access policies, and multi-layered security solutions.",
      },
      {
        mono: "OPERATIONS",
        title: "Operations & Monitoring",
        desc: "Monitoring critical systems through NOC functions, incident management, and executive-level reporting.",
      },
      {
        mono: "ITSM",
        title: "IT Service Governance",
        desc: "Building service management processes on ITIL, service-level agreements, and the request-and-change lifecycle.",
      },
      {
        mono: "CLOUD",
        title: "Cloud & Virtualization",
        desc: "Hybrid environments spanning public cloud (Azure · GCP · Alibaba), on-prem data centers, and virtualized infrastructure.",
      },
      {
        mono: "AI / LLM",
        title: "Applied AI",
        desc: "Self-hosted model deployment, multi-model chat platforms, and enterprise AI adoption strategy.",
      },
      {
        mono: "LEADERSHIP",
        title: "Team & Project Leadership",
        desc: "Leading cross-functional technical teams, managing infrastructure projects, and translating technology into executive decisions.",
      },
    ],
    skillsHeading: "Skills & Expertise",
  },
};

const SKILL_CHIPS = [
  "AZURE CLOUD",
  "GCP CLOUD",
  "ALIBABA CLOUD",
  "NETWORK",
  "SYSTEMS",
  "DATABASES",
  "SECURITY",
  "VIRTUALIZATION",
  "MONITORING & NOC",
  "ITSM / ITIL",
  "AI AGENTS",
  "AGENTIC AI",
  "TEAM LEADERSHIP",
  "PROJECT MANAGEMENT",
  "FINOPS",
  "NCA REGULATION",
  "SAMA REGULATION",
];

export default function Home() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main>
      <section className="hero">
        <Constellation />
        <div className="hero-inner">
          <p className="eyebrow">INFRASTRUCTURE · NETWORKS · AI</p>
          <h1>{lang === "ar" ? "مشعل الفيصل" : "Mashal Alfaisal"}</h1>
          <p className="hero-sub">{t.heroSub}</p>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-head">
          <span className="mono">01 / WHO</span>
          <h2>{t.whoHeading}</h2>
        </div>
        <p className="prose">
          {t.about1a}
          <strong>{t.about1strong}</strong>
          {t.about1b}
        </p>
        <br />
        <p className="prose">
          {t.about2a}
          <strong>{t.about2strong}</strong>
          {t.about2b}
        </p>
      </section>

      <section className="section" id="expertise">
        <div className="section-head">
          <span className="mono">02 / DOMAINS</span>
          <h2>{t.domainsHeading}</h2>
        </div>
        <div className="grid">
          {t.domains.map((d) => (
            <div className="cell" key={d.mono}>
              <span className="mono">{d.mono}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-head">
          <span className="mono">03 / SKILLS</span>
          <h2>{t.skillsHeading}</h2>
        </div>
        <div className="chips">
          {SKILL_CHIPS.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
