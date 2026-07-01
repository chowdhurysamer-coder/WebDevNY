import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "en" | "es";

const dict: Record<string, { en: string; es: string }> = {
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.start": { en: "Start a Project", es: "Iniciar Proyecto" },
  "hero.eyebrow": { en: "Web studio · New York", es: "Estudio web · Nueva York" },
  "hero.sub": {
    en: "We design and build custom websites for New York businesses, fast, distinctive, and engineered to turn a click into a customer.",
    es: "Diseñamos y desarrollamos sitios web a medida para negocios de Nueva York, rápidos, distintivos y creados para convertir un clic en un cliente.",
  },
  "hero.start": { en: "Start a project", es: "Iniciar proyecto" },
  "hero.work": { en: "See the work", es: "Ver el trabajo" },
  "hero.trusted": { en: "Trusted by New York businesses", es: "La confían negocios de Nueva York" },
  "footer.desc": {
    en: "A web studio in New York. We design and build sites for businesses that take themselves seriously, and want a site that does too.",
    es: "Un estudio web en Nueva York. Diseñamos y construimos sitios para negocios que se toman en serio, y quieren un sitio que también lo haga.",
  },
};

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("webdevny_lang") as Lang) || "en"; } catch { return "en"; }
  });
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("webdevny_lang", l); } catch { /* ignore */ }
    document.documentElement.setAttribute("lang", l);
  }, []);
  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
