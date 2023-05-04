import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect, useState, createContext, useContext } from "react";
import Ogp from "@/components/Ogp";
import { serverSideTranslations } from "@/i18n";
import { useLang } from "@/pages/_app";
import { useLocale } from "@/hooks/useLocale";

// 画像素材
// ノーマル
import NormalDices from "@/alldices/normal";
// レア
import RareDices from "@/alldices/rare";
// 英雄
import UniqueDices from "@/alldices/unique";
// 伝説
import LegendaryDices from "@/alldices/legendary";
// 四神
import GuardianDices from "@/alldices/guardian";
// 妖怪
import CreatureDices from "@/alldices/creature";

const I18nContext = createContext<any>({});

//export const useI18n = useContext(I18nContext);

export default function AllDices({ i18n }: { i18n: any }) {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h3, h4",
    });
    return () => tocbot.destroy();
  }, []);
  const [diceClasses, setDiceClasses] = useState<Record<string, number>>({});
  const [diceDots, setDiceDots] = useState<Record<string, number>>({});
  const { lang } = useLang();
  const { t } = useLocale(lang, i18n);
  useEffect(() => {
    tocbot.refresh();
  }, [lang])
 return (
    <I18nContext.Provider value={i18n}>
      <Head>
        <title>{`${t("alldices:alldices")}｜RandomDiceGo攻略`}</title>
      </Head>
      <Ogp
        url="https://rdg.suzuneu.com/alldices"
        type="article"
        title="全ダイス解説"
        description="RandomDiceGoにおける全ダイスを解説します。"
      />
      <Header i18n={i18n} />
      <main className="mx-4 pc:mx-12">
        <Headline id="all-dices">{t("alldices:alldices")}</Headline>
        <p>{t("alldices:version", { date: "20023/05/04", ver: "1.2.2" })}</p>
        <p>Special Thanks: <a href="http://aureliano.ml/randomdice/alldices.html" className="link">http://aureliano.ml/randomdice/alldices.html</a></p>
        <Headline id="warning">{t("common:notes")}</Headline>
        {/*<p>攻撃速度の値は、<code>1秒に○回攻撃</code>ということです。</p>
        <p>たとえば、<code>1</code>なら1秒間に1回攻撃ですが、<code>2</code>なら1秒間に2回、つまり0.5秒おきに1回攻撃です。(ランダムダイス本家とは仕様が異なるので注意)</p>
        <p>またこのため、本家とは違い攻撃速度内で出目数回攻撃ではなく、<span className="font-bold">1秒間に攻撃速度回攻撃</span>です。出目数は関係ありません。</p>
        <p>(しかし出目数恩恵に殆どの場合攻撃速度があるので、出目が上がれば攻撃速度が早くなります。)</p>*/}
        <p>{t("alldices:notes.lock")}</p>
        <p>{t("alldices:notes.speed")}</p>
        <p>{t("alldices:notes.seconds")}</p>
        <Headline id="toc-headline">{t("common:toc")}</Headline>
        <aside className="toc" />
        <Headline id="dices-headline">{t("common:dice")}</Headline>
        <div className="body">
          <Headline id="dices-normal" renderAs="h3" fontSize={1.25} borderColor="darkgray">{t("common:normal")}</Headline>
          <NormalDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} i18n={i18n} />
          <Headline id="dices-rare" renderAs="h3" fontSize={1.25} borderColor="deepskyblue">{t("common:rare")}</Headline>
          <RareDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
          <Headline id="dices-unique" renderAs="h3" fontSize={1.25} borderColor="magenta">{t("common:unique")}</Headline>
          <UniqueDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />          
          <Headline id="dices-legendary" renderAs="h3" fontSize={1.25} borderColor="gold">{t("common:legendary")}</Headline>
          <LegendaryDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />                 
          <Headline id="dices-guardians" renderAs="h3" fontSize={1.25} borderColor="mediumpurple">{t("common:guardian")}</Headline>
          <p>{t("alldices:notes.jil")}</p>
          <GuardianDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
          <Headline id="dices-creatures" renderAs="h3" fontSize={1.25} borderColor="mediumpurple">{t("common:creature")}</Headline>
          <p>{t("alldices:notes.jil")}</p>
          <CreatureDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
        </div>
      </main>
    </I18nContext.Provider>
  );
}

export const getServerSideProps = async () => {
  const d = await serverSideTranslations(["common", "dicedesc/normal",/* "dicedesc/rare", "dicedesc/unique", "dicedesc/legendary", "dicedesc/guardian", "dicedesc/creature"*/ "alldices"]);
//  globalThis.i18nData = d;
  return { props: {...d}}
}