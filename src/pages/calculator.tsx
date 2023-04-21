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
        {desc.addImages ? desc.addImages.map((x, i) => {
          return (
            <Image src={x} alt="" className="" width={128} loader={({ src }) => src} unoptimized key={i} />
          )
        }):""}
      </section>
      <section className="info">
        <dl>
          <dt>レアリティ</dt>
          <dd>{desc.rarity}</dd>
          <dt>攻撃力</dt>
          <dd>{IC(desc, "atk")}</dd>
          <dt>攻撃速度</dt>
          <dd>{IC(desc, "attackSpeed")} (本家式: {new Big(1).div(new Big(IC(desc, "attackSpeed"))).round(2).toNumber()}s)</dd>
          <dt>DPS</dt>
          <dd>{new Big(IC(desc, "atk")).mul(new Big(IC(desc, "attackSpeed"))).toNumber()}</dd>
          <dt>攻撃範囲</dt>
          <dd>{desc.range}</dd>
          <dt>HP</dt>
          <dd>{IC(desc, "hp")}</dd>
          {Object.entries(desc.customProperties || {}).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{incrementalCalculate(value, desc.incrementWhenClassUp[key] || 0, desc.incrementWhenDotUp[key] || 0, minClass, diceClass, dot)}</dd>
            </Fragment>
          ))}
        </dl>
      </section>
      <section className="increment flex mt-4 gap-4 pc:gap-12 flex-col pc:flex-row">
        <div className="flex-grow flex flex-col">
          <p>クラス: {desc.diceClasses[desc.id] || minClass}</p>
          <input type="range" min={minClass} max={15} value={diceClass} onChange={(e) => setDiceClass(Number(e.target.value))} aria-label="クラス" />
          <div className="when-classup mt-2">
            {desc.incrementWhenClassUp.atk ? <p>攻撃力 +{desc.incrementWhenClassUp.atk}</p> : ""}
            {desc.incrementWhenClassUp.attackSpeed ? <p>攻撃速度 +{desc.incrementWhenClassUp.attackSpeed}</p> : ""}
            {desc.incrementWhenClassUp.hp ? <p>HP +{desc.incrementWhenClassUp.hp}</p> : ""}
            {/* Custom properties */}
            {Object.entries(desc.incrementWhenClassUp).filter(([key]) => !["atk", "attackSpeed", "hp"].includes(key)).map(([key, value]) => (
              <p key={key}>{key} +{value}</p>
            ))}
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <p>出目数: {desc.dots[desc.id] || 1}</p>
          <input type="range" min={1} max={7} value={dot} onChange={(e) => setDot(Number(e.target.value))} aria-label="出目数" />
          <div className="when-dotup mt-2">
            {desc.incrementWhenDotUp.atk ? <p>攻撃力 +{desc.incrementWhenDotUp.atk}</p> : ""}
            {desc.incrementWhenDotUp.attackSpeed ? <p>攻撃速度 +{desc.incrementWhenDotUp.attackSpeed}</p> : ""}
            {desc.incrementWhenDotUp.hp ? <p>HP +{desc.incrementWhenDotUp.hp}</p> : ""}
            {/* Custom properties */}
            {Object.entries(desc.incrementWhenDotUp).filter(([key]) => !["atk", "attackSpeed", "hp"].includes(key)).map(([key, value]) => (
              <p key={key}>{key} +{value}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="description mt-2">
        {desc.children}
      </section>
    </>
  );
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
          
        </div>
      </main>
    </>
  );
}
