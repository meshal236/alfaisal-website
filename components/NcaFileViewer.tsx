"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import type { NcaFile } from "@/lib/nca";
import { useLanguage } from "@/lib/language-context";

type Ctrl = { id: string; desc: string; evidence: string };
type Sub = { id: string; title: string; objective: string; controls: Ctrl[] };
type Dom = { sheet: string; subdomains: Sub[] };

const COPY = {
  ar: {
    close: "إغلاق",
    download: "تحميل",
    loading: "جارٍ التحميل…",
    search: "ابحث في الضوابط…",
    noResults: "لا توجد نتائج مطابقة.",
    control: "الضابط",
    evidence: "الأدلة المطلوبة",
    objective: "الهدف",
    results: "نتيجة",
    failed: "تعذّر تحميل المعاينة. أعد المحاولة لاحقًا.",
    openNew: "فتح في تبويب جديد ↗",
  },
  en: {
    close: "Close",
    download: "Download",
    loading: "Loading…",
    search: "Search controls…",
    noResults: "No matching results.",
    control: "Control",
    evidence: "Required evidence",
    objective: "Objective",
    results: "results",
    failed: "Preview failed to load. Please try again later.",
    openNew: "Open in new tab ↗",
  },
};

function SheetViewer({ href, lang }: { href: string; lang: "ar" | "en" }) {
  const t = COPY[lang];
  const [data, setData] = useState<Dom[] | null>(null);
  const [err, setErr] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const key = href.replace("/nca/", "").replace(".xlsx", "").replace("/", "__");
    fetch(`/nca/data/${key}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setData(j.domains))
      .catch(() => setErr(true));
  }, [href]);

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!q.trim()) return data;
    const needle = q.toLowerCase();
    return data
      .map((d) => ({
        ...d,
        subdomains: d.subdomains
          .map((s) => ({
            ...s,
            controls: s.controls.filter(
              (c) =>
                c.id.toLowerCase().includes(needle) ||
                c.desc.toLowerCase().includes(needle) ||
                c.evidence.toLowerCase().includes(needle)
            ),
          }))
          .filter((s) => s.controls.length > 0 || s.title.toLowerCase().includes(needle)),
      }))
      .filter((d) => d.subdomains.length > 0);
  }, [data, q]);

  const count = filtered.reduce(
    (n, d) => n + d.subdomains.reduce((m, s) => m + s.controls.length, 0),
    0
  );

  if (err) return <div className="viewer-msg">{t.failed}</div>;
  if (!data) return <div className="viewer-msg">{t.loading}</div>;

  return (
    <div className="sheet-viewer">
      <div className="sheet-toolbar">
        <input
          className="dir-search"
          placeholder={t.search}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="sheet-count mono">{count} {t.results}</span>
      </div>
      <div className="sheet-body">
        {count === 0 && <div className="viewer-msg">{t.noResults}</div>}
        {filtered.map((d) => (
          <div key={d.sheet} className="sheet-dom">
            <h4 className="sheet-dom-title">{d.sheet}</h4>
            {d.subdomains.map((s) => (
              <div key={s.id} className="sheet-sub">
                <div className="sheet-sub-head">
                  <span className="mono sheet-sub-id">{s.id}</span>
                  <span className="sheet-sub-title">{s.title}</span>
                </div>
                {s.objective && (
                  <p className="sheet-obj">
                    <b>{t.objective}:</b> {s.objective}
                  </p>
                )}
                <div className="table-wrap" style={{ margin: "0 0 14px" }}>
                  <table className="post-table sheet-table">
                    <thead>
                      <tr>
                        <th style={{ width: 90 }}>#</th>
                        <th>{t.control}</th>
                        <th>{t.evidence}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.controls.map((c) => (
                        <tr key={c.id}>
                          <td className="mono" style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>{c.id}</td>
                          <td>{c.desc}</td>
                          <td className="sheet-ev">{c.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NcaFileViewer({
  file,
  onClose,
}: {
  file: NcaFile;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const esc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
    };
  }, [esc]);

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-head">
          <div className="viewer-title">
            <span className={`nca-file-kind ${file.kind}-badge`}>
              {file.kind === "xlsx" ? "XLS" : "PDF"}
            </span>
            <span>
              <span className="viewer-name">{lang === "ar" ? file.labelAr : file.labelEn}</span>
              <span className="viewer-meta mono">{file.lang} · {file.size}</span>
            </span>
          </div>
          <div className="viewer-actions">
            {file.kind === "pdf" && (
              <>
                <a href={file.href} target="_blank" rel="noreferrer" className="viewer-btn ghost">
                  {t.openNew}
                </a>
                <a href={file.href} download className="viewer-btn">
                  ↓ {t.download}
                </a>
              </>
            )}
            <button className="viewer-close" onClick={onClose} aria-label={t.close}>
              ✕
            </button>
          </div>
        </div>
        <div className="viewer-content">
          {file.kind === "pdf" ? (
            <iframe src={`${file.href}#view=FitH`} title={file.labelEn} />
          ) : (
            <SheetViewer href={file.href} lang={lang} />
          )}
        </div>
      </div>
    </div>
  );
}
