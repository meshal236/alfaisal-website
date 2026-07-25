import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  title: "مشعل الفيصل — Infrastructure & AI",
  description:
    "خبير بنية تحتية وعمليات تقنية — قيادة فرق، رفع كفاءة، وإدارة مشاريع البنية التحتية.",
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
        </LanguageProvider>
      </body>
    </html>
  );
}
