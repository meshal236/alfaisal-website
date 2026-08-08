"use client";

import Link from "next/link";
import ControlSearch from "@/components/ControlSearch";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: {
    back: "← كل الأطر",
    eyebrow: "CONTROL SEARCH",
    heading: "البحث في الضوابط",
    sub: "ابحث في 833 ضابطًا عبر أطر الأمن السيبراني الوطنية السبعة دفعة واحدة، بنص الضابط، أو رقمه، أو الأدلة المطلوبة.",
    tip: "مثال عملي: ابحث عن «النسخ الاحتياطي» لترى كيف عالجه كل إطار على حدة، أو اكتب رقم ضابط مثل 2-3-1 للوصول له مباشرة.",
  },
  en: {
    back: "← All frameworks",
    eyebrow: "CONTROL SEARCH",
    heading: "Search the controls",
    sub: "Search 833 controls across all seven national cybersecurity frameworks at once, by control text, number, or required evidence.",
    tip: 'A practical example: search "backup" to see how each framework treats it, or type a control number like 2-3-1 to jump straight to it.',
  },
};

export default function NcaSearchPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  return (
    <main className="section">
      <Link
        href="/nca"
        className="back-link"
        style={{ marginTop: 0, marginBottom: 24, display: "inline-block" }}
      >
        {t.back}
      </Link>
      <div className="hub-head">
        <p className="eyebrow" style={{ textAlign: "start", marginBottom: 10 }}>
          {t.eyebrow}
        </p>
        <h1>{t.heading}</h1>
        <p className="hub-sub">{t.sub}</p>
      </div>
      <ControlSearch autoFocus />
      <p className="tools-note" style={{ marginTop: 30 }}>
        {t.tip}
      </p>
    </main>
  );
}
