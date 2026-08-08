import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أطر الأمن السيبراني الوطنية (NCA)، مرجع منظّم",
  description:
    "مرجع منظّم لأطر الهيئة الوطنية للأمن السيبراني السبعة: ECC وCCC وCSCC وOTCC وDCC وTCC وOSMACC، 833 ضابطًا ببنيتها الكاملة، ونطاق تطبيق كل إطار، وملفات التقييم والوثائق الرسمية للتحميل.",
  alternates: { canonical: "/nca" },
  openGraph: {
    title: "أطر الأمن السيبراني الوطنية (NCA)، مرجع منظّم",
    description:
      "مرجع منظّم لأطر الهيئة الوطنية للأمن السيبراني السبعة: ECC وCCC وCSCC وOTCC وDCC وTCC وOSMACC، 833 ضابطًا ببنيتها الكاملة، ونطاق تطبيق كل إطار، وملفات التقييم والوثائق الرسمية للتحميل.",
    url: "https://alfaisal.ai/nca",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
