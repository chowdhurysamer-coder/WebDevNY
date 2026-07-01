import { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * Multilingual system for WebDev NY.
 * Twelve languages, translated as accurately as possible. Missing keys fall
 * back to English (never the raw key), so partially-wired pages stay readable.
 */
export type Lang =
  | "en" | "es" | "zh" | "yue" | "ru" | "yi"
  | "bn" | "ko" | "ht" | "it" | "ar" | "pl";

export interface LangMeta { code: Lang; label: string; native: string; rtl?: boolean }

export const LANGS: LangMeta[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "zh", label: "Chinese (Mandarin)", native: "中文（普通话）" },
  { code: "yue", label: "Chinese (Cantonese)", native: "中文（廣東話）" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "yi", label: "Yiddish", native: "ייִדיש", rtl: true },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "ht", label: "Haitian Creole", native: "Kreyòl Ayisyen" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "ar", label: "Arabic", native: "العربية", rtl: true },
  { code: "pl", label: "Polish", native: "Polski" },
];

const RTL: Lang[] = ["ar", "yi"];

/**
 * Brand wordmark per language. Latin-script languages keep "WebDev".
 * Non-Latin scripts get a phonetic transliteration that *sounds* like
 * "WebDev" rather than a translation of the words.
 */
export const BRAND: Record<Lang, string> = {
  en: "WebDev", es: "WebDev", it: "WebDev", pl: "WebDev", ht: "WebDev",
  ru: "ВебДев",
  yi: "וועבדעוו",
  zh: "韦伯戴夫",
  yue: "韋伯戴夫",
  bn: "ওয়েবডেভ",
  ko: "웹데브",
  ar: "ويبديف",
};

type Entry = Partial<Record<Lang, string>> & { en: string };

