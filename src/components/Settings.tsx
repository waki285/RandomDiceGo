import { useSettings, useTheme, useLang } from "@/pages/_app";
import { MdClose, MdLightMode, MdDarkMode } from "react-icons/md";
import { useLocale } from "@/hooks/useLocale";
import { Locales, serverSideTranslations } from "@/i18n";

export default function Settings() {
  const { isOpened, setIsOpened } = useSettings();
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { t } = useLocale(lang, {
    ja: {
      s: {
        settings: "設定",
        darkMode: "ダークモード",
        language: "言語"
      }
    },
    en: {
      s: {
        settings: "Settings",
        darkMode: "Dark Mode",
        language: "Language"
      }
    }
  });
  return (
    <div className={`fixed h-full w-full grid place-items-center z-10 bg-[#696969f0] ${isOpened ? "block" : "hidden"}`} onClick={() => setIsOpened(false)}>
      <div className="w-96 h-96 bg-white dark:bg-black dark:text-white rounded-lg shadow select-none" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center h-10">
          <p className="pl-2">{t("s:settings")}</p>
          <div className="grid place-items-center w-8 h-8 hover:bg-[#00000020] rounded dark:hover:bg-[#ffffff20] cursor-pointer" onClick={(e) => setIsOpened(false)}>
            <MdClose size="1.5rem" />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-y-8 items-center">
          <p>{t("s:darkMode")}</p>
          <div className={`toggle ${theme === "dark" ? "checked" : ""}`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <div className="togglebox grid place-items-center">{theme === "dark" ? <MdDarkMode size="1.5rem" fill="black" /> : <MdLightMode size="1.5rem" fill="black" />}</div>
          </div>
          <p>言語/Language</p>
          <select value={lang} onChange={(e) => setLang(e.target.value as Locales)} className="rounded-lg p-3 border border-black dark:border-white dark:bg-black dark:text-white">
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  )
}