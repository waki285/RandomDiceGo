import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect, useState, memo, Fragment } from "react";

import Fire from "@/../public/dices/fire.png";
import Wind from "@/../public/dices/wind.png";

type DiceInfo = {
  id: string,
  name: string,
  rarity: "ノーマル" | "レア" | "英雄" | "伝説" | "四神",
  image: any,
  atk: number,
  attackSpeed: number,
  range: number,
  hp: number,
  customProperties?: Record<string, number>,
  incrementWhenClassUp: Record<string, number>,
  incrementWhenDotUp: Record<string, number>,
  children: React.ReactNode,
  diceColor: string,
  diceClasses: Record<string, number>,
  dots: Record<string, number>,
  setDiceClasses: any,
  setDots: any,
}
const minimumClass = {
  "ノーマル": 1,
  "レア": 3,
  "英雄": 5,
  "伝説": 7,
  "四神": 7,
} as const;

const incrementalCalculate = (initialValue: number, incrementWhenClassUp: number, incrementWhenDotUp: number, initialDiceClass: number, diceClass: number, dot: number) => {
  return initialValue + (incrementWhenClassUp * (diceClass - initialDiceClass)) + (incrementWhenDotUp * (dot - 1));
}

const IC = (desc: DiceInfo, key: string) => {
  return incrementalCalculate(key in desc ? desc[key as keyof DiceInfo]:desc.customProperties![key], desc.incrementWhenClassUp[key] || 0, desc.incrementWhenDotUp[key] || 0, minimumClass[desc.rarity], desc.diceClasses[desc.id] || minimumClass[desc.rarity], desc.dots[desc.id] || 1);
}


const DiceDesc = memo(function DiceDesc(desc: DiceInfo) {
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
      <Headline id={`dice-${desc.id}`} renderAs="h4" fontSize={1.125} borderColor={desc.diceColor}>{desc.name}</Headline>
      <section className="image">
        <Image src={desc.image} alt="" className="my-4" width={128} />
      </section>
      <section className="info">
        <dl>
          <dt>レアリティ</dt>
          <dd>{desc.rarity}</dd>
          <dt>攻撃力</dt>
          <dd>{IC(desc, "atk")}</dd>
          <dt>攻撃速度</dt>
          <dd>{IC(desc, "attackSpeed")}s</dd>
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
      <section className="increment flex mt-4 gap-12">
        <div className="flex-grow flex flex-col">
          <p>クラス: {desc.diceClasses[desc.id] || minClass}</p>
          <input type="range" min={minClass} max={15} value={diceClass} onChange={(e) => setDiceClass(Number(e.target.value))} />
          <div className="when-classup mt-2">
            {desc.incrementWhenClassUp.atk ? <p>攻撃力 +{desc.incrementWhenClassUp.atk}</p> : ""}
            {desc.incrementWhenClassUp.attackSpeed ? <p>攻撃速度 +{desc.incrementWhenClassUp.attackSpeed}s</p> : ""}
            {desc.incrementWhenClassUp.hp ? <p>HP +{desc.incrementWhenClassUp.hp}</p> : ""}
            {/* Custom properties */}
            {Object.entries(desc.incrementWhenClassUp).filter(([key]) => !["atk", "attackSpeed", "hp"].includes(key)).map(([key, value]) => (
              <p key={key}>{key} +{value}</p>
            ))}
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <p>出目数: {desc.dots[desc.id] || 1}</p>
          <input type="range" min={1} max={7} value={dot} onChange={(e) => setDot(Number(e.target.value))} />
          <div className="when-dotup mt-2">
            {desc.incrementWhenDotUp.atk ? <p>攻撃力 +{desc.incrementWhenDotUp.atk}</p> : ""}
            {desc.incrementWhenDotUp.attackSpeed ? <p>攻撃速度 +{desc.incrementWhenDotUp.attackSpeed}s</p> : ""}
            {desc.incrementWhenDotUp.hp ? <p>HP +{desc.incrementWhenDotUp.hp}</p> : ""}
            {/* Custom properties */}
            {Object.entries(desc.incrementWhenDotUp).filter(([key]) => !["atk", "attackSpeed", "hp"].includes(key)).map(([key, value]) => (
              <p key={key}>{key} +{value}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="description">
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
      <Header />
      <main className="mx-12">
        <Headline id="all-dices">全ダイス解説</Headline>
        <p>2023/04/15 (バージョン1.1.4) 時点の Random Dice GO の全ダイスを説明します。</p>
        <p>Special Thanks: <a href="http://aureliano.ml/randomdice/alldices.html" className="link">http://aureliano.ml/randomdice/alldices.html</a></p>
        <Headline id="toc-headline">目次</Headline>
        <aside className="toc" />
        <Headline id="dices-headline">ダイス</Headline>
        <div className="body">
          <Headline id="dices-normal" renderAs="h3" fontSize={1.25} borderColor="blue">ノーマル</Headline>
          <DiceDesc
            id="fire"
            name="火のダイス"
            rarity="ノーマル"
            image={Fire}
            atk={100}
            attackSpeed={0.7}
            range={2}
            hp={900}
            diceColor="red"
            customProperties={{ "スプラッシュダメージ": 40 }}
            incrementWhenClassUp={{ atk: 5, hp: 45, "スプラッシュダメージ": 2 }}
            incrementWhenDotUp={{ atk: 70, hp: 630, attackSpeed: 0.14, "スプラッシュダメージ": 20 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃するとき、攻撃した敵の周囲8方向にいるすべての敵に<span className="variable">{incrementalCalculate(40, 2, 20, 1, diceClasses.fire || 1, diceDots.fire || 1)}</span>の追加ダメージを与える。</p>
            <p className="mt-4">素の火力が高く、後述する盾のダイスに挑発されても周囲8マスに別のダイスがあればそちらにも攻撃を与えられる点が強いダイスです。</p>
          </DiceDesc>
          <DiceDesc
            id="wind"
            name="風のダイス"
            rarity="ノーマル"
            image={Wind}
            atk={50}
            attackSpeed={1.5}
            range={3}
            hp={600}
            diceColor="palegreen"
            incrementWhenClassUp={{ atk: 2.5, hp: 30 }}
            incrementWhenDotUp={{ atk: 35, hp: 420, attackSpeed: 0.3 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃するとき、攻撃した敵の周囲8方向にいるすべての敵に<span className="variable">{incrementalCalculate(40, 2, 20, 1, diceClasses.fire || 1, diceDots.fire || 1)}</span>の追加ダメージを与える。</p>
            <p className="mt-4">素の火力が高く、後述する盾のダイスに挑発されても周囲8マスに別のダイスがあればそちらにも攻撃を与えられる点が強いダイスです。</p>
          </DiceDesc>
        </div>
      </main>
    </>
  );
}