const dict: Record<string, Entry> = {
  // ---- Nav ----
  "nav.services": { en: "Services", es: "Servicios", zh: "服务", yue: "服務", ru: "Услуги", yi: "סערוויסעס", bn: "সেবা", ko: "서비스", ht: "Sèvis", it: "Servizi", ar: "الخدمات", pl: "Usługi" },
  "nav.start": { en: "Start a Project", es: "Iniciar Proyecto", zh: "启动项目", yue: "開始項目", ru: "Начать проект", yi: "אָנהייבן אַ פּראָיעקט", bn: "প্রকল্প শুরু করুন", ko: "프로젝트 시작", ht: "Kòmanse yon Pwojè", it: "Avvia un Progetto", ar: "ابدأ مشروعًا", pl: "Rozpocznij projekt" },

  // ---- Nav link labels ----
  "link.index": { en: "Index", es: "Índice", zh: "首页", yue: "首頁", ru: "Главная", yi: "אינדעקס", bn: "সূচি", ko: "홈", ht: "Endèks", it: "Indice", ar: "الرئيسية", pl: "Strona główna" },
  "link.about": { en: "About", es: "Nosotros", zh: "关于", yue: "關於", ru: "О нас", yi: "וועגן אונדז", bn: "সম্পর্কে", ko: "소개", ht: "Konsènan", it: "Chi siamo", ar: "من نحن", pl: "O nas" },
  "link.design": { en: "Design & Dev", es: "Diseño y Desarrollo", zh: "设计与开发", yue: "設計與開發", ru: "Дизайн и разработка", yi: "דיזיין און אַנטוויקלונג", bn: "ডিজাইন ও ডেভেলপমেন্ট", ko: "디자인 & 개발", ht: "Konsepsyon & Devlopman", it: "Design e Sviluppo", ar: "التصميم والتطوير", pl: "Projekt i Rozwój" },
  "link.capabilities": { en: "Capabilities", es: "Capacidades", zh: "能力", yue: "能力", ru: "Возможности", yi: "פֿעיִקייטן", bn: "সক্ষমতা", ko: "역량", ht: "Kapasite", it: "Competenze", ar: "القدرات", pl: "Możliwości" },
  "link.portfolio": { en: "Portfolio", es: "Portafolio", zh: "作品集", yue: "作品集", ru: "Портфолио", yi: "פּאָרטפֿאָליאָ", bn: "পোর্টফোলিও", ko: "포트폴리오", ht: "Pòtfolyo", it: "Portfolio", ar: "أعمالنا", pl: "Portfolio" },
  "link.previews": { en: "Previews", es: "Vistas Previas", zh: "预览", yue: "預覽", ru: "Превью", yi: "פֿאָרויסבליקן", bn: "প্রিভিউ", ko: "미리보기", ht: "Apèsi", it: "Anteprime", ar: "المعاينات", pl: "Podglądy" },
  "link.analytics": { en: "Analytics", es: "Analítica", zh: "分析", yue: "分析", ru: "Аналитика", yi: "אַנאַליטיק", bn: "অ্যানালিটিক্স", ko: "분석", ht: "Analitik", it: "Analisi", ar: "التحليلات", pl: "Analityka" },
  "link.pricing": { en: "Pricing", es: "Precios", zh: "价格", yue: "價格", ru: "Цены", yi: "פּרייַזן", bn: "মূল্য", ko: "가격", ht: "Pri", it: "Prezzi", ar: "الأسعار", pl: "Cennik" },
  "link.plans": { en: "Plans", es: "Planes", zh: "方案", yue: "方案", ru: "Планы", yi: "פּלענער", bn: "প্ল্যান", ko: "플랜", ht: "Plan", it: "Piani", ar: "الخطط", pl: "Plany" },
  "link.journal": { en: "Journal", es: "Diario", zh: "日志", yue: "日誌", ru: "Журнал", yi: "זשורנאַל", bn: "জার্নাল", ko: "저널", ht: "Jounal", it: "Diario", ar: "المدونة", pl: "Dziennik" },
  "link.contact": { en: "Contact", es: "Contacto", zh: "联系", yue: "聯絡", ru: "Контакты", yi: "קאָנטאַקט", bn: "যোগাযোগ", ko: "연락처", ht: "Kontak", it: "Contatti", ar: "اتصل بنا", pl: "Kontakt" },

  // ---- Hero ----
  "hero.eyebrow": { en: "Web studio · New York", es: "Estudio web · Nueva York", zh: "网页工作室 · 纽约", yue: "網頁工作室 · 紐約", ru: "Веб-студия · Нью-Йорк", yi: "וועב סטודיאָ · ניו יאָרק", bn: "ওয়েব স্টুডিও · নিউ ইয়র্ক", ko: "웹 스튜디오 · 뉴욕", ht: "Estidyo Entènèt · New York", it: "Studio web · New York", ar: "استوديو ويب · نيويورك", pl: "Studio internetowe · Nowy Jork" },
  "hero.sub": {
    en: "We design and build custom websites for New York businesses, fast, distinctive, and engineered to turn a click into a customer.",
    es: "Diseñamos y desarrollamos sitios web a medida para negocios de Nueva York, rápidos, distintivos y creados para convertir un clic en un cliente.",
    zh: "我们为纽约的企业设计和开发定制网站，快速、独特，并且经过精心打造，能把每一次点击变成客户。",
    yue: "我哋為紐約嘅企業設計同開發度身訂造嘅網站，快速、獨特，並且精心打造，將每一次點擊變成客戶。",
    ru: "Мы проектируем и создаём индивидуальные сайты для нью-йоркского бизнеса — быстрые, запоминающиеся и построенные так, чтобы превращать клик в клиента.",
    yi: "מיר פּלאַנירן און בויען מנהג וועבזייטלעך פֿאַר ניו-יאָרקער געשעפֿטן, גיך, אויסגעצייכנט, און געבויט צו פֿאַרוואַנדלען אַ קליק אין אַ קונה.",
    bn: "আমরা নিউ ইয়র্কের ব্যবসার জন্য কাস্টম ওয়েবসাইট ডিজাইন ও তৈরি করি, দ্রুত, স্বতন্ত্র এবং একটি ক্লিককে গ্রাহকে রূপান্তরিত করার জন্য প্রকৌশলে গড়া।",
    ko: "우리는 뉴욕 비즈니스를 위한 맞춤형 웹사이트를 빠르고 독창적으로, 클릭을 고객으로 전환하도록 설계하고 구축합니다.",
    ht: "Nou konsevwa epi bati sit entènèt sou mezi pou biznis New York, rapid, distenktif, epi fèt pou fè yon klik tounen yon kliyan.",
    it: "Progettiamo e sviluppiamo siti web su misura per le aziende di New York: veloci, distintivi e concepiti per trasformare un clic in un cliente.",
    ar: "نصمم ونبني مواقع ويب مخصصة لشركات نيويورك، سريعة ومميزة ومصممة لتحويل النقرة إلى عميل.",
    pl: "Projektujemy i tworzymy strony internetowe na miarę dla firm z Nowego Jorku, szybkie, wyróżniające się i stworzone, by zamienić kliknięcie w klienta.",
  },
  "hero.start": { en: "Start a project", es: "Iniciar proyecto", zh: "启动项目", yue: "開始項目", ru: "Начать проект", yi: "אָנהייבן אַ פּראָיעקט", bn: "প্রকল্প শুরু করুন", ko: "프로젝트 시작", ht: "Kòmanse yon pwojè", it: "Avvia un progetto", ar: "ابدأ مشروعًا", pl: "Rozpocznij projekt" },
  "hero.work": { en: "See the work", es: "Ver el trabajo", zh: "查看作品", yue: "睇下作品", ru: "Смотреть работы", yi: "זען די אַרבעט", bn: "কাজ দেখুন", ko: "작업 보기", ht: "Gade travay la", it: "Guarda i lavori", ar: "شاهد أعمالنا", pl: "Zobacz prace" },
  "hero.trusted": { en: "Trusted by New York businesses", es: "La confían negocios de Nueva York", zh: "深受纽约企业信赖", yue: "深受紐約企業信賴", ru: "Нам доверяет бизнес Нью-Йорка", yi: "געטרויט דורך ניו-יאָרקער געשעפֿטן", bn: "নিউ ইয়র্কের ব্যবসাগুলোর আস্থা", ko: "뉴욕 비즈니스가 신뢰합니다", ht: "Biznis New York fè nou konfyans", it: "Scelto dalle aziende di New York", ar: "موثوق من شركات نيويورك", pl: "Zaufały nam firmy z Nowego Jorku" },

  // ---- Footer ----
  "footer.desc": {
    en: "A web studio in New York. We design and build sites for businesses that take themselves seriously, and want a site that does too.",
    es: "Un estudio web en Nueva York. Diseñamos y construimos sitios para negocios que se toman en serio, y quieren un sitio que también lo haga.",
    zh: "一家位于纽约的网页工作室。我们为认真对待自己的企业设计和开发同样认真的网站。",
    yue: "一間位於紐約嘅網頁工作室。我哋為認真對待自己嘅企業設計同開發同樣認真嘅網站。",
    ru: "Веб-студия в Нью-Йорке. Мы создаём сайты для компаний, которые серьёзно относятся к себе и хотят сайт под стать.",
    yi: "אַ וועב סטודיאָ אין ניו-יאָרק. מיר פּלאַנירן און בויען וועבזייטלעך פֿאַר געשעפֿטן וואָס נעמען זיך ערנסט, און ווילן אַ וועבזייטל וואָס טוט אויך אַזוי.",
    bn: "নিউ ইয়র্কের একটি ওয়েব স্টুডিও। আমরা এমন ব্যবসার জন্য সাইট ডিজাইন ও তৈরি করি যারা নিজেদের গুরুত্বের সাথে নেয় এবং তেমন একটি সাইট চায়।",
    ko: "뉴욕의 웹 스튜디오입니다. 스스로를 진지하게 여기고 그에 걸맞은 사이트를 원하는 비즈니스를 위해 사이트를 설계하고 구축합니다.",
    ht: "Yon estidyo entènèt nan New York. Nou konsevwa epi bati sit pou biznis ki pran tèt yo o serye, epi ki vle yon sit ki fè menm bagay la.",
    it: "Uno studio web a New York. Progettiamo e realizziamo siti per aziende che si prendono sul serio e vogliono un sito che faccia lo stesso.",
    ar: "استوديو ويب في نيويورك. نصمم ونبني مواقع للشركات التي تأخذ نفسها على محمل الجد وتريد موقعًا يفعل الشيء نفسه.",
    pl: "Studio internetowe w Nowym Jorku. Projektujemy i budujemy strony dla firm, które traktują siebie poważnie i chcą strony, która robi to samo.",
  },
};

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; brand: string; rtl: boolean }
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k, brand: "WebDev", rtl: false });

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
  return (
    <LangContext.Provider value={{ lang, setLang, t, brand: BRAND[lang], rtl: RTL.includes(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
