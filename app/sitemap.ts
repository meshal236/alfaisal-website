import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { frameworks } from "@/lib/nca";

const SITE = "https://alfaisal.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/nca`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/nca/search`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/chat`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const articlePages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}-01`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const frameworkPages: MetadataRoute.Sitemap = frameworks.map((f) => ({
    url: `${SITE}/nca/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...frameworkPages, ...articlePages];
}
