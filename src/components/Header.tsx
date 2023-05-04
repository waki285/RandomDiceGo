import { Lilita_One } from "next/font/google";
import { MdSettings } from "react-icons/md";
const LilitaOneFont = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});
import { useSettings, useLang } from "@/pages/_app";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

export default function Header({ i18n }: { i18n: any }) {
  const { setIsOpened } = useSettings();
  const { lang, setLang } = useLang();
  const { t } = useLocale(lang, i18n)
  return (
    <>
      <header className="mb-8">
        <nav className="h-12 flex items-center justify-between">
          <span></span>
          <div className="w-12 h-12 rounded-lg hover:bg-[#00000011] grid place-items-center dark:hover:bg-[#ffffff20] cursor-pointer" onClick={() => setIsOpened(true)}>
            <MdSettings size="2rem" />
          </div>
        </nav>
        <h1 className={`text-5xl text-center ${LilitaOneFont.className}`}><Link href="/">{t("common:header.title")}</Link></h1>
      </header>
    </>
  )
}