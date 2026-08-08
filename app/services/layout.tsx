import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخدمات — مشعل الفيصل",
  description: "خدمات تقنية متخصصة: تمديد كابلات الشبكات والألياف الضوئية، أنظمة الشبكات السلكية واللاسلكية، تفعيل وإعداد الشبكات، أنظمة المراقبة DVR/NVR، وكلاء الذكاء الاصطناعي، واستشارات البنية التحتية.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "الخدمات — مشعل الفيصل",
    description: "خدمات تقنية متخصصة: تمديد كابلات الشبكات والألياف الضوئية، أنظمة الشبكات السلكية واللاسلكية، تفعيل وإعداد الشبكات، أنظمة المراقبة DVR/NVR، وكلاء الذكاء الاصطناعي، واستشارات البنية التحتية.",
    url: "https://alfaisal.ai/services",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
