import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Ogp from "@/components/Ogp";
import Header from "@/components/Header";

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

export default function Home() {
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
      <main className="flex flex-col">
        <Link href="/alldices" className="link">All Dices</Link>
        <Link href="/calculator" className="link">Calculator</Link>
      </main>
    </>
  );
}
