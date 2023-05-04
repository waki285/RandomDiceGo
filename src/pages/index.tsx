import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Ogp from "@/components/Ogp";
import Header from "@/components/Header";

import { serverSideTranslations } from "@/i18n";
import { useLocale } from "@/hooks/useLocale";
import { useLang } from "@/pages/_app";

/*
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
  }
}*/

export default function Home({ i18n }: { i18n: object }) {
  const { lang } = useLang();
  const { t } = useLocale(lang, i18n);
  return (
    <>
      <Head>
        <title>ホーム｜RandomDiceGo攻略</title>
      </Head>
      <Ogp
        url="https://rdg.suzuneu.com"
        type="website"
        title="ホーム"
        description="RandomDiceGoを解説します。"
      />
      <Header {...{ i18n }} />
      <main className="flex flex-col">
        {t("common:header.title")}
        <Link href="/alldices" className="link">All Dices</Link>
        <Link href="/calculator" className="link">Calculator</Link>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const d = await serverSideTranslations(["common"]);
//  globalThis.i18nData = d;
  return { props: {...d}}
}