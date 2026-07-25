"use client";

import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="footer">
      <span className="footer-mark">
        {lang === "ar" ? "مشعل الفيصل" : "Mashal Alfaisal"}
      </span>
      <span className="footer-meta">
        RIYADH · {new Date().getFullYear()} ·{" "}
        <a href="tel:0503277236">0503277236</a>{" "}
        ·{" "}
        <a href="https://www.linkedin.com/in/meshal-abdullah-alfaisal/" target="_blank" rel="noreferrer">
          LINKEDIN
        </a>{" "}
        ·{" "}
        <a href="https://github.com/meshal236" target="_blank" rel="noreferrer">
          GITHUB
        </a>{" "}
        ·{" "}
        <a href="https://alfaisal.ai" target="_blank" rel="noreferrer">
          ALFAISAL.AI
        </a>
      </span>
    </footer>
  );
}
