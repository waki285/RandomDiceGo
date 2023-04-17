import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect, useState, memo, Fragment } from "react";
import Big from "big.js";
import Ogp from "@/components/Ogp";

// 画像素材
// ノーマル
import Fire from "@/../public/dices/fire.webp";
import Wind from "@/../public/dices/wind.webp";
import Water from "@/../public/dices/water.webp";
import Sword from "@/../public/dices/sword.webp";
import Shield from "@/../public/dices/shield.webp";
import Electric from "@/../public/dices/electric.webp";
import Iron from "@/../public/dices/iron.webp";
// レア
import Light from "@/../public/dices/light.webp";
import Sniper from "@/../public/dices/sniper.webp";
import Heal from "@/../public/dices/heal.webp";
import Gale from "@/../public/dices/gale.webp";
import GaleTransform from "@/../public/dices/gale_transform.webp";
import Invincible from "@/../public/dices/invincible.webp";
import Spear from "@/../public/dices/spear.webp";

type DiceInfo = {
  id: string,
  name: string,
  rarity: "ノーマル" | "レア" | "英雄" | "伝説" | "四神",
  image: any,
  image2?: any,
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
  const iV = new Big(initialValue);
  const iWC = new Big(incrementWhenClassUp);
  const iWD = new Big(incrementWhenDotUp);
  const iDC = new Big(initialDiceClass);
  const dC = new Big(diceClass);
  const d = new Big(dot);
  return iV.plus(iWC.mul(dC.minus(iDC))).plus(iWD.mul(d.minus(1))).toNumber();
  // return initialValue + (incrementWhenClassUp * (diceClass - initialDiceClass)) + (incrementWhenDotUp * (dot - 1));
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
      <section className="image flex gap-8">
        <Image src={desc.image} alt="" className="my-4" width={128} loader={({ src }) => src} unoptimized />
        {desc.image2 ? <Image src={desc.image2} alt="" className="my-4" width={128} loader={({ src }) => src} unoptimized />:""}
      </section>
      <section className="info">
        <dl>
          <dt>レアリティ</dt>
          <dd>{desc.rarity}</dd>
          <dt>攻撃力</dt>
          <dd>{IC(desc, "atk")}</dd>
          <dt>攻撃速度</dt>
          <dd>{IC(desc, "attackSpeed")} (本家式: {new Big(1).div(new Big(IC(desc, "attackSpeed"))).round(2).toNumber()}s)</dd>
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

const BuffNote = memo(function BuffNote() {
  return (
    <>
      <p className="mt-4">ランダムダイスGOのバフは、本家とは違い<span className="font-bold">重複します</span>。</p>
      <p>例えば、16%のバフと16%のバフが重なったダイスがあった場合、そのダイスは32%のバフを獲得します。</p>
    </>
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
        <p>2023/04/15 (バージョン1.1.4) 時点の Random Dice GO の全ダイスを説明します。製作途中なので温かい目で見守ってくれれば幸いです。</p>
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
            <p className="font-medium">広範囲にわたって敵を素早く攻撃する。</p>
            <p className="mt-4">このゲームにおいて射程が長いことは常に強いのですが、これよりも射程が長い狙撃のダイスや、これより高DPSが出せる強風のダイスがいるためにあまり使われません。</p>
          </DiceDesc>
          <DiceDesc
            id="water"
            name="水のダイス"
            rarity="ノーマル"
            image={Water}
            atk={90}
            attackSpeed={0.8}
            range={2}
            hp={800}
            diceColor="aqua"
            customProperties={{ "攻撃速度減少(%)": 12 }}
            incrementWhenClassUp={{ atk: 4.5, hp: 40, "攻撃速度減少(%)": 0.6 }}
            incrementWhenDotUp={{ atk: 63, hp: 560, attackSpeed: 0.16, "攻撃速度減少(%)": 1.2 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃する時、敵の攻撃速度を<span className="variable">3秒間</span>、<span className="variable">{incrementalCalculate(12, 0.6, 1.2, 1, diceClasses.water || 1, diceDots.water || 1)}%</span>減少させる。最大<span className="variable">3回まで</span>蓄積する。</p>
            <p className="mt-4">基本光や月のほうが効果が上回るかつ、盾に挑発されると攻撃速度減少が無に帰すので弱いです。</p>
            <p>素のDPSは結構あります。</p>
          </DiceDesc>
          <DiceDesc
            id="sword"
            name="剣のダイス"
            rarity="ノーマル"
            image={Sword}
            atk={180}
            attackSpeed={0.7}
            range={1}
            hp={1000}
            diceColor="silver"
            incrementWhenClassUp={{ atk: 9, hp: 50 }}
            incrementWhenDotUp={{ atk: 126, hp: 700, attackSpeed: 0.14 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">攻撃範囲は狭いが、高い攻撃力で敵を攻撃する。</p>
            <p className="mt-4">射程がかなり狭い代わりに、その範囲内の敵に関してはかなりのDPSを発揮します。</p>
            <p>また、2マス遠くにおいてある盾が効かないというのもメリットです。</p>
          </DiceDesc>
          <DiceDesc
            id="shield"
            name="盾のダイス"
            rarity="ノーマル"
            image={Shield}
            atk={180}
            attackSpeed={0.7}
            range={0}
            hp={1000}
            diceColor="goldenrod"
            incrementWhenClassUp={{ atk: 9, hp: 50 }}
            incrementWhenDotUp={{ atk: 126, hp: 700, attackSpeed: 0.14 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">周囲8方向を2倍に拡張した範囲にいる全ての敵を挑発する。</p>
            <p className="mt-4">敵のダイスがある近くに置くだけで、お手軽に敵の攻撃先をそらし、その間に自分の強いダイスで攻撃することができます。</p>
            <p className="mt-4">盾のダイスは、本作における<span className="font-bold">最強</span>のダイスです。</p>
            <p>かなりHPが高く、かつ生き残れば生存ダイス数を増やせるので、無敵のダイスなどと組み合わせることがよくあります。</p>
            <p></p>
          </DiceDesc>
          <DiceDesc
            id="electric"
            name="電気のダイス"
            rarity="ノーマル"
            image={Electric}
            atk={70}
            attackSpeed={1.2}
            range={2}
            hp={800}
            diceColor="orange"
            customProperties={{ "連鎖ダメージ": 50 }}
            incrementWhenClassUp={{ atk: 2.5, hp: 40, "連鎖ダメージ": 2.5 }}
            incrementWhenDotUp={{ atk: 49, hp: 560, attackSpeed: 0.24, "連鎖ダメージ": 25 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃する時、攻撃した敵の周囲8方向にいるランダムな敵1体に<span className="variable">{incrementalCalculate(50, 2.5, 25, 1, diceClasses.electric || 1, diceDots.electric || 1)}</span>の追加ダメージを与える。</p>
            <p className="mt-4">敵のダイスを攻撃したときに、攻撃を一回弾くことができるダイスです。</p>
            <p>火より密集していない場合に強いです。また、何回でも連鎖できる改造された電気のダイスと比べて素の攻撃力が高いこともメリットです。</p>
          </DiceDesc>
          <DiceDesc
            id="iron"
            name="鉄のダイス"
            rarity="ノーマル"
            image={Iron}
            atk={100}
            attackSpeed={0.5}
            range={2}
            hp={1000}
            diceColor="dimgray"
            customProperties={{ "現在HP基盤ダメージ(%)": 10 }}
            incrementWhenClassUp={{ atk: 5, hp: 50, "現在HP基盤ダメージ(%)": 0.5 }}
            incrementWhenDotUp={{ atk: 70, hp: 700, attackSpeed: 0.1, "現在HP基盤ダメージ(%)": 1 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃する時、攻撃した敵の現在HP<span className="variable">{incrementalCalculate(10, 0.5, 1, 1, diceClasses.iron || 1, diceDots.iron || 1)}%</span>分の追加ダメージを与える。</p>
            <p className="mt-4">敵に現在HP分の割合ダメージを与えることができるダイスです。</p>
            <p>盾のダイスを攻撃する場合に剣のダイスより高いDPSを出すことができます。</p>
          </DiceDesc>
          <Headline id="dices-rare" renderAs="h3" fontSize={1.25} borderColor="deepskyblue">レア</Headline>
          <DiceDesc
            id="light"
            name="光のダイス"
            rarity="レア"
            image={Light}
            atk={50}
            attackSpeed={0.8}
            range={1}
            hp={700}
            diceColor="yellow"
            customProperties={{ "攻撃速度増加(%)": 20 }}
            incrementWhenClassUp={{ atk: 2.5, hp: 35, "攻撃速度増加(%)": 0.5 }}
            incrementWhenDotUp={{ atk: 35, hp: 490, attackSpeed: 0.16, "攻撃速度増加(%)": 5 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">周囲8方向にいる全ての味方の攻撃速度を<span className="variable">{incrementalCalculate(20, 0.5, 5, 3, diceClasses.light || 3, diceDots.light || 3)}%</span>増加させる。</p>
            <p className="mt-4">攻撃速度を増加させるダイスです。</p>
            <BuffNote />
          </DiceDesc>
          <DiceDesc
            id="sniper"
            name="狙撃のダイス"
            rarity="レア"
            image={Sniper}
            atk={60}
            attackSpeed={0.5}
            range={4}
            hp={500}
            diceColor="maroon"
            customProperties={{ "距離ごとの追加ダメージ(%)": 30 }}
            incrementWhenClassUp={{ atk: 3, hp: 25, "距離ごとの追加ダメージ(%)": 1.5 }}
            incrementWhenDotUp={{ atk: 42, hp: 350, attackSpeed: 0.1, "距離ごとの追加ダメージ(%)": 3 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">攻撃する敵との距離が1マス遠くなるほど、与えるダメージ量が<span className="variable">{incrementalCalculate(30, 1.5, 3, 3, diceClasses.sniper || 3, diceDots.sniper || 3)}%</span>ずつ増加する。</p>
            <p className="mt-4">GO史上一番射程が長いダイスです。</p>
            <p>ボードの中央におけばどのダイスにも攻撃が届く上に、攻撃速度は遅いが敵のダイスとの距離が離れていれば攻撃力が高いのでかなり有用なダイスです。</p>
            <p>銃、砂(スナ)と呼ばれることもあります。</p>
          </DiceDesc>
          <DiceDesc
            id="heal"
            name="ヒーリングのダイス"
            rarity="レア"
            image={Heal}
            atk={60}
            attackSpeed={0.8}
            range={1}
            hp={900}
            diceColor="mediumspringgreen"
            customProperties={{ "発動時間(s)": 1, "HP回復": 50 }}
            incrementWhenClassUp={{ atk: 3, hp: 45, "HP回復": 2.5 }}
            incrementWhenDotUp={{ atk: 42, hp: 630, attackSpeed: 0.16, "HP回復": 10 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium"><span className="variable">1秒</span>ごとに周囲8方向にいる味方のHPを<span className="variable">{incrementalCalculate(50, 2.5, 10, 3, diceClasses.heal || 3, diceDots.heal || 3)}</span>回復させる。</p>
            <p className="mt-4">周囲の味方を高頻度で回復することができるダイスです。</p>
            <p>しかし、序盤は回復量が上回ることがありますが、後半になってくると攻撃された時点でもう回復しても意味がないような状況になってしまうことが多いです。</p>
          </DiceDesc>
          <DiceDesc
            id="gale"
            name="強風のダイス"
            rarity="レア"
            image={Gale}
            image2={GaleTransform}
            atk={60}
            attackSpeed={1.2}
            range={3}
            hp={600}
            diceColor="darkturquoise"
            customProperties={{ "発動時間(s)": 5, "攻撃速度増加(%)": 80 }}
            incrementWhenClassUp={{ atk: 3, hp: 30, "攻撃速度増加(%)": 4 }}
            incrementWhenDotUp={{ atk: 42, hp: 420, attackSpeed: 0.24, "攻撃速度増加(%)": 8 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">バトル開始<span className="variable">5秒後</span>に変身し、変身した場合、攻撃速度が<span className="variable">{incrementalCalculate(80, 4, 8, 3, diceClasses.gale || 3, diceDots.gale || 3)}%</span>増加する。</p>
            <p className="mt-4">5秒(以前は4秒だった)を耐えることで、攻撃速度を1.5倍以上にできるダイスです。</p>
            <p>盾のダイスを使用することで5秒は簡単に稼げるため、簡単に高DPSな攻撃を遠距離から与えることができます。</p>
          </DiceDesc>
          <DiceDesc
            id="invincible"
            name="無敵のダイス"
            rarity="レア"
            image={Invincible}
            atk={50}
            attackSpeed={0.8}
            range={1}
            hp={600}
            diceColor="darkgoldenrod"
            customProperties={{ "発動HP(%)": 20, "持続時間(s)": 0.5 }}
            incrementWhenClassUp={{ atk: 2.5, hp: 30, "持続時間(s)": 0.025 }}
            incrementWhenDotUp={{ atk: 35, hp: 420, attackSpeed: 0.16, "持続時間(s)": 0.1 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">周囲8方向の範囲内にいる味方のHPが<span className="variable">20%</span>以下になると、その味方に<span className="variable">{incrementalCalculate(0.5, 0.025, 0.1, 3, diceClasses.invincible || 3, diceDots.invincible || 3)}秒間</span>無敵状態になるバフを与える。</p>
            <p className="mt-4">味方が瀕死になると0.5秒(以前は1秒だった)以上の無敵バフを付与するダイスです。</p>
            <p>盾のダイスや倒されるとまずい火力ダイスと組み合わせて使われることが多いです。</p>
            <p>なお、無敵のダイスが倒されると無敵効果は付与されません。</p>
          </DiceDesc>
          <DiceDesc
            id="spear"
            name="槍のダイス"
            rarity="レア"
            image={Spear}
            atk={40}
            attackSpeed={1}
            range={1}
            hp={1000}
            diceColor="darkslateblue"
            customProperties={{ "追加ダメージ": 150 }}
            incrementWhenClassUp={{ atk: 2, hp: 50, "追加ダメージ": 7.5 }}
            incrementWhenDotUp={{ atk: 28, hp: 700, attackSpeed: 0.2, "追加ダメージ": 75 }}
            diceClasses={diceClasses} setDiceClasses={setDiceClasses}
            dots={diceDots} setDots={setDiceDots}
          >
            <p className="font-medium">敵を攻撃する時、攻撃した敵の1マス後ろの方向にいる敵に<span className="variable">{incrementalCalculate(150, 7.5, 75, 3, diceClasses.spear || 3, diceDots.spear || 3)}</span>の追加ダメージを与える。</p>
            <p className="mt-4">敵を攻撃するときに1マス貫通して攻撃を与えることができるダイスです。</p>
            <p>素の攻撃力が低いうえ、攻撃範囲が1のためかなり使いづらいダイスです。</p>
          </DiceDesc>
        </div>
      </main>
    </>
  );
}
