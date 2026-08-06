"use client";

import { useEffect, useRef, useState } from "react";

const COPY = {
  ar: { loading: "جارٍ التحميل…", failed: "تعذّر عرض المستند. جرّب التحميل المباشر.", page: "صفحة", of: "من", zoom: "تكبير" },
  en: { loading: "Loading…", failed: "Could not display the document. Try the direct download.", page: "Page", of: "of", zoom: "Zoom" },
};

export default function PdfPageViewer({
  href,
  lang,
}: {
  href: string;
  lang: "ar" | "en";
}) {
  const t = COPY[lang];
  const docKey = href.split("/").pop()!.replace(".pdf", "");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/nca/pages/manifest.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((m: Record<string, number>) => {
        if (m[docKey]) setPages(m[docKey]);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, [docKey]);

  useEffect(() => {
    const host = scrollRef.current;
    if (!host || !pages) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            setCurrent(Number((e.target as HTMLElement).dataset.n));
          }
        });
      },
      { root: host, threshold: [0.4] }
    );
    host.querySelectorAll("[data-n]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pages]);

  if (failed) return <div className="viewer-msg">{t.failed}</div>;
  if (!pages) return <div className="viewer-msg">{t.loading}</div>;

  return (
    <div className="pdfm">
      <div className="pdfm-pages" ref={scrollRef}>
        {Array.from({ length: pages }, (_, i) => {
          const n = i + 1;
          return (
            <img
              key={n}
              data-n={n}
              src={`/nca/pages/${docKey}/p-${String(n).padStart(3, "0")}.webp`}
              alt={`${t.page} ${n}`}
              loading={n <= 2 ? "eager" : "lazy"}
              decoding="async"
              className="pdfm-img"
              style={{ width: `${zoom * 100}%` }}
            />
          );
        })}
      </div>
      <div className="pdfm-bar">
        <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))} aria-label={t.zoom}>−</button>
        <span className="mono">
          {t.page} {current} {t.of} {pages}
        </span>
        <button onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))} aria-label={t.zoom}>+</button>
      </div>
    </div>
  );
}
