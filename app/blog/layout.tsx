import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المقالات — البنية التحتية والذكاء الاصطناعي",
  description: "مقالات تقنية بالعربية والإنجليزية في البنية التحتية والشبكات ووكلاء الذكاء الاصطناعي والحوسبة السحابية والاستضافة الذاتية، مع مراجع لكل مقالة.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "المقالات — البنية التحتية والذكاء الاصطناعي",
    description: "مقالات تقنية بالعربية والإنجليزية في البنية التحتية والشبكات ووكلاء الذكاء الاصطناعي والحوسبة السحابية والاستضافة الذاتية، مع مراجع لكل مقالة.",
    url: "https://alfaisal.ai/blog",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
