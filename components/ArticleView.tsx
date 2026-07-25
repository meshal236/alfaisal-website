"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: { refsLabel: "GITHUB REFERENCES", back: "← كل المقالات" },
  en: { refsLabel: "GITHUB REFERENCES", back: "← All Articles" },
};

export default function ArticleView({ post }: { post: Post }) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const title = lang === "ar" ? post.title : post.titleEn;
  const body = lang === "ar" ? post.body : post.bodyEn;

  return (
    <main className="article">
      <span className="mono">
        {post.tag} · {post.date}
      </span>
      <h1>{title}</h1>
      <div className="article-body">
        {body.map((block, i) => (
          <div key={i}>
            {block.h && <h2>{block.h}</h2>}
            <p>{block.p}</p>
          </div>
        ))}
      </div>
      {post.refs && post.refs.length > 0 && (
        <div className="refs">
          <span className="mono">{t.refsLabel}</span>
          <ul>
            {post.refs.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link href="/blog" className="back-link">
        {t.back}
      </Link>
    </main>
  );
}
