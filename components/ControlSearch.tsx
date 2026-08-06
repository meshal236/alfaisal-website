"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export type ControlRow = {
  id: string;
  desc: string;
  ev: string;
  fw: string;
  slug: string;
  var: string;
  dom: string;
  domAr: string;
  sub: string;
  subT: string;
};

const COPY = {
  ar: {
    placeholder: "ابحث برقم الضابط أو بكلمة… مثل: تشفير، النسخ الاحتياطي، 2-3-1",
    loading: "جارٍ تحميل الضوابط…",
    failed: "تعذّر تحميل فهرس الضوابط.",
    results: "نتيجة",
    none: "لا توجد نتائج مطابقة. جرّب كلمة أخرى أو رقم ضابط.",
    empty: "اكتب كلمة للبحث في الضوابط.",
    evidence: "الأدلة المطلوبة",
    all: "كل الأطر",
    more: "عرض المزيد",
    showing: "معروض",
    of: "من",
  },
  en: {
    placeholder: "Search by control number or keyword… e.g. encryption, backup, 2-3-1",
    loading: "Loading controls…",
    failed: "Could not load the controls index.",
    results: "results",
    none: "No matching results. Try another keyword or a control number.",
    empty: "Type a keyword to search the controls.",
    evidence: "Required evidence",
    all: "All frameworks",
    more: "Show more",
    showing: "Showing",
    of: "of",
  },
};

const PAGE = 40;

function mark(text: string, q: string) {
  if (!q.trim()) return text;
  const needle = q.trim();
  const i = text.toLowerCase().indexOf(needle.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + needle.length)}</mark>
      {text.slice(i + needle.length)}
    </>
  );
}

export default function ControlSearch({
  scope,
  autoFocus,
}: {
  scope?: string;
  autoFocus?: boolean;
}) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [rows, setRows] = useState<ControlRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [fw, setFw] = useState<string>(scope ?? "all");
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    fetch("/nca/controls-index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setRows)
      .catch(() => setFailed(true));
  }, []);

  const pool = useMemo(
    () => (rows ? (scope ? rows.filter((r) => r.slug === scope) : rows) : []),
    [rows, scope]
  );

  const frameworks = useMemo(() => {
    const s = new Set(pool.map((r) => r.fw));
    return Array.from(s);
  }, [pool]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const n = q.trim().toLowerCase();
    return pool.filter((r) => {
      if (!scope && fw !== "all" && r.fw !== fw) return false;
      return (
        r.id.toLowerCase().includes(n) ||
        r.desc.toLowerCase().includes(n) ||
        r.ev.toLowerCase().includes(n) ||
        r.subT.toLowerCase().includes(n)
      );
    });
  }, [pool, q, fw, scope]);

  useEffect(() => setLimit(PAGE), [q, fw]);

  if (failed) return <div className="viewer-msg">{t.failed}</div>;

  return (
    <div className="csearch">
      <input
        className="csearch-input"
        placeholder={t.placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
      />

      {!scope && frameworks.length > 1 && (
        <div className="dir-cats" style={{ marginTop: 14 }}>
          <button className={`dir-cat${fw === "all" ? " active" : ""}`} onClick={() => setFw("all")}>
            {t.all}
          </button>
          {frameworks.map((f) => (
            <button key={f} className={`dir-cat${fw === f ? " active" : ""}`} onClick={() => setFw(f)}>
              {f}
            </button>
          ))}
        </div>
      )}

      {!rows && <div className="viewer-msg">{t.loading}</div>}

      {rows && !q.trim() && <div className="viewer-msg">{t.empty}</div>}

      {rows && q.trim() && (
        <>
          <div className="csearch-count mono">
            {results.length} {t.results}
          </div>
          {results.length === 0 && <div className="viewer-msg">{t.none}</div>}
          <div className="csearch-results">
            {results.slice(0, limit).map((r, i) => (
              <div className="cres" key={`${r.fw}${r.var}${r.id}-${i}`}>
                <div className="cres-head">
                  <span className="cres-id mono">{r.id}</span>
                  <span className="cres-tags">
                    <span className="cres-fw">{r.fw}{r.var && ` · ${r.var}`}</span>
                    <span className="cres-dom">{lang === "ar" ? r.domAr : r.dom}</span>
                    <span className="cres-sub">{r.sub} · {r.subT}</span>
                  </span>
                </div>
                <p className="cres-desc">{mark(r.desc, q)}</p>
                {r.ev && (
                  <div className="cres-ev">
                    <span className="cres-ev-label">{t.evidence}</span>
                    <p>{r.ev}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {results.length > limit && (
            <div className="csearch-more">
              <span className="mono">
                {t.showing} {limit} {t.of} {results.length}
              </span>
              <button onClick={() => setLimit((l) => l + PAGE)}>{t.more}</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
