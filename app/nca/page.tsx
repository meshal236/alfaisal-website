"use client";

import Link from "next/link";
import { frameworks } from "@/lib/nca";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: {
    eyebrow: "NCA FRAMEWORKS",
    heading: "أطر الأمن السيبراني الوطنية",
    sub: "مرجع منظّم لأطر الهيئة الوطنية للأمن السيبراني (NCA): بنية الضوابط لكل إطار، ونطاق تطبيقه، وملفات التقييم والوثائق الرسمية جاهزة للتحميل.",
    controls: "ضابط",
    domains: "مجالات",
    view: "عرض التفاصيل ←",
    note: "الوثائق منشورة من الهيئة الوطنية للأمن السيبراني. هذي الصفحة تنظيم مرجعي لها ولا تغني عن النسخة الرسمية على nca.gov.sa.",
    statControls: "إجمالي الضوابط",
    statFrameworks: "أطر",
    statFiles: "ملف مرجعي",
  },
  en: {
    eyebrow: "NCA FRAMEWORKS",
    heading: "National Cybersecurity Frameworks",
    sub: "An organized reference for the National Cybersecurity Authority (NCA) frameworks: each framework's control structure, its scope, and the official assessment workbooks and documents ready to download.",
    controls: "controls",
    domains: "domains",
    view: "View details →",
    note: "Documents are published by the National Cybersecurity Authority. This page is a reference organization of them and does not replace the official version on nca.gov.sa.",
    statControls: "Total controls",
    statFrameworks: "Frameworks",
    statFiles: "Reference files",
  },
};

export default function NcaPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const totalControls = frameworks.reduce((s, f) => s + f.totalControls, 0);
  const totalFiles = frameworks.reduce((s, f) => s + f.files.length, 0);

  return (
    <main className="section">
      <div className="hub-head">
        <p className="eyebrow" style={{ textAlign: "start", marginBottom: 10 }}>{t.eyebrow}</p>
        <h1>{t.heading}</h1>
        <p className="hub-sub">{t.sub}</p>
      </div>

      <div className="nca-stats">
        <div className="nca-stat">
          <span className="nca-stat-num">{frameworks.length}</span>
          <span className="nca-stat-label">{t.statFrameworks}</span>
        </div>
        <div className="nca-stat">
          <span className="nca-stat-num">{totalControls}</span>
          <span className="nca-stat-label">{t.statControls}</span>
        </div>
        <div className="nca-stat">
          <span className="nca-stat-num">{totalFiles}</span>
          <span className="nca-stat-label">{t.statFiles}</span>
        </div>
      </div>

      <div className="nca-grid">
        {frameworks.map((f) => (
          <Link key={f.slug} href={`/nca/${f.slug}`} className="nca-card">
            <div className="nca-card-top">
              <span className="nca-code">{f.code}</span>
              <span className="nca-version">{f.version}</span>
            </div>
            <h3>{lang === "ar" ? f.ar : f.en}</h3>
            <p>{lang === "ar" ? f.descAr : f.descEn}</p>
            <div className="nca-card-meta">
              <span><b>{f.totalControls}</b> {t.controls}</span>
              <span><b>{f.domains.length}</b> {t.domains}</span>
              <span><b>{f.files.length}</b> {lang === "ar" ? "ملفات" : "files"}</span>
            </div>
            <span className="nca-card-link">{t.view}</span>
          </Link>
        ))}
      </div>

      <p className="tools-note" style={{ marginTop: 40 }}>
        {t.note}{" "}
        <a href="https://nca.gov.sa" target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }}>
          nca.gov.sa
        </a>
      </p>
    </main>
  );
}
