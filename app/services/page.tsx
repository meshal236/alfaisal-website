"use client";

import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: {
    eyebrow: "SERVICES",
    heading: "الخدمات",
    intro:
      "خدمات تقنية متخصصة تغطي البنية التحتية الرقمية والفيزيائية — من الذكاء الاصطناعي التطبيقي إلى الشبكات وأنظمة المراقبة، لعملاء من الأفراد والشركات والقطاع الحكومي.",
    services: [
      {
        mono: "AI AGENTS",
        title: "إعداد وتفعيل وكلاء الذكاء الاصطناعي المستقلين",
        desc: "بناء وتفعيل وربط وكيل ذكاء اصطناعي مستقل خاص بك، مزوّد بجميع المهارات والوكلاء الفرعيين اللازمة لمهامك، مع ربطه بقنوات التواصل التي تستخدمها فعليًا — تلغرام والواتساب وغيرها. الوكيل يُربط باشتراكاتك في خدمات النماذج مثل ChatGPT وAnthropic، أو يُشغّل بالكامل محليًا دون الاعتماد على أي مزود خارجي. الاستضافة والبنية التحتية تبقى بالكامل على جانب العميل.",
      },
      {
        mono: "SURVEILLANCE",
        title: "توريد وتركيب أنظمة المراقبة (DVR / NVR)",
        desc: "توريد وتركيب أنظمة كاميرات المراقبة بتقنيتي DVR وNVR، بعلامات تجارية موثوقة مثل Hikvision وDahua، مع تصميم يناسب طبيعة الموقع ومتطلبات التغطية. الخدمة متاحة للأفراد والشركات والجهات الحكومية، من التركيب الأولي إلى الإعداد والتهيئة الكاملة.",
      },
      {
        mono: "NETWORKING",
        title: "تمديد كابلات الشبكات والألياف الضوئية",
        desc: "تمديد وتأسيس بنية الكابلات الهيكلية للشبكات، من كابلات النحاس (CAT6 · CAT6A وما فوق) إلى كابلات الألياف الضوئية، وفق أفضل ممارسات التمديد والاختبار لضمان أداء واستقرار الشبكة. الخدمة متاحة للأفراد والشركات والقطاع الحكومي.",
      },
      {
        mono: "WIRELESS",
        title: "توريد وتركيب أنظمة الشبكات السلكية واللاسلكية",
        desc: "توريد وتركيب حلول الشبكات السلكية واللاسلكية (Wi-Fi)، مع تقوية الإشارة ومعالجة النقاط الضعيفة عبر نقاط وصول (Access Points) أو أنظمة Mesh، لضمان تغطية كاملة وثابتة لكل مساحات الموقع. الخدمة متاحة للأفراد والشركات والقطاع الحكومي.",
      },
      {
        mono: "Professional services",
        title: "تفعيل وإعداد أنظمة الشبكات",
        desc: "تفعيل وضبط وتهيئة أنظمة الشبكات وإعداد نقاط الوصول والأجهزة وتقسيم الشبكات وسياسات الوصول وضبط إعدادات الأداء والأمان لضمان تشغيل مستقر وآمن.",
      },
      {
        mono: "CONSULTING",
        title: "استشارات تقنية للبنية التحتية",
        desc: "استشارات فنية متخصصة في البنية التحتية التقنية للشركات والجهات الحكومية — من تقييم البيئة الحالية وتحديد نقاط الضعف، إلى تصميم حلول وخطط تطوير عملية تراعي الميزانية ومتطلبات التشغيل.",
      },
    ],
    cta: "للاستفسار أو طلب عرض سعر، تواصل عبر بيانات التواصل أسفل الصفحة.",
  },
  en: {
    eyebrow: "SERVICES",
    heading: "Services",
    intro:
      "Specialized technical services spanning digital and physical infrastructure — from applied AI to networking and surveillance systems, for individuals, businesses, and government clients.",
    services: [
      {
        mono: "AI AGENTS",
        title: "Independent AI Agent Setup & Deployment",
        desc: "Building, activating, and connecting your own independent AI agent, equipped with all the skills and sub-agents your workflow requires, and linked to the channels you actually use — Telegram, WhatsApp, and others. The agent connects to your existing subscriptions with model providers like ChatGPT and Anthropic, or runs fully locally with no external dependency. Hosting and infrastructure remain entirely on the client's side.",
      },
      {
        mono: "SURVEILLANCE",
        title: "CCTV Surveillance Systems (DVR / NVR)",
        desc: "Supply and installation of DVR and NVR surveillance camera systems from trusted brands such as Hikvision and Dahua, designed around the site's layout and coverage requirements. Available for individuals, businesses, and government entities — from initial installation through full setup and configuration.",
      },
      {
        mono: "NETWORKING",
        title: "Network & Fiber Optic Cabling",
        desc: "Structured cabling installation for networks, from copper cabling (CAT6 · CAT6A and above) to fiber optic runs, following best-practice installation and testing standards for network performance and stability. Available for individuals, businesses, and the government sector.",
      },
      {
        mono: "WIRELESS",
        title: "Wired & Wireless Network Systems Supply & Installation",
        desc: "Supply and installation of wired and wireless (Wi-Fi) network solutions, with signal boosting and dead-zone remediation via access points or mesh systems, ensuring complete and consistent coverage across every area of the site. Available for individuals, businesses, and the government sector.",
      },
      {
        mono: "Professional services",
        title: "Network Systems Activation & Configuration",
        desc: "Activating, configuring, and tuning existing network systems — setting up access points and devices, network segmentation and access policies, and performance and security settings — for stable, secure operation without new installation.",
      },
      {
        mono: "CONSULTING",
        title: "Infrastructure Technical Consulting",
        desc: "Specialized technical consulting on IT infrastructure for businesses and government entities — from assessing the current environment and identifying weak points, to designing practical solutions and development plans that account for budget and operational requirements.",
      },
    ],
    cta: "For inquiries or a quote, reach out via the contact details at the bottom of the page.",
  },
};

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="section">
      <div className="section-head">
        <span className="mono">{t.eyebrow}</span>
        <h2>{t.heading}</h2>
      </div>
      <p className="prose" style={{ marginBottom: 44 }}>
        {t.intro}
      </p>
      <div className="grid">
        {t.services.map((s) => (
          <div className="cell" key={s.mono}>
            <span className="mono">{s.mono}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="prose" style={{ marginTop: 44 }}>
        {t.cta}
      </p>
    </main>
  );
}
