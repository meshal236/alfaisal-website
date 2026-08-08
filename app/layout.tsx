import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";
const alex = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-alex",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://alfaisal.ai"),
  title: {
    default: "مشعل الفيصل، البنية التحتية والأمن السيبراني والذكاء الاصطناعي",
    template: "%s | مشعل الفيصل",
  },
  description:
    "قيادة البنية التحتية والعمليات التقنية، الشبكات ومراكز البيانات والحوسبة السحابية ووكلاء الذكاء الاصطناعي، مع مرجع منظّم لأطر الأمن السيبراني الوطنية (NCA).",
  alternates: { canonical: "/" },
  openGraph: {
    title: "مشعل الفيصل، البنية التحتية والأمن السيبراني والذكاء الاصطناعي",
    description:
      "قيادة البنية التحتية والعمليات التقنية، ومرجع منظّم لأطر الأمن السيبراني الوطنية (NCA).",
    url: "https://alfaisal.ai",
    siteName: "alfaisal.ai",
    locale: "ar_SA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alex.variable} ${mono.variable}`}>
        <LanguageProvider>
          <Nav />
          {children}
          <Footer />
          <WhatsappButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
