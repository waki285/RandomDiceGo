import { Locales } from "@/i18n"

export function useLocale(lang: Locales, data: any){
  return {
    t: (t: string, replace?: Record<string, string>): string => {
      try {
        const langData = data[lang];
        const ns = t.split(":")[0];
        let localeObj = langData[ns];
        const keyArr = t.split(":")[1].split(".");
        for (let i = 0; i < keyArr.length - 1; i++) {
          localeObj = localeObj[keyArr[i]!] as any;
        }
        let result = localeObj[keyArr[keyArr.length - 1]!] as string;
        if (!result) throw new Error("lang not defined");
        if (replace) {
          for (const [key, value] of Object.entries(replace)) {
            result = result.replace(`{{${key}}}`, value);
          }
        }
        return result;
        
      } catch {
        try {
          const langData = data["ja"];
          const ns = t.split(":")[0];
          let localeObj = langData[ns];
          const keyArr = t.split(":")[1].split(".");
          for (let i = 0; i < keyArr.length - 1; i++) {
            localeObj = localeObj[keyArr[i]!] as any;
          }
          let result = localeObj[keyArr[keyArr.length - 1]!] as string;
          if (!result) throw new Error("lang not defined");
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
    }
  }
}