import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI HUB، أدوات ومحرك الذكاء الاصطناعي",
  description:
    "مركز أدوات الذكاء الاصطناعي: محرك محادثة خاص بالموقع، ودليل مختار لأكثر من 40 خدمة ذكاء اصطناعي مجانية للمحادثة وتوليد الصور والصوت ومنصات المطورين.",
  alternates: { canonical: "/chat" },
  openGraph: {
    title: "AI HUB، أدوات ومحرك الذكاء الاصطناعي",
    description:
      "مركز أدوات الذكاء الاصطناعي: محرك محادثة خاص بالموقع، ودليل مختار لأكثر من 40 خدمة ذكاء اصطناعي مجانية للمحادثة وتوليد الصور والصوت ومنصات المطورين.",
    url: "https://alfaisal.ai/chat",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
