export type NcaFile = {
  labelAr: string;
  labelEn: string;
  lang: string;
  href: string;
  size: string;
  kind: "xlsx" | "pdf";
};

export type NcaDomain = {
  key: string;
  ar: string;
  en: string;
  controls: number;
  subdomains: { id: string; titleEn: string; controls: number }[];
};

export type NcaFramework = {
  code: string;
  slug: string;
  ar: string;
  en: string;
  version: string;
  year: string;
  descAr: string;
  descEn: string;
  scopeAr: string;
  scopeEn: string;
  totalControls: number;
  variants?: { code: string; ar: string; en: string; total: number }[];
  domains: NcaDomain[];
  files: NcaFile[];
};

export const frameworks: NcaFramework[] = [
  {
    code: "ECC",
    slug: "ecc",
    ar: "الضوابط الأساسية للأمن السيبراني",
    en: "Essential Cybersecurity Controls",
    version: "ECC-2:2024",
    year: "2024",
    descAr: "الركيزة الأساسية والحد الأدنى الإلزامي لجميع الجهات الوطنية. كل إطار آخر يُبنى فوقها ولا يغني عنها.",
    descEn: "The foundational, minimum mandatory baseline for all national entities. Every other framework builds on top of it rather than replacing it.",
    scopeAr: "جميع الجهات الحكومية والجهات ذات العلاقة، وجهات القطاع الخاص المالكة أو المشغّلة للبنى التحتية الوطنية الحساسة.",
    scopeEn: "All government entities and related bodies, and private-sector entities owning or operating critical national infrastructure.",
    totalControls: 200,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 57,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Strategy", controls: 3 },
          { id: "1-10", titleEn: "Cybersecurity Awareness and Training Program", controls: 12 },
          { id: "1-2", titleEn: "Cybersecurity Management", controls: 3 },
          { id: "1-3", titleEn: "Cybersecurity Policies and Procedures", controls: 4 },
          { id: "1-4", titleEn: "Cybersecurity Roles and Responsibilities", controls: 2 },
          { id: "1-5", titleEn: "Cybersecurity Risk Management", controls: 8 },
          { id: "1-6", titleEn: "Cybersecurity in Information and Technology Project Management", controls: 11 },
          { id: "1-7", titleEn: "Compliance with Cybersecurity Standard controls, Laws and Regulations", controls: 1 },
          { id: "1-8", titleEn: "Periodical Cybersecurity Review and Audit", controls: 3 },
          { id: "1-9", titleEn: "Cybersecurity in Human Resources", controls: 10 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 121,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 6 },
          { id: "2-10", titleEn: "Vulnerabilities Management", controls: 9 },
          { id: "2-11", titleEn: "Penetration Testing", controls: 6 },
          { id: "2-12", titleEn: "Cybersecurity Event Logs and Monitoring Management", controls: 9 },
          { id: "2-13", titleEn: "Cybersecurity Incident and Threat Management", controls: 9 },
          { id: "2-14", titleEn: "Physical Security", controls: 9 },
          { id: "2-15", titleEn: "Web Application Security", controls: 9 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 9 },
          { id: "2-3", titleEn: "Information System and Information Processing Facilities Protection", controls: 8 },
          { id: "2-4", titleEn: "Email Protection", controls: 9 },
          { id: "2-5", titleEn: "Networks Security Management", controls: 13 },
          { id: "2-6", titleEn: "Mobile Devices Security", controls: 8 },
          { id: "2-7", titleEn: "Data and Information Protection", controls: 3 },
          { id: "2-8", titleEn: "Cryptography", controls: 7 },
          { id: "2-9", titleEn: "Backup and Recovery Management", controls: 7 },
        ],
      },
      {
        key: "Resilience",
        ar: "صمود الأمن السيبراني",
        en: "Cybersecurity Resilience",
        controls: 7,
        subdomains: [
          { id: "3-1", titleEn: "Cybersecurity Resilience Aspects of Business Continuity Management (BCM)", controls: 7 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 15,
        subdomains: [
          { id: "4-1", titleEn: "Third-Party Cybersecurity", controls: 9 },
          { id: "4-2", titleEn: "Cloud Computing and Hosting Cybersecurity", controls: 6 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/ECC/ECC-controls-ar.pdf", size: "953 KB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/ECC/ECC-controls-en.pdf", size: "1.2 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/ECC/ECC-implementation-guide-ar.pdf", size: "18.4 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/ECC/ECC-implementation-guide-en.pdf", size: "1.2 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/ECC/ECC-prerequisite.xlsx", size: "50 KB", kind: "xlsx" },
    ],
  },
  {
    code: "CCC",
    slug: "ccc",
    ar: "ضوابط الأمن السيبراني للحوسبة السحابية",
    en: "Cloud Computing Cybersecurity Controls",
    version: "CCC-2:2024",
    year: "2024",
    descAr: "تنقسم إلى مسارين منفصلين: متطلبات على مقدّم الخدمة السحابية (CSP) ومتطلبات على مستأجر الخدمة (CST) — لكل منهما ملف تقييم مستقل.",
    descEn: "Split into two separate tracks: requirements on the cloud service provider (CSP) and on the cloud service tenant (CST) — each with its own assessment workbook.",
    scopeAr: "مقدّمو الخدمات السحابية والجهات المستأجرة لها، وتُطبّق بالإضافة إلى الضوابط الأساسية لا بديلًا عنها.",
    scopeEn: "Cloud service providers and tenant entities; applied in addition to the essential controls, not as a substitute.",
    totalControls: 177,
    variants: [
      { code: "CSP", ar: "مقدّم الخدمة السحابية", en: "Cloud Service Provider", total: 133 },
      { code: "CST", ar: "مستأجر الخدمة السحابية", en: "Cloud Service Tenant", total: 44 },
    ],
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 30,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Roles and Responsibilities", controls: 4 },
          { id: "1-2", titleEn: "Cybersecurity Risk Management", controls: 8 },
          { id: "1-3", titleEn: "Compliance with Cybersecurity Standards, Laws and Regulations", controls: 4 },
          { id: "1-4", titleEn: "Cybersecurity in Human Resources", controls: 8 },
          { id: "1-5", titleEn: "Cybersecurity in Change Management", controls: 6 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 137,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 5 },
          { id: "2-10", titleEn: "Penetration Testing", controls: 2 },
          { id: "2-11", titleEn: "Cybersecurity Event Logs and Monitoring Management", controls: 12 },
          { id: "2-12", titleEn: "Cybersecurity Incident and Threat Management", controls: 9 },
          { id: "2-13", titleEn: "Physical Security", controls: 4 },
          { id: "2-14", titleEn: "Web Application Security", controls: 2 },
          { id: "2-15", titleEn: "Key Management", controls: 13 },
          { id: "2-16", titleEn: "System Development Security", controls: 6 },
          { id: "2-17", titleEn: "Storage Media Security", controls: 10 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 19 },
          { id: "2-3", titleEn: "Information System and Information Processing Facilities Protection", controls: 15 },
          { id: "2-4", titleEn: "Networks Security Management", controls: 9 },
          { id: "2-5", titleEn: "Mobile Devices Security", controls: 7 },
          { id: "2-6", titleEn: "Data and Information Protection", controls: 9 },
          { id: "2-7", titleEn: "Cryptography", controls: 6 },
          { id: "2-8", titleEn: "Backup and Recovery Management", controls: 3 },
          { id: "2-9", titleEn: "Vulnerability Management", controls: 6 },
        ],
      },
      {
        key: "Resilience",
        ar: "صمود الأمن السيبراني",
        en: "Cybersecurity Resilience",
        controls: 5,
        subdomains: [
          { id: "3-1", titleEn: "Cybersecurity Resilience Aspects of Business Continuity Management (BCM)", controls: 5 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 5,
        subdomains: [
          { id: "4-1", titleEn: "Supply Chain and Third-Party Cybersecurity", controls: 5 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/CCC/CCC-controls-ar.pdf", size: "6.5 MB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/CCC/CCC-controls-en.pdf", size: "1.3 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق — مقدّم الخدمة", labelEn: "Implementation guide — CSP", lang: "AR", href: "/nca/CCC/CCC-csp-implementation-guide-ar.pdf", size: "5.2 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق — مقدّم الخدمة", labelEn: "Implementation guide — CSP", lang: "EN", href: "/nca/CCC/CCC-csp-implementation-guide-en.pdf", size: "8.2 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel) — مقدّم الخدمة", labelEn: "Assessment workbook (Excel) — CSP", lang: "AR", href: "/nca/CCC/CCC-csp-prerequisite.xlsx", size: "37 KB", kind: "xlsx" },
      { labelAr: "دليل التطبيق — مستأجر الخدمة", labelEn: "Implementation guide — CST", lang: "AR", href: "/nca/CCC/CCC-cst-implementation-guide-ar.pdf", size: "2.1 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق — مستأجر الخدمة", labelEn: "Implementation guide — CST", lang: "EN", href: "/nca/CCC/CCC-cst-implementation-guide-en.pdf", size: "2.9 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel) — مستأجر الخدمة", labelEn: "Assessment workbook (Excel) — CST", lang: "AR", href: "/nca/CCC/CCC-cst-prerequisite.xlsx", size: "26 KB", kind: "xlsx" },
    ],
  },
  {
    code: "CSCC",
    slug: "cscc",
    ar: "ضوابط الأمن السيبراني للأنظمة الحساسة",
    en: "Critical Systems Cybersecurity Controls",
    version: "CSCC-1:2019",
    year: "2019",
    descAr: "مخصّصة لحماية الأنظمة والشبكات الوطنية الحساسة التي يؤدي تعطّلها أو اختراقها إلى أثر سلبي جوهري على أمن الوطن أو اقتصاده.",
    descEn: "Dedicated to protecting sensitive national systems and networks whose disruption or compromise would materially harm national security or the economy.",
    scopeAr: "الأنظمة المصنّفة حساسة داخل الجهة، وتُطبّق فوق الضوابط الأساسية بمستوى تشدّد أعلى.",
    scopeEn: "Systems classified as critical within the entity, applied on top of the essential controls at a stricter level.",
    totalControls: 105,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 17,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Strategy", controls: 1 },
          { id: "1-2", titleEn: "Cybersecurity Risk Management", controls: 3 },
          { id: "1-3", titleEn: "Cybersecurity in Information Technology Project", controls: 8 },
          { id: "1-4", titleEn: "Cybersecurity Assessment Periodical and Audit", controls: 2 },
          { id: "1-5", titleEn: "Cybersecurity in Human Resources", controls: 3 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 78,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 3 },
          { id: "2-10", titleEn: "Penetration Testing", controls: 4 },
          { id: "2-11", titleEn: "Cybersecurity Event Logs and Monitoring Management", controls: 7 },
          { id: "2-12", titleEn: "Web Application Security", controls: 4 },
          { id: "2-13", titleEn: "Application Security", controls: 8 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 10 },
          { id: "2-3", titleEn: "Information System and Processing Facilities Protection", controls: 9 },
          { id: "2-4", titleEn: "Networks Security Management", controls: 10 },
          { id: "2-5", titleEn: "Mobile Devices Security", controls: 3 },
          { id: "2-6", titleEn: "Data and Information Protection", controls: 6 },
          { id: "2-7", titleEn: "Cryptography", controls: 4 },
          { id: "2-8", titleEn: "Backup and Recovery Management", controls: 5 },
          { id: "2-9", titleEn: "Vulnerabilities Management", controls: 5 },
        ],
      },
      {
        key: "Resilience",
        ar: "صمود الأمن السيبراني",
        en: "Cybersecurity Resilience",
        controls: 5,
        subdomains: [
          { id: "3-1", titleEn: "Cybersecurity Resilience aspects of Business Continuity Management (BCM)", controls: 5 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 5,
        subdomains: [
          { id: "4-1", titleEn: "Third Party Cybersecurity", controls: 3 },
          { id: "4-2", titleEn: "Cloud Computing and Hosting Cybersecurity", controls: 2 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/CSCC/CSCC-controls-ar.pdf", size: "305 KB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/CSCC/CSCC-controls-en.pdf", size: "631 KB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/CSCC/CSCC-implementation-guide-ar.pdf", size: "4.4 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/CSCC/CSCC-implementation-guide-en.pdf", size: "8.8 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/CSCC/CSCC-prerequisite.xlsx", size: "38 KB", kind: "xlsx" },
    ],
  },
  {
    code: "OTCC",
    slug: "otcc",
    ar: "ضوابط الأمن السيبراني للأنظمة التشغيلية",
    en: "Operational Technology Cybersecurity Controls",
    version: "OTCC-1:2022",
    year: "2022",
    descAr: "مخصّصة لبيئات التحكم الصناعي وأنظمة تقنية العمليات، حيث تختلف أولويات الأمن جذريًا: التوافر والسلامة التشغيلية قبل السرية.",
    descEn: "Dedicated to industrial control environments and operational technology, where security priorities invert: availability and operational safety come before confidentiality.",
    scopeAr: "أنظمة التحكم الصناعي (ICS/SCADA) وشبكات التقنية التشغيلية والأصول المادية المرتبطة بها.",
    scopeEn: "Industrial control systems (ICS/SCADA), operational technology networks, and their associated physical assets.",
    totalControls: 169,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 37,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Policies and Procedures", controls: 3 },
          { id: "1-2", titleEn: "Cybersecurity Roles and Responsibilities", controls: 3 },
          { id: "1-3", titleEn: "Cybersecurity Risk Management", controls: 8 },
          { id: "1-4", titleEn: "Cybersecurity in Industrial Control System Project Management", controls: 6 },
          { id: "1-5", titleEn: "Cybersecurity in Change Management", controls: 9 },
          { id: "1-6", titleEn: "Periodical Cybersecurity Review and Audit", controls: 2 },
          { id: "1-7", titleEn: "Cybersecurity in Human Resources", controls: 2 },
          { id: "1-8", titleEn: "Cybersecurity Awareness and Training Program", controls: 4 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 118,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 7 },
          { id: "2-10", titleEn: "Penetration Testing", controls: 6 },
          { id: "2-11", titleEn: "Cybersecurity Event Logs and Monitoring Management", controls: 12 },
          { id: "2-12", titleEn: "Cybersecurity Incident and Threat Management", controls: 10 },
          { id: "2-13", titleEn: "Physical Security", controls: 11 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 13 },
          { id: "2-3", titleEn: "System and Processing Facilities Protection", controls: 15 },
          { id: "2-4", titleEn: "Networks Security Management", controls: 18 },
          { id: "2-5", titleEn: "Mobile Devices Security", controls: 7 },
          { id: "2-6", titleEn: "Data and Information Protection", controls: 6 },
          { id: "2-7", titleEn: "Cryptography", controls: 2 },
          { id: "2-8", titleEn: "Backup and Recovery Management", controls: 6 },
          { id: "2-9", titleEn: "Vulnerabilities Management", controls: 5 },
        ],
      },
      {
        key: "Resilience",
        ar: "صمود الأمن السيبراني",
        en: "Cybersecurity Resilience",
        controls: 8,
        subdomains: [
          { id: "3-1", titleEn: "Cybersecurity Resilience Aspects of Business Continuity Management (BCM)", controls: 8 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 6,
        subdomains: [
          { id: "4-1", titleEn: "Third-Party Cybersecurity", controls: 6 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/OTCC/OTCC-controls-ar.pdf", size: "552 KB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/OTCC/OTCC-controls-en.pdf", size: "506 KB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/OTCC/OTCC-implementation-guide-ar.pdf", size: "5.9 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/OTCC/OTCC-implementation-guide-en.pdf", size: "9.9 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/OTCC/OTCC-prerequisite.xlsx", size: "46 KB", kind: "xlsx" },
    ],
  },
  {
    code: "DCC",
    slug: "dcc",
    ar: "ضوابط الأمن السيبراني للبيانات",
    en: "Data Cybersecurity Controls",
    version: "DCC-1:2022",
    year: "2022",
    descAr: "تحمي البيانات وتصنّفها عبر دورة حياتها كاملة — من الإنشاء والتخزين والاستخدام والمشاركة حتى الإتلاف الآمن.",
    descEn: "Protects and classifies data across its full lifecycle — from creation, storage, use, and sharing through to secure destruction.",
    scopeAr: "جميع بيانات الجهة بمختلف مستويات تصنيفها، وتتقاطع تطبيقيًا مع نظام حماية البيانات الشخصية (PDPL).",
    scopeEn: "All entity data across classification levels, intersecting in practice with the Personal Data Protection Law (PDPL).",
    totalControls: 66,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 13,
        subdomains: [
          { id: "1-1", titleEn: "Periodical Cybersecurity Review and Audit", controls: 2 },
          { id: "1-2", titleEn: "Cybersecurity in Human Resources", controls: 3 },
          { id: "1-3", titleEn: "Cybersecurity Awareness and Training Program", controls: 8 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 37,
        subdomains: [
          { id: "2-1", titleEn: "Identity and Access Management", controls: 5 },
          { id: "2-2", titleEn: "Information System and Information Processing Facilities Protection", controls: 5 },
          { id: "2-3", titleEn: "Mobile Devices Security", controls: 3 },
          { id: "2-4", titleEn: "Data and Information Protection", controls: 5 },
          { id: "2-5", titleEn: "Cryptography", controls: 3 },
          { id: "2-6", titleEn: "Secure Data Disposal", controls: 7 },
          { id: "2-7", titleEn: "Cybersecurity for Printers, Scanners and Copy Machines", controls: 9 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 16,
        subdomains: [
          { id: "3-1", titleEn: "Third-Party Cybersecurity", controls: 16 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/DCC/DCC-controls-ar.pdf", size: "1.4 MB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/DCC/DCC-controls-en.pdf", size: "3.1 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/DCC/DCC-implementation-guide-ar.pdf", size: "6.1 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/DCC/DCC-implementation-guide-en.pdf", size: "5.0 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/DCC/DCC-prerequisite.xlsx", size: "44 KB", kind: "xlsx" },
    ],
  },
  {
    code: "TCC",
    slug: "tcc",
    ar: "ضوابط الأمن السيبراني للعمل عن بُعد",
    en: "Telework Cybersecurity Controls",
    version: "TCC-1:2021",
    year: "2021",
    descAr: "تؤمّن بيئات وأنظمة العمل عن بُعد: الوصول الخارجي، الأجهزة الشخصية، وقنوات الاتصال خارج محيط الجهة.",
    descEn: "Secures telework environments and systems: external access, personal devices, and communication channels outside the entity's perimeter.",
    scopeAr: "جميع أشكال العمل عن بُعد داخل الجهة، بما فيها الوصول من أجهزة غير مملوكة للجهة.",
    scopeEn: "All forms of remote work within the entity, including access from devices the entity does not own.",
    totalControls: 63,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 16,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Policies and Procedures", controls: 2 },
          { id: "1-2", titleEn: "Cybersecurity Risk Management", controls: 4 },
          { id: "1-3", titleEn: "Cybersecurity Awareness and Training Program", controls: 10 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 45,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 2 },
          { id: "2-10", titleEn: "Penetration Testing", controls: 3 },
          { id: "2-11", titleEn: "Cybersecurity Events Logs and Monitoring Management", controls: 6 },
          { id: "2-12", titleEn: "Cybersecurity Incident and Threat Management", controls: 4 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 5 },
          { id: "2-3", titleEn: "Information System and Processing Facilities Protection", controls: 6 },
          { id: "2-4", titleEn: "Network Security Management", controls: 5 },
          { id: "2-5", titleEn: "Mobile Device Security", controls: 3 },
          { id: "2-6", titleEn: "Data and Information Protection", controls: 3 },
          { id: "2-7", titleEn: "Cryptography", controls: 2 },
          { id: "2-8", titleEn: "Backup and Recovery Management", controls: 3 },
          { id: "2-9", titleEn: "Vulnerabilities Management", controls: 3 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 2,
        subdomains: [
          { id: "3-1", titleEn: "Cloud Computing and Hosting Cybersecurity", controls: 2 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/TCC/TCC-controls-ar.pdf", size: "391 KB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/TCC/TCC-controls-en.pdf", size: "251 KB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/TCC/TCC-implementation-guide-ar.pdf", size: "3.1 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/TCC/TCC-implementation-guide-en.pdf", size: "5.7 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/TCC/TCC-prerequisite.xlsx", size: "32 KB", kind: "xlsx" },
    ],
  },
  {
    code: "OSMACC",
    slug: "osmacc",
    ar: "ضوابط الأمن السيبراني لحسابات التواصل الاجتماعي",
    en: "Organizations' Social Media Accounts Cybersecurity Controls",
    version: "OSMACC-1:2021",
    year: "2021",
    descAr: "تحمي القنوات الرقمية الرسمية للجهة على منصات التواصل الاجتماعي — وهي من أكثر الأصول عرضة للاختراق وأسرعها أثرًا على السمعة.",
    descEn: "Protects the entity's official digital channels on social platforms — among the most exposed assets and the fastest to damage reputation.",
    scopeAr: "جميع الحسابات الرسمية للجهة على منصات التواصل الاجتماعي ومن يديرها داخليًا أو عبر وكالات خارجية.",
    scopeEn: "All official entity accounts on social platforms and whoever manages them internally or through external agencies.",
    totalControls: 53,
    domains: [
      {
        key: "Governance",
        ar: "حوكمة الأمن السيبراني",
        en: "Cybersecurity Governance",
        controls: 18,
        subdomains: [
          { id: "1-1", titleEn: "Cybersecurity Policies and Procedures", controls: 2 },
          { id: "1-2", titleEn: "Cybersecurity Risk Management", controls: 4 },
          { id: "1-3", titleEn: "Cybersecurity in Human Resources", controls: 3 },
          { id: "1-4", titleEn: "Cybersecurity Awareness and Training Program", controls: 9 },
        ],
      },
      {
        key: "Defense",
        ar: "تعزيز الأمن السيبراني",
        en: "Cybersecurity Defense",
        controls: 30,
        subdomains: [
          { id: "2-1", titleEn: "Asset Management", controls: 2 },
          { id: "2-2", titleEn: "Identity and Access Management", controls: 11 },
          { id: "2-3", titleEn: "Information System and Processing Facilities Protection", controls: 5 },
          { id: "2-4", titleEn: "Mobile Device Security", controls: 3 },
          { id: "2-5", titleEn: "Data and Information Protection", controls: 2 },
          { id: "2-6", titleEn: "Cybersecurity Events Logs and Monitoring Management", controls: 5 },
          { id: "2-7", titleEn: "Cybersecurity Incident and Threat Management", controls: 2 },
        ],
      },
      {
        key: "Third-Party",
        ar: "الأمن السيبراني المتعلق بالأطراف الخارجية",
        en: "Cybersecurity Third-Party",
        controls: 5,
        subdomains: [
          { id: "3-1", titleEn: "Third-Party Cybersecurity", controls: 5 },
        ],
      },
    ],
    files: [
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "AR", href: "/nca/OSMACC/OSMACC-controls-ar.pdf", size: "460 KB", kind: "pdf" },
      { labelAr: "وثيقة الضوابط", labelEn: "Controls document", lang: "EN", href: "/nca/OSMACC/OSMACC-controls-en.pdf", size: "232 KB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "AR", href: "/nca/OSMACC/OSMACC-implementation-guide-ar.pdf", size: "2.3 MB", kind: "pdf" },
      { labelAr: "دليل التطبيق", labelEn: "Implementation guide", lang: "EN", href: "/nca/OSMACC/OSMACC-implementation-guide-en.pdf", size: "3.7 MB", kind: "pdf" },
      { labelAr: "ملف التقييم (Excel)", labelEn: "Assessment workbook (Excel)", lang: "AR", href: "/nca/OSMACC/OSMACC-prerequisite.xlsx", size: "29 KB", kind: "xlsx" },
    ],
  },
];

export function getFramework(slug: string) {
  return frameworks.find((f) => f.slug === slug);
}