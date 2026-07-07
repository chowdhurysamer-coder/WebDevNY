import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { dict } from "@/lib/translations";

/**
 * Multilingual system for WebDev NY.
 * Twelve languages, translated as accurately as possible. Missing keys fall
 * back to English (never the raw key), so partially-wired pages stay readable.
 */
export type Lang =
  | "en" | "es" | "zh" | "yue" | "ru" | "fr"
  | "bn" | "ko" | "ht" | "it" | "ar" | "pl";

export interface LangMeta { code: Lang; label: string; native: string; rtl?: boolean }

export const LANGS: LangMeta[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "zh", label: "Chinese (Mandarin)", native: "中文（普通话）" },
  { code: "yue", label: "Chinese (Cantonese)", native: "中文（廣東話）" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "fr", label: "French", native: "Français" },
  { code: "bn", label: "Bangla", native: "বাংলা" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "ht", label: "Haitian Creole", native: "Kreyòl Ayisyen" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "ar", label: "Arabic", native: "العربية", rtl: true },
  { code: "pl", label: "Polish", native: "Polski" },
];

const RTL: Lang[] = ["ar"];

/**
 * Per-locale digit glyphs, index 0–9. Only locales whose script uses its own
 * numerals are listed; everything else keeps Western digits (0-9). `num()`
 * rewrites the digits in any string so counters, clocks, prices, phone
 * numbers, etc. read natively.
 */
const NUMERALS: Partial<Record<Lang, string[]>> = {
  bn: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
  ar: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
};

export function localizeDigits(input: string | number, lang: Lang): string {
  const s = String(input);
  const g = NUMERALS[lang];
  return g ? s.replace(/[0-9]/g, (d) => g[+d]) : s;
}

/**
 * Brand wordmark per language. Latin-script languages keep "WebDev".
 * Non-Latin scripts get a phonetic transliteration that *sounds* like
 * "WebDev" rather than a translation of the words.
 */
export const BRAND: Record<Lang, string> = {
  en: "WebDev", es: "WebDev", it: "WebDev", pl: "WebDev", ht: "WebDev", fr: "WebDev",
  ru: "ВебДев",
  zh: "韦伯戴夫",
  yue: "韋伯戴夫",
  bn: "ওয়েবডেভ",
  ko: "웹데브",
  ar: "ويبديف",
};


interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; num: (v: string | number) => string; brand: string; rtl: boolean }
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k, num: (v) => String(v), brand: "WebDev", rtl: false });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("webdevny_lang") as Lang) || "en"; } catch { return "en"; }
  });
  const apply = useCallback((l: Lang) => {
    const rtl = RTL.includes(l);
    document.documentElement.setAttribute("lang", l);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  }, []);
  useEffect(() => { apply(lang); }, [lang, apply]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("webdevny_lang", l); } catch { /* ignore */ }
  }, []);
  const t = useCallback((key: string) => {
    const e = dict[key];
    if (!e) return key;
    return e[lang] ?? e.en;
  }, [lang]);
  const num = useCallback((v: string | number) => localizeDigits(v, lang), [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t, num, brand: BRAND[lang], rtl: RTL.includes(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
