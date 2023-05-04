import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans_JP, Inter } from "next/font/google";
import Head from "next/head";
import Settings from "@/components/Settings";
import { createContext, useContext, useEffect, useState, Suspense } from "react";

import { Locales } from "@/i18n";

const IBMPlexSansJPFont = IBM_Plex_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  adjustFontFallback: false,
});
const InterFont = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});


const SettingsContext = createContext({ isOpened: false, setIsOpened: (args: boolean) => {} });
export const useSettings = () => useContext(SettingsContext);
const ThemeContext = createContext({ theme: "dark", setTheme: (args: string) => {} });
export const useTheme = () => useContext(ThemeContext);
const LangContext = createContext<{ lang: Locales, setLang: (args: Locales) => void }>({ lang: "en", setLang: (args: string) => {} })
export const useLang = () => useContext(LangContext);

function App({ Component, pageProps }: AppProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState<Locales>("en");
  const themeSet = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }
  const langSet = (lang: Locales) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
  }
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme")!);
    } else if (matchMedia("(prefers-color-scheme: dark)")) {
      setTheme("dark")
    }
    if (localStorage.getItem("lang")) {
      setLang(localStorage.getItem("lang") as Locales);
    } else if (navigator.language === "ja") {
      setLang("ja")
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <LangContext.Provider value={{ lang, setLang: langSet }}>
    <ThemeContext.Provider value={{ theme, setTheme: themeSet }}>
      <SettingsContext.Provider value={{ isOpened, setIsOpened }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <style jsx global>
          {`
            #app-root {
              font-family: ${InterFont.style.fontFamily}, ${IBMPlexSansJPFont.style.fontFamily}, sans-serif;
            }
          `}
        </style>
        <div className={`h-full`}>
          <Settings />
          <div className="bg-amber-50 dark:bg-zinc-900 fixed w-[100lvw] h-[100lvh] top-0 left-0 -z-50 pointer-events-none"></div>
          <div id="app-root" className="text-black dark:text-white">
            <Component {...pageProps} />
          </div>
        </div>
      </SettingsContext.Provider>
    </ThemeContext.Provider>
    </LangContext.Provider>
    </Suspense>
  );
}

export default App;//appWithTranslation(App);