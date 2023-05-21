import { Locales } from "@/i18n"

export function useLocale(lang: Locales, data: any, n?: string){
  return {
    t: (t: string, replace?: Record<string, string>): string => {
      try {
        const langData = data[lang];
        const ns = t.includes(":") ? t.split(":")[0]:n!;
        let localeObj = langData[ns];
        const keyArr = t.includes(":") ? t.split(":")[1].split("."):t.split(".");
        for (let i = 0; i < keyArr.length - 1; i++) {
          localeObj = localeObj[keyArr[i]!] as any;
        }
        let result = localeObj[keyArr[keyArr.length - 1]!] as string;
        if (!result && result !== "") throw new Error("lang not defined");
        if (replace) {
          for (const [key, value] of Object.entries(replace)) {
            result = result.replace(`{{${key}}}`, value);
          }
        }
        return result;
        
      } catch {
        try {
          const langData = data["ja"];
          const ns = t.includes(":") ? t.split(":")[0]:n!;
          let localeObj = langData[ns];
          const keyArr = t.includes(":") ? t.split(":")[1].split("."):t.split(".");
          for (let i = 0; i < keyArr.length - 1; i++) {
            localeObj = localeObj[keyArr[i]!] as any;
          }
          let result = localeObj[keyArr[keyArr.length - 1]!] as string;
          if (!result && result !== "") throw new Error("lang not defined");
          if (replace) {
            for (const [key, value] of Object.entries(replace)) {
              result = result.replace(`{{${key}}}`, value);
            }
          }
          return result;
        } catch {
          return "Translation Error"
        }
      }
    },
    s: (obj: Record<string, string>) => {
      return obj[lang] ?? obj["ja"]
    }
  }
}