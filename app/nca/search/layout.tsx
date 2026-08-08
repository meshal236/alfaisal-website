import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البحث في ضوابط الأمن السيبراني الوطنية",
  description:
    "بحث موحّد في 833 ضابطًا عبر أطر الهيئة الوطنية للأمن السيبراني السبعة، بالعربية والإنجليزية، برقم الضابط أو نصه أو الأدلة المطلوبة.",
  alternates: { canonical: "/nca/search" },
  openGraph: {
    title: "البحث في ضوابط الأمن السيبراني الوطنية",
    description:
      "بحث موحّد في 833 ضابطًا عبر أطر NCA السبعة بالعربية والإنجليزية.",
    url: "https://alfaisal.ai/nca/search",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
