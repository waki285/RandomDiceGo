import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans_JP, Inter } from "next/font/google";
import Head from "next/head";
import Settings from "@/components/Settings";
import { createContext, useContext, useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";

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

function App({ Component, pageProps }: AppProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [theme, setTheme] = useState("light");
  const themeSet = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme")!);
    } else if (matchMedia("(prefers-color-scheme: dark)")) {
      setTheme("dark")
    }
  }, []);
  return (
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
        <div className={`h-full ${theme === "dark" ? "dark":""}`}>
          <Settings />
          <div id="app-root" className="bg-amber-50 dark:bg-zinc-900 text-black dark:text-white">
            <Component {...pageProps} />
          </div>
        </div>
      </SettingsContext.Provider>
    </ThemeContext.Provider>
  );
}

export default appWithTranslation(App);