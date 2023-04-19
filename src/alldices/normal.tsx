import { incrementalCalculate, DiceDesc, CArgsType } from "./components";

import Fire from "@/../public/dices/fire.webp";
import Wind from "@/../public/dices/wind.webp";
import Water from "@/../public/dices/water.webp";
import Sword from "@/../public/dices/sword.webp";
import Shield from "@/../public/dices/shield.webp";
import Electric from "@/../public/dices/electric.webp";
import Iron from "@/../public/dices/iron.webp";

export default function NormalDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
}: CArgsType) {
  return (
    <>
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
        customProperties={{ スプラッシュダメージ: 40 }}
        incrementWhenClassUp={{ atk: 5, hp: 45, スプラッシュダメージ: 2 }}
        incrementWhenDotUp={{
          atk: 70,
          hp: 630,
          attackSpeed: 0.14,
          スプラッシュダメージ: 20,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃するとき、攻撃した敵の周囲8方向にいるすべての敵に
          <span className="variable">
            {incrementalCalculate(
              40,
              2,
              20,
              1,
              diceClasses.fire || 1,
              diceDots.fire || 1
            )}
          </span>
          の追加ダメージを与える。
        </p>
        <p className="mt-4">
          素の火力が高く、後述する盾のダイスに挑発されても周囲8マスに別のダイスがあればそちらにも攻撃を与えられる点が強いダイスです。
        </p>
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
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">広範囲にわたって敵を素早く攻撃する。</p>
        <p className="mt-4">
          このゲームにおいて射程が長いことは常に強いのですが、これよりも射程が長い狙撃のダイスや、これより高DPSが出せる強風のダイスがいるためにあまり使われません。
        </p>
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
        incrementWhenDotUp={{
          atk: 63,
          hp: 560,
          attackSpeed: 0.16,
          "攻撃速度減少(%)": 1.2,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、敵の攻撃速度を<span className="variable">3秒間</span>
          、
          <span className="variable">
            {incrementalCalculate(
              12,
              0.6,
              1.2,
              1,
              diceClasses.water || 1,
              diceDots.water || 1
            )}
            %
          </span>
          減少させる。最大<span className="variable">3回まで</span>蓄積する。
        </p>
        <p className="mt-4">
          基本光や月のほうが効果が上回るかつ、盾に挑発されると攻撃速度減少が無に帰すので弱いです。
        </p>
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
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          攻撃範囲は狭いが、高い攻撃力で敵を攻撃する。
        </p>
        <p className="mt-4">
          射程がかなり狭い代わりに、その範囲内の敵に関してはかなりのDPSを発揮します。
        </p>
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
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向を2倍に拡張した範囲にいる全ての敵を挑発する。
        </p>
        <p className="mt-4">
          敵のダイスがある近くに置くだけで、お手軽に敵の攻撃先をそらし、その間に自分の強いダイスで攻撃することができます。
        </p>
        <p className="mt-4">
          盾のダイスは、本作における<span className="font-bold">最強</span>
          のダイスです。
        </p>
        <p>
          かなりHPが高く、かつ生き残れば生存ダイス数を増やせるので、無敵のダイスなどと組み合わせることがよくあります。
        </p>
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
        customProperties={{ 連鎖ダメージ: 50 }}
        incrementWhenClassUp={{ atk: 3.5, hp: 40, 連鎖ダメージ: 2.5 }}
        incrementWhenDotUp={{
          atk: 49,
          hp: 560,
          attackSpeed: 0.24,
          連鎖ダメージ: 25,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、攻撃した敵の周囲8方向にいるランダムな敵1体に
          <span className="variable">
            {incrementalCalculate(
              50,
              2.5,
              25,
              1,
              diceClasses.electric || 1,
              diceDots.electric || 1
            )}
          </span>
          の追加ダメージを与える。
        </p>
        <p className="mt-4">
          敵のダイスを攻撃したときに、攻撃を一回弾くことができるダイスです。
        </p>
        <p>
          火より密集していない場合に強いです。また、何回でも連鎖できる改造された電気のダイスと比べて素の攻撃力が高いこともメリットです。
        </p>
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
        incrementWhenDotUp={{
          atk: 70,
          hp: 700,
          attackSpeed: 0.1,
          "現在HP基盤ダメージ(%)": 1,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、攻撃した敵の現在HP
          <span className="variable">
            {incrementalCalculate(
              10,
              0.5,
              1,
              1,
              diceClasses.iron || 1,
              diceDots.iron || 1
            )}
            %
          </span>
          分の追加ダメージを与える。
        </p>
        <p className="mt-4">
          敵に現在HP分の割合ダメージを与えることができるダイスです。
        </p>
        <p>
          盾のダイスを攻撃する場合に剣のダイスより高いDPSを出すことができます。
        </p>
      </DiceDesc>
    </>
  );
}
