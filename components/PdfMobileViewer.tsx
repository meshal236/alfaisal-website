"use client";

import { useEffect, useRef, useState } from "react";

type Props = { href: string; lang: "ar" | "en" };

const COPY = {
  ar: { loading: "جارٍ تحميل المستند…", failed: "تعذّر عرض المستند. جرّب فتحه في تبويب جديد.", page: "صفحة", of: "من", zoomIn: "تكبير", zoomOut: "تصغير" },
  en: { loading: "Loading document…", failed: "Could not display the document. Try opening it in a new tab.", page: "Page", of: "of", zoomIn: "Zoom in", zoomOut: "Zoom out" },
};

export default function PdfMobileViewer({ href, lang }: Props) {
  const t = COPY[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const docRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const renderedRef = useRef<Set<number>>(new Set());

  // load document
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ url: href }).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      const d = docRef.current as unknown as { destroy?: () => void } | null;
      d?.destroy?.();
    };
  }, [href]);

  // render a page into its canvas
  const renderPage = async (n: number) => {
    const doc = docRef.current;
    const host = containerRef.current;
    if (!doc || !host) return;
    const key = `${n}@${scale}`;
    if (renderedRef.current.has(n) && host.dataset.scale === String(scale)) return;
    const wrap = host.querySelector<HTMLDivElement>(`[data-page="${n}"]`);
    if (!wrap) return;
    const page = await doc.getPage(n);
    const containerWidth = host.clientWidth - 24;
    const base = page.getViewport({ scale: 1 });
    const fit = (containerWidth / base.width) * scale;
    const viewport = page.getViewport({ scale: fit });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = wrap.querySelector("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    renderedRef.current.add(n);
    wrap.dataset.rendered = key;
  };

  // lazy render visible pages + track current page
  useEffect(() => {
    if (status !== "ready" || !numPages) return;
    const host = containerRef.current;
    if (!host) return;
    host.dataset.scale = String(scale);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const n = Number((e.target as HTMLElement).dataset.page);
          if (e.isIntersecting) {
            renderPage(n);
            if (e.intersectionRatio > 0.5) setCurrent(n);
          }
        });
      },
      { root: host, rootMargin: "300px 0px", threshold: [0, 0.5] }
    );
    host.querySelectorAll("[data-page]").forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, numPages, scale]);

  // re-render on zoom change
  useEffect(() => {
    renderedRef.current.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  if (status === "error") return <div className="viewer-msg">{t.failed}</div>;

  return (
    <div className="pdfm">
      <div className="pdfm-pages" ref={containerRef}>
        {status === "loading" && <div className="viewer-msg">{t.loading}</div>}
        {Array.from({ length: numPages }, (_, i) => (
          <div className="pdfm-page" data-page={i + 1} key={i + 1}>
            <canvas />
          </div>
        ))}
      </div>
      {status === "ready" && (
        <div className="pdfm-bar">
          <button onClick={() => setScale((s) => Math.max(0.6, +(s - 0.25).toFixed(2)))} aria-label={t.zoomOut}>−</button>
          <span className="mono">
            {t.page} {current} {t.of} {numPages}
          </span>
          <button onClick={() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2)))} aria-label={t.zoomIn}>+</button>
        </div>
      )}
    </div>
  );
}
