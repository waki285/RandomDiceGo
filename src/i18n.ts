export const locales = ["en", "ja"] as const;
export type Locales = (typeof locales)[number];

const dev = process.env.NEXT_ENV !== 'production';

export async function serverSideTranslations(ns: string[]) {
//  console.log(ns);
  const contents = {} as Record<Locales, Record<(typeof ns)[number], object>>;
  for (const lang of locales) {
    contents[lang] = {};
    for (const n of ns) {
      const res = await fetch(`${dev ? "http://localhost:3000":"https://rdg.suzuneu.com"}/locales/${lang}/${n}.json`);    
      const json = await res.json();
      contents[lang][n] = json;
    }
  }
//  console.log(contents);
  return { i18n: contents };
}