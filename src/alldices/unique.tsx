import {
  incrementalCalculate,
  DiceDesc,
  CArgsType,
  BuffNote,
} from "./components";

import Barrier from "@/../public/dices/barrier.webp";
import Death from "@/../public/dices/death.webp";
import Teleport from "@/../public/dices/teleport.webp";
import Meteor from "@/../public/dices/meteor.webp";
import Lock from "@/../public/dices/lock.webp";
import Resurrection from "@/../public/dices/resurrection.webp";
import ModifiedElectric from "@/../public/dices/modifiedelectric.webp";
import Fury from "@/../public/dices/fury.webp";
import Vampire from "@/../public/dices/vampire.webp";

export default function UniqueDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
}: CArgsType) {
  return (
    <>
      <DiceDesc
        id="barrier"
        name="バリアのダイス"
        rarity="英雄"
        image={Barrier}
        atk={70}
        attackSpeed={0.8}
        range={1}
        hp={1100}
        diceColor="midnightblue"
        customProperties={{ 獲得保護シールド: 300 }}
        incrementWhenClassUp={{ atk: 3.5, hp: 55, 獲得保護シールド: 15 }}
        incrementWhenDotUp={{
          atk: 49,
          hp: 770,
          attackSpeed: 0.16,
          獲得保護シールド: 150,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向にいる全ての味方に
          <span className="variable">
            {incrementalCalculate(
              300,
              15,
              150,
              5,
              diceClasses.barrier || 5,
              diceDots.barrier || 1
            )}
            HP
          </span>
          分の追加ダメージを与える。
        </p>
        <p className="mt-4">味方にバリアを与えるダイスです。</p>
        <p>
          無敵と違い、最初から発動するため、HPが少ない善悪のダイスを守ることが多いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="death"
        name="死のダイス"
        rarity="英雄"
        image={Death}
        atk={100}
        attackSpeed={0.7}
        range={2}
        hp={900}
        diceColor="black"
        customProperties={{ "即死率(%)": 2 }}
        incrementWhenClassUp={{ atk: 5, hp: 45, "即死率(%)": 0.1 }}
        incrementWhenDotUp={{
          atk: 70,
          hp: 630,
          attackSpeed: 0.14,
          即死率: 0.2,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃するとき、
          <span className="variable">
            {incrementalCalculate(
              2,
              0.1,
              0.2,
              5,
              diceClasses.death || 5,
              diceDots.death || 1
            )}
            %
          </span>
          の確率で即死させる。
        </p>
        <p className="mt-4">
          攻撃速度が低いため試行を稼げないうえに、即死確率が低いため弱いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="teleport"
        name="テレポートのダイス"
        rarity="英雄"
        image={Teleport}
        atk={80}
        attackSpeed={1}
        range={3}
        hp={900}
        diceColor="magenta"
        customProperties={{ "発動HP(%)": 50 }}
        incrementWhenClassUp={{ atk: 4, hp: 45 }}
        incrementWhenDotUp={{ atk: 56, hp: 630, attackSpeed: 0.2 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          自分のHPが<span className="variable">50%</span>
          以下になると、ランダムな位置に瞬間移動する。
        </p>
        <p className="mt-4">
          同じ位置にとどまっていたほうが、テレポートするより多くの敵を倒せると感じます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="meteor"
        name="隕石のダイス"
        rarity="英雄"
        image={Meteor}
        atk={60}
        attackSpeed={1.2}
        range={2}
        hp={1100}
        diceColor="mediumpurple"
        customProperties={{ 攻撃回数: 7, 隕石ダメージ: 350 }}
        incrementWhenClassUp={{ atk: 3, hp: 55, 隕石ダメージ: 17.5 }}
        incrementWhenDotUp={{
          atk: 42,
          hp: 770,
          attackSpeed: 0.24,
          隕石ダメージ: 175,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を<span className="variable">7回</span>
          攻撃すると、ランダムな敵に隕石を落とす。
        </p>
        <p className="mt-4">
          盾を攻撃していても、他の敵のダイスに攻撃を与えられる可能性があるので、強いです。
        </p>
        <p>
          また、HPが高く、攻撃速度もある程度あるため殴り合いでも有利を取れます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="lock"
        name="ロックのダイス"
        rarity="英雄"
        image={Lock}
        atk={70}
        attackSpeed={0.8}
        range={1}
        hp={1100}
        diceColor="darkgray"
        customProperties={{ "持続時間(s)": 3 }}
        incrementWhenClassUp={{ atk: 3.5, hp: 55, "持続時間(s)": 0.15 }}
        incrementWhenDotUp={{
          atk: 49,
          hp: 770,
          attackSpeed: 0.16,
          "持続時間(s)": 0.5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向にいる一番近い敵1体をロックし、
          <span className="variable">
            {incrementalCalculate(
              3,
              0.15,
              0.5,
              5,
              diceClasses.lock || 5,
              diceDots.lock || 1
            )}
            秒間
          </span>
          基本攻撃ができない状態にする。
        </p>
        <p className="font-medium">
          ロックが解除されると基本攻撃ができるようになる。
        </p>
        <p className="mt-4">攻撃を3秒間停止できるダイスです。</p>
        <p>
          ここにおいての「最も近い」とは、周囲8方向にある敵のダイスのうちの1つ(おそらくランダム)であり、2つのロックのダイスが同じ敵のダイスをロックすることもあります。
        </p>
        <p>
          この場合、ロックの時間が延長されるわけでもないので、目的のダイスをロックできるかどうかが運です。
        </p>
        <p>また、ロックのダイスが倒されるとロックは解除されます。</p>
      </DiceDesc>
      <DiceDesc
        id="resurrection"
        name="復活のダイス"
        rarity="英雄"
        image={Resurrection}
        atk={40}
        attackSpeed={0.8}
        range={1}
        hp={900}
        diceColor="yellow"
        customProperties={{ "復活時のHP(%)": 25 }}
        incrementWhenClassUp={{ atk: 2, hp: 45, "復活時のHP(%)": 1.25 }}
        incrementWhenDotUp={{
          atk: 28,
          hp: 630,
          attackSpeed: 0.16,
          "復活時のHP(%)": 7,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          自分が死ぬ時、周囲8方向にいる死んだ味方の中から1体を
          <span className="variable">
            {incrementalCalculate(
              25,
              1.25,
              7,
              5,
              diceClasses.resurrection || 5,
              diceDots.resurrection || 1
            )}
            %
          </span>
          のHP状態に復活させる。
        </p>
        <p className="font-medium">復活のダイスを復活させることはできない。</p>
        <p className="mt-4">
          すでに死んだ味方を復活させることができるダイスです。
        </p>
        <p>
          後述する自爆のダイスと組み合わせて、何回も自爆させたり、主火力と隣接させて死んでもチャンスを掴むデッキなどがあります。
        </p>
        <p>
          注意として、先に復活のダイスが死んでしまうと復活させることができません。{" "}
        </p>
      </DiceDesc>
      <DiceDesc
        id="modifiedelectric"
        name="改造された電気のダイス"
        rarity="英雄"
        image={ModifiedElectric}
        atk={30}
        attackSpeed={0.8}
        range={2}
        hp={900}
        diceColor="red"
        customProperties={{ "ダメージ増加(%)": 10 }}
        incrementWhenClassUp={{ atk: 1.5, hp: 45, "ダメージ増加(%)": 0.5 }}
        incrementWhenDotUp={{
          atk: 21,
          hp: 630,
          attackSpeed: 0.16,
          "ダメージ増加(%)": 1,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、攻撃した敵の周囲8方向に敵がいる場合、ランダムな敵1体に攻撃が弾き、
          <span className="variable">
            {incrementalCalculate(
              10,
              0.5,
              1,
              5,
              diceClasses.modifiedelectric || 5,
              diceDots.modifiedelectric || 1
            )}
            %
          </span>
          増加したダメージを与える。
        </p>
        <p className="font-medium">
          このスキルは、周囲8方向にいる敵がいなくなるまで繰り返す。
        </p>
        <p className="mt-4">
          敵のダイスが繋がっていれば連鎖してダメージが上がるダイスです。
        </p>
        <p>
          かつてはパラメーターがかなり高くとても強かったのですが、今はかなりDPSが低くなってしまい盾を倒すことが困難になってしまいました。
        </p>
        <p>そのため、今はあまり使われていません。</p>
      </DiceDesc>
      <DiceDesc
        id="fury"
        name="バーサーカーのダイス"
        rarity="英雄"
        image={Fury}
        atk={80}
        attackSpeed={0.9}
        range={2}
        hp={1350}
        diceColor="orchid"
        customProperties={{ "発動HP(%)": 25, "攻撃力増加(%)": 120 }}
        incrementWhenClassUp={{
          atk: 4,
          hp: 67.5,
          "発動HP(%)": 1,
          "攻撃力増加(%)": 5,
        }}
        incrementWhenDotUp={{
          atk: 56,
          hp: 945,
          attackSpeed: 0.18,
          "発動HP(%)": 2.5,
          "攻撃力増加(%)": 10,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          HPが
          <span className="variable">
            {incrementalCalculate(
              25,
              1,
              2.5,
              5,
              diceClasses.fury || 5,
              diceDots.fury || 1
            )}
            %
          </span>
          以下になると、攻撃力が
          <span className="variable">
            {incrementalCalculate(
              120,
              5,
              10,
              5,
              diceClasses.fury || 5,
              diceDots.fury || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="mt-4">HPが減るとダメージが2倍以上になるダイスです。</p>
        <p>そのDPSの高さと暴走状態のステータスからかなりよく使われています。</p>
        <p>
          無敵のダイスや復活のダイスと組み合わせて暴走状態の攻撃を多く浴びせるデッキが多いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="vampire"
        name="ヴァンパイアのダイス"
        rarity="英雄"
        image={Vampire}
        atk={110}
        attackSpeed={1}
        range={1}
        hp={1000}
        diceColor="firebrick"
        customProperties={{ "吸血(%)": 15 }}
        incrementWhenClassUp={{ atk: 5.5, hp: 50, "吸血(%)": 0.75 }}
        incrementWhenDotUp={{
          atk: 77,
          hp: 700,
          attackSpeed: 0.2,
          "吸血(%)": 1.5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向にいる全ての味方に、敵に与えたダメージ量の
          <span className="variable">
            {incrementalCalculate(
              15,
              0.75,
              1.5,
              5,
              diceClasses.vampire || 5,
              diceDots.vampire || 1
            )}
            %
          </span>
          分のHPを回復する吸血スキルを与える。
        </p>
        <p className="mt-4">
          味方のダイスにヘルスドレイン効果を与えるダイスです。
        </p>
        <p>
          高DPSで高射程のダイスと組み合わせることで、強固な塔を作ることができます。
        </p>
      </DiceDesc>
    </>
  );
}
