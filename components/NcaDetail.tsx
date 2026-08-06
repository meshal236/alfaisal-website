"use client";

import Link from "next/link";
import type { NcaFramework } from "@/lib/nca";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: {
    back: "← كل الأطر",
    scope: "نطاق التطبيق",
    structure: "بنية الضوابط",
    files: "الملفات المرجعية",
    controls: "ضابط",
    subdomain: "المجال الفرعي",
    count: "عدد الضوابط",
    download: "تحميل",
    variants: "مساران منفصلان",
    filesNote: "ملفات Excel هي أوراق التقييم الرسمية المستخدمة في قياس الالتزام. وثائق PDF هي نص الضوابط ودليل التطبيق.",
    disclaimer: "المصدر: الهيئة الوطنية للأمن السيبراني. راجع النسخة الرسمية على nca.gov.sa قبل أي اعتماد رسمي.",
  },
  en: {
    back: "← All frameworks",
    scope: "Scope of application",
    structure: "Control structure",
    files: "Reference files",
    controls: "controls",
    subdomain: "Subdomain",
    count: "Controls",
    download: "Download",
    variants: "Two separate tracks",
    filesNote: "The Excel files are the official assessment sheets used to measure compliance. The PDFs are the control text and implementation guide.",
    disclaimer: "Source: National Cybersecurity Authority. Check the official version on nca.gov.sa before any formal reliance.",
  },
};

export default function NcaDetail({ framework: f }: { framework: NcaFramework }) {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <main className="section">
      <Link href="/nca" className="back-link" style={{ marginTop: 0, marginBottom: 24, display: "inline-block" }}>
        {t.back}
      </Link>

      <div className="nca-detail-head">
        <div className="nca-detail-top">
          <span className="nca-code lg">{f.code}</span>
          <span className="nca-version">{f.version}</span>
        </div>
        <h1>{lang === "ar" ? f.ar : f.en}</h1>
        <p className="hub-sub">{lang === "ar" ? f.descAr : f.descEn}</p>
        <div className="nca-detail-stats">
          <span><b>{f.totalControls}</b> {t.controls}</span>
          <span><b>{f.domains.length}</b> {lang === "ar" ? "مجالات رئيسية" : "main domains"}</span>
          <span><b>{f.domains.reduce((s, d) => s + d.subdomains.length, 0)}</b> {lang === "ar" ? "مجال فرعي" : "subdomains"}</span>
        </div>
      </div>

      {f.variants && (
        <div className="nca-variants">
          <span className="mono">{t.variants}</span>
          <div className="nca-variant-row">
            {f.variants.map((v) => (
              <div className="nca-variant" key={v.code}>
                <span className="nca-variant-code">{v.code}</span>
                <span className="nca-variant-name">{lang === "ar" ? v.ar : v.en}</span>
                <span className="nca-variant-total">{v.total} {t.controls}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="nca-section">
        <h2>{t.scope}</h2>
        <p className="prose">{lang === "ar" ? f.scopeAr : f.scopeEn}</p>
      </section>

      <section className="nca-section">
        <h2>{t.structure}</h2>
        {f.domains.map((d) => (
          <div className="nca-domain" key={d.key}>
            <div className="nca-domain-head">
              <h3>{lang === "ar" ? d.ar : d.en}</h3>
              <span className="nca-domain-count">{d.controls} {t.controls}</span>
            </div>
            <div className="table-wrap" style={{ margin: "0 0 8px" }}>
              <table className="post-table">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>#</th>
                    <th>{t.subdomain}</th>
                    <th style={{ width: 110 }}>{t.count}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.subdomains.map((s) => (
                    <tr key={s.id}>
                      <td className="mono" style={{ fontSize: "0.8rem" }}>{s.id}</td>
                      <td>{s.titleEn}</td>
                      <td>{s.controls}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="nca-section">
        <h2>{t.files}</h2>
        <p className="tools-note" style={{ marginBottom: 18 }}>{t.filesNote}</p>
        <div className="nca-files">
          {f.files.map((file) => (
            <a key={file.href} href={file.href} download className={`nca-file ${file.kind}`}>
              <span className="nca-file-kind">{file.kind === "xlsx" ? "XLS" : "PDF"}</span>
              <span className="nca-file-body">
                <span className="nca-file-label">{lang === "ar" ? file.labelAr : file.labelEn}</span>
                <span className="nca-file-meta">{file.lang} · {file.size}</span>
              </span>
              <span className="nca-file-dl">↓</span>
            </a>
          ))}
        </div>
      </section>

      <p className="tools-note" style={{ marginTop: 34 }}>
        {t.disclaimer}{" "}
        <a href="https://nca.gov.sa" target="_blank" rel="noreferrer" style={{ color: "var(--copper)" }}>
          nca.gov.sa
        </a>
      </p>
    </main>
  );
}
