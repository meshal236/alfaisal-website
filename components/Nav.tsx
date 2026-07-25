"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

const LINKS = {
  ar: [
    { href: "/", label: "الرئيسية" },
    { href: "/services", label: "الخدمات" },
    { href: "/chat", label: "المحادثة" },
    { href: "/blog", label: "المقالات" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/chat", label: "Chat" },
    { href: "/blog", label: "Blog" },
  ],
};

export default function Nav() {
  const path = usePathname();
  const { lang, toggle } = useLanguage();
  const links = LINKS[lang];

  return (
    <nav className="nav">
      <Link href="/" className="nav-mark">
        مشعل<em>.</em>الفيصل
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              (l.href === "/" ? path === "/" : path.startsWith(l.href))
                ? "active"
                : ""
            }
          >
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggle}
          className="lang-toggle"
          aria-label="Switch language"
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>
      </div>
    </nav>
  );
}
