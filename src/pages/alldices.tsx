import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect, useState, memo, Fragment } from "react";
import Ogp from "@/components/Ogp";

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

export default function AllDices() {
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
  return (
    <>
      <Head>
        <title>全ダイス解説｜RandomDiceGo攻略</title>
      </Head>
      <Ogp
        url="https://rdg.suzuneu.com/alldices"
        type="article"
        title="全ダイス解説"
        description="RandomDiceGoにおける全ダイスを解説します。"
      />
      <Header />
      <main className="mx-4 pc:mx-12">
        <Headline id="all-dices">全ダイス解説</Headline>
        <p>2023/04/22 (バージョン1.2.1) 時点の Random Dice GO の全ダイスを説明します。製作途中なので温かい目で見守ってくれれば幸いです。</p>
        <p>Special Thanks: <a href="http://aureliano.ml/randomdice/alldices.html" className="link">http://aureliano.ml/randomdice/alldices.html</a></p>
        <Headline id="warning">注意事項</Headline>
        {/*<p>攻撃速度の値は、<code>1秒に○回攻撃</code>ということです。</p>
        <p>たとえば、<code>1</code>なら1秒間に1回攻撃ですが、<code>2</code>なら1秒間に2回、つまり0.5秒おきに1回攻撃です。(ランダムダイス本家とは仕様が異なるので注意)</p>
        <p>またこのため、本家とは違い攻撃速度内で出目数回攻撃ではなく、<span className="font-bold">1秒間に攻撃速度回攻撃</span>です。出目数は関係ありません。</p>
        <p>(しかし出目数恩恵に殆どの場合攻撃速度があるので、出目が上がれば攻撃速度が早くなります。)</p>*/}
        <p>本作Random Dice: GO(以下RDG)は本家Random Dice: Defense(以下本家)とは異なり現状どの出目でも攻撃回数は1固定です。</p>
        <p>RDGは出目の数分の攻撃をするわけではなく(1なら1、5なら5等)、攻撃速度=1秒間に何回攻撃するかです。</p>
        <p>また、「本家式攻撃速度」とは、RDG式の攻撃速度を本家のsecondsに直したものになります。小数第2位より下は四捨五入です。</p>
        <Headline id="toc-headline">目次</Headline>
        <aside className="toc" />
        <Headline id="dices-headline">ダイス</Headline>
        <div className="body">
          <Headline id="dices-normal" renderAs="h3" fontSize={1.25} borderColor="darkgray">ノーマル</Headline>
          <NormalDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
          <Headline id="dices-rare" renderAs="h3" fontSize={1.25} borderColor="deepskyblue">レア</Headline>
          <RareDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
          <Headline id="dices-unique" renderAs="h3" fontSize={1.25} borderColor="magenta">英雄</Headline>
          <UniqueDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />          
          <Headline id="dices-legendary" renderAs="h3" fontSize={1.25} borderColor="gold">伝説</Headline>
          <LegendaryDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />                 
          <Headline id="dices-guardians" renderAs="h3" fontSize={1.25} borderColor="mediumpurple">四神</Headline>
          <p>※判定は伝説です。</p>
          <GuardianDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
          <Headline id="dices-creatures" renderAs="h3" fontSize={1.25} borderColor="mediumpurple">妖怪</Headline>
          <p>※判定は伝説です。</p>
          <CreatureDices diceClasses={diceClasses} setDiceClasses={setDiceClasses} diceDots={diceDots} setDiceDots={setDiceDots} />
        </div>
      </main>
    </>
  );
}
