import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect, useState, memo, Fragment } from "react";
import Ogp from "@/components/Ogp";
import Big from "big.js"
import { minimumClass, DiceInfo, IC, incrementalCalculate } from "@/alldices/components";
import { Exo_2 } from "next/font/google";

import LevelUpImage_0 from "@/../public/dices/levelup.webp";
import LevelUpImage from "@/../public/dices/levelup_gt0.webp";

const exo2 = Exo_2({
  weight: ["700"],
  subsets: ["latin"]
});

export const DiceDesc = memo(function DiceDesc(desc: DiceInfo) {
  const minClass = minimumClass[desc.rarity];
  const [diceClass, setDiceClass] = [desc.diceClasses[desc.id] || minClass, (diceClass: number) => {
    desc.setDiceClasses((x: any) => {
      return {
        ...x,
        [desc.id]: diceClass,
      }
    });
  }]
  const [dot, setDot] = [desc.dots[desc.id] || 1, (dot: number) => {
    desc.setDots((x: any) => {
      return {
        ...x,
        [desc.id]: dot,
      }
    });
  }]
  return (
    <>
      <Headline id={`dice-${desc.id}`} renderAs="h4" fontSize={1.125} borderColor={desc.diceColor} borderGradient={desc.diceColorGradient}>{desc.name}</Headline>
      <section className="image flex gap-8 my-4 flex-wrap">
        <Image src={desc.image} alt="" className="" width={128} loader={({ src }) => src} unoptimized />
      </section>
      <section className="increment flex mt-4 gap-4 pc:gap-12 flex-col pc:flex-row">
        <div className="flex-grow flex flex-col">
          <p>クラス: {desc.diceClasses[desc.id] || minClass}</p>
          <input type="range" min={minClass} max={15} value={diceClass} onChange={(e) => setDiceClass(Number(e.target.value))} aria-label="クラス" />
        </div>
        <div className="flex-grow flex flex-col">
          <p>出目数: {desc.dots[desc.id] || 1}</p>
          <input type="range" min={1} max={7} value={dot} onChange={(e) => setDot(Number(e.target.value))} aria-label="出目数" />
        </div>
      </section>
      <section className="description mt-2">
        {desc.children}
      </section>
    </>
  );
});

const LevelUp = memo(function LevelUp({ level }:{ level: number })  {
  return (
    <div className="relative w-[128px] select-none">
      <Image src={LevelUpImage} alt="" className={`absolute top-0 left-0 z-0${level >= 1 ? "":" hidden"}`} width={128} loader={({ src }) => src} unoptimized />
      <Image src={LevelUpImage_0} alt="" className={`absolute top-0 left-0 z-0${level >=1 ? " hidden":""}`} width={128} loader={({ src }) => src} unoptimized />
      <span className={`absolute top-1/2 left-1/2 z-20 text-orange-500 ${exo2.className} text-[2.75rem] ${level >= 1 ? "":"hidden"} -translate-x-[49%] translate-y-[60%] font-bold`}>{level}</span>
    </div>
  )
});

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
  const [level, setLevel] = useState<number>(0);
  return (
    <>
      <Head>
        <title>火力・バフ計算機｜RandomDiceGo攻略</title>
      </Head>
      <Ogp
        url="https://rdg.suzuneu.com/calculator"
        type="article"
        title="火力・バフ計算機"
        description="RandomDiceGoにおけるバフ隣接時の火力などを解説します。"
      />
      <Header />
      <main className="mx-4 pc:mx-12">
        <Headline id="all-dices">火力・バフ計算機</Headline>
        <p>2023/04/15 (バージョン1.1.4) 時点の Random Dice GO のダイスの詳細DPSを計算します。</p>
        <p>Special Thanks: <a href="http://aureliano.ml/randomdice/damagecalc.html" className="link">http://aureliano.ml/randomdice/damagecalc.html</a></p>
        <Headline id="toc-headline">目次</Headline>
        <aside className="toc" />
        <Headline id="dps">DPS計算結果</Headline>
        <div className="sticky top-0 h-12 bg-white dark:bg-black rounded-b-2xl flex items-center">
        </div>
        <Headline id="dices-headline">火力ダイス</Headline>
        <div className="body">
          <LevelUp level={level} />
          <input type="range" min={0} max={99} value={level} onChange={(e) => setLevel(e.target.value as any)}  className="mt-48"/>
        </div>
      </main>
    </>
  );
}
