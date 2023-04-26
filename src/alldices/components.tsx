import Big from "big.js";
import { memo, Fragment } from "react";
import Headline from "@/components/Headline";
import Image from "next/image";
import Link from "next/link";

import DotRound from "@/../public/images/dot_round.webp";
import DotStar from "@/../public/images/dot_star.webp";

export type DiceInfo = {
  id: string,
  name: string,
  rarity: "ノーマル" | "レア" | "英雄" | "伝説" | "四神" | "妖怪",
  image?: any,
  addImages?: readonly any[],
  atk: number,
  attackSpeed: number,
  range: number,
  hp: number,
  customProperties?: Record<string, number>,
  incrementWhenClassUp: Record<string, number>,
  incrementWhenDotUp: Record<string, number>,
  children: React.ReactNode,
  diceColor: string,
  diceColorGradient?: string,
  diceClasses: Record<string, number>,
  dots: Record<string, number>,
  setDiceClasses: any,
  setDots: any,
}
export type CArgsType = {
  diceClasses: Record<string, number>,
  setDiceClasses: (...args: any) => void
  diceDots: Record<string, number>,
  setDiceDots: (...args: any) => void
}
export const minimumClass = {
  "ノーマル": 1,
  "レア": 3,
  "英雄": 5,
  "伝説": 7,
  "四神": 7,
  "妖怪": 7
} as const;

export const incrementalCalculate = (initialValue: number, incrementWhenClassUp: number, incrementWhenDotUp: number, initialDiceClass: number, diceClass: number, dot: number) => {
  const iV = new Big(initialValue);
  const iWC = new Big(incrementWhenClassUp);
  const iWD = new Big(incrementWhenDotUp);
  const iDC = new Big(initialDiceClass);
  const dC = new Big(diceClass);
  const d = new Big(dot);
  return iV.plus(iWC.mul(dC.minus(iDC))).plus(iWD.mul(d.minus(1))).toNumber();
  // return initialValue + (incrementWhenClassUp * (diceClass - initialDiceClass)) + (incrementWhenDotUp * (dot - 1));
}

export const IC = (desc: DiceInfo, key: string) => {
  return incrementalCalculate(key in desc ? desc[key as keyof DiceInfo]:desc.customProperties![key], desc.incrementWhenClassUp[key] || 0, desc.incrementWhenDotUp[key] || 0, minimumClass[desc.rarity], desc.diceClasses[desc.id] || minimumClass[desc.rarity], desc.dots[desc.id] || 1);
}


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
        {desc.image ? <Image src={desc.image} alt="" className="" width={128} loader={({ src }) => src} unoptimized />:""}
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

export const BuffNote = memo(function BuffNote() {
  return (
    <>
      <p className="mt-4">ランダムダイスGOのバフは、本家とは違い<span className="font-bold">重複します</span>。</p>
      <p>例えば、16%のバフと16%のバフが重なったダイスがあった場合、そのダイスは32%のバフを獲得します。</p>
    </>
  )
});
export const CalcNote = memo(function CalcNote({ content }: { content: string }) {
  return (
    <><p className="mb-4">※{ content }はこちらに記載していません。知りたい場合は<Link href="/calculator" className="link">火力・バフ計算機</Link>が便利です。</p></>
  )
});
const OneDot = memo(function OneDot({ hue, saturate, brightness }: { hue?: number, saturate?: number, brightness?: number }) {
  return (
    <Image
      src={DotRound}
      alt=""
      loader={({ src }) => src}
      unoptimized
      style={{
        filter: `hue-rotate(${hue || 0}deg) saturate(${saturate || 100}%) brightness(${brightness || 100}%)`
      }}
    />
  )
});
export const Dot = memo(function Dot({ dot, hue, saturate, brightness }: { dot: number, hue?: number, saturate?: number, brightness?: number }) {
  return (
    <div className={`fit grid ${dot === 4 || dot === 6 ? "grid-cols-2":"grid-cols-3"} ${dot === 4 ? "grid-rows-2":"grid-rows-3"} gap-1 w-[80px] h-[80px]`}>
      {/* 出目4, 5, 6 */}
      {Math.sign(dot - 3) === 1 && dot !== 7 ? <div className={`col-start-1`}><OneDot {...{ hue, saturate, brightness }} /></div>:""}
      {/* 出目4, 6 */}
      {dot === 4 || dot === 6 ? <div className={`col-start-2`}><OneDot {...{ hue, saturate, brightness }} /></div>:""}
      {/* 出目2, 3, 5 */}
      {dot === 2 || dot === 3 || dot === 5 ? <div className={`col-start-3`}><OneDot {...{ hue, saturate, brightness }} /></div>:""}
      {/* 出目4, 6 */}
      {dot === 4 || dot === 6 ? <div className={`col-start-1`}><OneDot {...{ hue, saturate, brightness }} /></div>:""}
      {/* 出目1, 3, 4, 5, 6 */}
      {dot !== 2 && dot !== 7 ? <div className={`row-start-2 col-start-2`}><OneDot {...{ hue, saturate, brightness }} /></div>:""}
    </div>
  )
});