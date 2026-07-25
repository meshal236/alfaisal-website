"use client";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { useLanguage } from "@/lib/language-context";
const COPY = {
  ar: { eyebrow: "WRITING", heading: "المقالات" },
  en: { eyebrow: "WRITING", heading: "Articles" },
};
export default function BlogPage() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  return (
    <main className="section">
      <div className="section-head">
        <span className="mono">{t.eyebrow}</span>
        <h2>{t.heading}</h2>
      </div>
      <div className="blog-list">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="post-row">
            <span className="mono">
              {p.tag} · {p.date}
            </span>
            <h3>{lang === "ar" ? p.title : p.titleEn}</h3>
            <p>{lang === "ar" ? p.excerpt : p.excerptEn}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
