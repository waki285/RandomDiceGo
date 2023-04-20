import { useSettings, useTheme } from "@/pages/_app";
import { MdClose, MdLightMode, MdDarkMode } from "react-icons/md";

export default function Settings() {
  const { isOpened, setIsOpened } = useSettings();
  const { theme, setTheme } = useTheme();
  return (
    <div className={`fixed h-full w-full grid place-items-center z-10 bg-[#696969f0] ${isOpened ? "block" : "hidden"}`} onClick={() => setIsOpened(false)}>
      <div className="w-96 h-96 bg-white rounded-lg shadow select-none" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center h-10">
          <p className="pl-2">設定</p>
          <div className="grid place-items-center w-8 h-8 hover:bg-[#00000020] rounded dark:hover:bg-[#ffffff20] cursor-pointer" onClick={(e) => setIsOpened(false)}>
            <MdClose size="1.5rem" />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-y-8 items-center">
          <p>ダークモード</p>
          <div className={`toggle ${theme === "dark" ? "checked" : ""}`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <div className="togglebox grid place-items-center">{theme === "dark" ? <MdDarkMode size="1.5rem" /> : <MdLightMode size="1.5rem" />}</div>
          </div>
          <p>言語</p>
          <p>日本語(まだ選べません)</p>
        </div>
      </div>
    </div>
  )
}