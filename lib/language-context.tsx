"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

type Ctx = {
  lang: Lang;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx>({
  lang: "ar",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lang");
      if (saved === "en" || saved === "ar") setLang(saved);
    } catch {
      // ignore storage access issues
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem("lang", lang);
    } catch {
      // ignore storage access issues
    }
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
