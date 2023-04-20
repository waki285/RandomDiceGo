import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Ogp from "@/components/Ogp";
import Header from "@/components/Header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
  }
}

export default function Home() {
  const { t } = useTranslation('common');
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
      <Header />
      <main className="">
        <Link href="/alldices" className="link">All Dices</Link>
        <p>翻訳test</p>
      </main>
    </>
  );
}
