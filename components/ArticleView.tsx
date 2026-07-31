"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  ar: { refsLabel: "REFERENCES", back: "← كل المقالات" },
  en: { refsLabel: "REFERENCES", back: "← All Articles" },
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
            {block.p && <p>{block.p}</p>}
            {block.list && (
              <ul className="post-list-ul">
                {block.list.map((item, li) => (
                  <li key={li}>{item}</li>
                ))}
              </ul>
            )}
            {block.table && (
              <div className="table-wrap">
                <table className="post-table">
                  <thead>
                    <tr>
                      {block.table.headers.map((th) => (
                        <th key={th}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {block.svg && (
              <div
                className="post-figure"
                dangerouslySetInnerHTML={{ __html: block.svg }}
              />
            )}
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
