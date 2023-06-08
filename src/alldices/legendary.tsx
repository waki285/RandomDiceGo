import {
  incrementalCalculate,
  DiceDesc,
  CArgsType,
  BuffNote,
  CalcNote,
} from "./components";

import Explode from "@/../public/dices/explode.webp";
import Time from "@/../public/dices/time.webp";
import Solar from "@/../public/dices/solar.webp";
import SolarInactive from "@/../public/dices/solar_inactive.webp";
import Lunar from "@/../public/dices/lunar.webp";
import LunarInactive from "@/../public/dices/lunar_inactive.webp";
import Judgement from "@/../public/dices/judgement.webp";
import Goodevil from "@/../public/dices/goodevil.webp";
import GoodevilEvil from "@/../public/dices/goodevil_evil.webp";
import GoodevilGood from "@/../public/dices/goodevil_good.webp";
import Hell from "@/../public/dices/hell.webp";
import Levelup from "@/../public/dices/levelup.webp";
import LevelupGt0 from "@/../public/dices/levelup_gt0.webp";
import Holybow from "@/../public/dices/holybow.webp";
import HolybowDivine from "@/../public/dices/holybow_divine.webp";
import Holysword from "@/../public/dices/holysword.webp";
import HolyswordDivine from "@/../public/dices/holysword_divine.webp";
import Soulcollector from "@/../public/dices/soulcollector.webp";
import Recall from "@/../public/dices/recall.webp";
import Prediction from "@/../public/dices/prediction.webp";

export default function LegendaryDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
}: CArgsType) {
  return (
    <>
      <DiceDesc
        id="explode"
        name="自爆のダイス"
        rarity="伝説"
        image={Explode}
        atk={50}
        attackSpeed={0.4}
        range={1}
        hp={700}
        diceColor="red"
        customProperties={{ 範囲ダメージ: 600 }}
        incrementWhenClassUp={{
          atk: 5,
          hp: 70,
          attackSpeed: 0.04,
          範囲ダメージ: 70,
        }}
        incrementWhenDotUp={{
          atk: 35,
          hp: 490,
          attackSpeed: 0.08,
          範囲ダメージ: 300,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          自分が死んだ時、周囲8方向にいる全ての味方に
          <span className="variable">
            {incrementalCalculate(
              600,
              70,
              300,
              7,
              diceClasses.explode || 7,
              diceDots.explode || 1
            )}
          </span>
          ダメージを与える。
        </p>
        <p className="mt-4">
          死んだときに周囲の敵に大ダメージを与えるダイスです。
        </p>
        <p>
          火力は高いがHPが低い善悪のダイスに対してかなりの有利を取ることができます。
        </p>
        <p>
          また、復活のダイスと組み合わせることで繰り返し自爆させることができます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="time"
        name="時間のダイス"
        rarity="伝説"
        image={Time}
        atk={40}
        attackSpeed={0.7}
        range={0}
        hp={800}
        diceColor="dimgray"
        customProperties={{
          "味方の攻撃速度増加(%)": 7,
          "敵の攻撃速度減少(%)": 7,
        }}
        incrementWhenClassUp={{
          atk: 4,
          hp: 80,
          attackSpeed: 0.07,
          "味方の攻撃速度増加(%)": 0.5,
          "敵の攻撃速度減少(%)": 0.5,
        }}
        incrementWhenDotUp={{
          atk: 28,
          hp: 560,
          attackSpeed: 0.14,
          "味方の攻撃速度増加(%)": 2,
          "敵の攻撃速度減少(%)": 2,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          自分と同じ出目を持つ味方の攻撃速度は、
          <span className="variable">
            {incrementalCalculate(
              7,
              0.5,
              2,
              7,
              diceClasses.time || 7,
              diceDots.time || 1
            )}
            %
          </span>
          増加し、敵の攻撃速度は
          <span className="variable">
            {incrementalCalculate(
              7,
              0.5,
              2,
              7,
              diceClasses.time || 7,
              diceDots.time || 1
            )}
            %
          </span>
          減少する。
        </p>
        <p className="mt-4">
          置くだけで攻撃速度でアドを取ることができるダイスです。
        </p>
        <BuffNote />
        <p className="mt-4">
          基本的に時間のダイスの出目を上げるのではなく、時間のダイス含め1出目をまき散らすことで攻撃速度をかなり増加させる戦略が多いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="solar"
        name="太陽のダイス"
        rarity="伝説"
        image={Solar}
        addImages={[SolarInactive]}
        atk={70}
        attackSpeed={1.1}
        range={2}
        hp={1200}
        diceColor="darkorange"
        customProperties={{
          "[3個]追加範囲ダメージ(%)": 50,
          "[5個]追加範囲ダメージ(%)": 80,
        }}
        incrementWhenClassUp={{ atk: 7, hp: 120, attackSpeed: 0.11 }}
        incrementWhenDotUp={{ atk: 49, hp: 840, attackSpeed: 0.22 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          配置された[太陽のダイス]の数に従って、スキルが変化する。
        </p>
        <p className="font-medium">
          <span className="qty">[3個]</span>
          追加で敵を攻撃する時、攻撃した敵の周囲8方向にいる全ての敵に、与えたダメージの
          <span className="variable">50%</span>分の追加ダメージを与える。
        </p>
        <p className="font-medium">
          <span className="qty">[5個]</span>
          追加で敵を攻撃する時、攻撃した敵の周囲8方向にいる全ての敵に、与えたダメージの
          <span className="variable">80%</span>分の追加ダメージを与える。
        </p>
        <p className="mt-4">火のダイスの強化版ダイスです。</p>
        <p>
          活性化させると周囲のダイスに1.5倍以上のダメージを与えることができるため、活性化できれば強いです。
        </p>
        <p>以前は火のダイスより弱かったことがあります。</p>
      </DiceDesc>
      <DiceDesc
        id="lunar"
        name="月のダイス"
        rarity="伝説"
        image={Lunar}
        addImages={[LunarInactive]}
        atk={80}
        attackSpeed={1.1}
        range={1}
        hp={1000}
        diceColor="deepskyblue"
        customProperties={{
          "攻撃速度増加(%)": 15,
          "[3個]クリティカル率増加(%)": 15,
          "[5個]クリティカル率増加(%)": 25,
        }}
        incrementWhenClassUp={{
          atk: 8,
          hp: 100,
          attackSpeed: 0.11,
          "攻撃速度増加(%)": 1,
        }}
        incrementWhenDotUp={{
          atk: 56,
          hp: 700,
          attackSpeed: 0.22,
          "攻撃速度増加(%)": 4,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向にいる全ての味方の攻撃速度が
          <span className="variable">
            {incrementalCalculate(
              15,
              1,
              4,
              7,
              diceClasses.lunar || 7,
              diceDots.lunar || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="font-medium">
          配置された[月のダイス]の数に従って、スキルが変化する。
        </p>
        <p className="font-medium">
          <span className="qty">[3個]</span>
          追加で周囲8方向にいる全ての味方のクリティカル率が
          <span className="variable">15%</span>増加する。
        </p>
        <p className="font-medium">
          <span className="qty">[5個]</span>
          追加で周囲8方向にいる全ての味方のクリティカル率が
          <span className="variable">25%</span>増加する。
        </p>
        <p className="mt-4">
          光のダイスの強化版ダイス...なのですが、光のダイスより攻撃速度上昇値が弱いです。
        </p>
        <p>
          その代わり活性化させるとクリティカル発生確率を上昇させることができます。
        </p>
        <BuffNote />
        <p>そのため、クリティカル発生率も重複させることができます。</p>
      </DiceDesc>
      <DiceDesc
        id="judgement"
        name="裁きのダイス"
        rarity="伝説"
        image={Judgement}
        atk={100}
        attackSpeed={0.5}
        range={2}
        hp={1000}
        diceColor="darkgoldenrod"
        customProperties={{ 範囲ダメージ: 200 }}
        incrementWhenClassUp={{
          atk: 10,
          hp: 100,
          attackSpeed: 0.05,
          範囲ダメージ: 20,
        }}
        incrementWhenDotUp={{
          atk: 70,
          hp: 700,
          attackSpeed: 0.1,
          範囲ダメージ: 60,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を倒した時、HPが一番低い敵とその周囲8方向にいる全ての敵に
          <span className="variable">
            {incrementalCalculate(
              200,
              20,
              60,
              7,
              diceClasses.judgement || 7,
              diceDots.judgement || 1
            )}
          </span>
          の追加ダメージを与える。
        </p>
        <p className="mt-4">
          敵を倒したときに弱い敵とその周りに追加で攻撃できるダイスです。
        </p>
        <p>ただ、最初の状態だと攻撃速度がかなり遅いことがデメリットです。</p>
      </DiceDesc>
      <DiceDesc
        id="goodevil"
        name="善悪のダイス"
        rarity="伝説"
        image={Goodevil}
        addImages={[GoodevilEvil, GoodevilGood]}
        atk={70}
        attackSpeed={1.2}
        range={2}
        hp={900}
        diceColor="gray"
        diceColorGradient="linear-gradient(180deg, whitesmoke 50%, dimgray 50%)"
        customProperties={{
          "[奇数]攻撃力増加(%)": 100,
          "[奇数]HP減少(%)": 70,
          "[偶数]攻撃力減少(%)": 70,
          "[偶数]HP増加(%)": 100,
        }}
        incrementWhenClassUp={{ atk: 7, hp: 90, attackSpeed: 0.12 }}
        incrementWhenDotUp={{ atk: 49, hp: 630, attackSpeed: 0.2 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <CalcNote content="奇数・偶数時のパラメーター" />
        <p className="font-medium">自分の現在出目数に従ってスキルが変わる。</p>
        <p className="font-medium">
          <span className="qty">[奇数]</span>攻撃範囲が
          <span className="variable">1</span>、攻撃力が
          <span className="variable">
            <span className="line-through">200%</span>100%
          </span>
          増加するが、HPが<span className="variable">70%</span>減少する。
        </p>
        <p className="font-medium">
          <span className="qty">[偶数]</span>
          攻撃範囲内にいる全ての敵を挑発し、HPが
          <span className="variable">
            <span className="line-through">200%</span>100%
          </span>
          増加するが、攻撃力が<span className="variable">70%</span>減少する。
        </p>
        <p className="mt-4 text-red-600">
          ※奇数時の攻撃力増加、また偶数時のHP増加は200%ではなく100%(2倍になる)であることが判明しています。
        </p>
        <p>2つのスキルを切り替えることができるダイスです。</p>
        <p>
          奇数時ではDPSがかなり高い+射程が3であるため、かなりの早さで敵を倒すことができます。
        </p>
        <p>
          しかし、HPがかなり低い状態なので、バリアのダイスなどと組み合わせて使われます。
        </p>
        <p>
          偶数時では盾の効果を持つ上に奇数状態から切り替えることが簡単なため、危ないときに凌ぐことができます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="hell"
        name="地獄のダイス"
        rarity="伝説"
        image={Hell}
        atk={80}
        attackSpeed={1}
        range={1}
        hp={800}
        diceColor="black"
        customProperties={{ "即死率(%)": 2 }}
        incrementWhenClassUp={{
          atk: 8,
          hp: 80,
          attackSpeed: 0.1,
          "即死率(%)": 0.1,
        }}
        incrementWhenDotUp={{
          atk: 56,
          hp: 560,
          attackSpeed: 0.2,
          "即死率(%)": 0.2,
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
              2,
              0.1,
              0.2,
              7,
              diceClasses.hell || 7,
              diceDots.hell || 1
            )}
            %
          </span>
          の確率で即死させる即死スキルを与える。
        </p>
        <p className="mt-4">攻撃時に一定確率で即死できるダイスです。</p>
        <BuffNote />
        <p>
          敵の主力ダイスに即死が入ればかなりの確率で勝てますが、それ以外だとこのダイスを入れている意味がなくなってしまうため、かなり使いづらいです。
        </p>
        <p>
          改造された電気のダイスの連鎖攻撃や、裁きのダイスの裁き効果などの特殊攻撃にも即死抽選が行われます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="levelup"
        name="レベルアップのダイス"
        rarity="伝説"
        image={Levelup}
        addImages={[LevelupGt0]}
        atk={50}
        attackSpeed={1}
        range={3}
        hp={1200}
        diceColor="darkorange"
        customProperties={{ 攻撃力増加: 10 }}
        incrementWhenClassUp={{
          atk: 5,
          hp: 120,
          attackSpeed: 0.1,
          攻撃力増加: 0.5,
        }}
        incrementWhenDotUp={{ atk: 35, hp: 840, attackSpeed: 0.2 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <CalcNote content="レベルアップ時の攻撃力" />
        <p className="font-medium">
          敵を倒した時、攻撃力が
          <span className="variable">
            {incrementalCalculate(
              10,
              0.5,
              0,
              7,
              diceClasses.levelup || 7,
              diceDots.levelup || 1
            )}
          </span>
          ずつ無限に増加する。
        </p>
        <p className="mt-4">
          自身が敵のダイスを倒すほど攻撃力が上がっていくダイスです。ウェーブを跨いでもレベルは持続します。
        </p>
        <p>
          説明文に「無限」と書いてありますが、100レベル以上になると攻撃力は99レベルのままになります。
        </p>
        <p>
          また、レベルは味方のレベルアップダイス全部で共有
          <span className="font-bold">ではありません</span>。独立しています。
        </p>
      </DiceDesc>
      <DiceDesc
        id="holybow"
        name="光の弓のダイス"
        rarity="伝説"
        image={Holybow}
        addImages={[HolybowDivine]}
        atk={80}
        attackSpeed={0.8}
        range={3}
        hp={1000}
        diceColor="teal"
        diceColorGradient="linear-gradient(180deg, teal 50%, orange 50%)"
        customProperties={{
          "発動確率(%)": 20,
          光の矢ダメージ: 120,
          "変身確率(%)": 20,
          "ダメージ増加(%)": 150,
        }}
        incrementWhenClassUp={{
          atk: 8,
          hp: 100,
          attackSpeed: 0.08,
          光の矢ダメージ: 15,
        }}
        incrementWhenDotUp={{
          atk: 56,
          hp: 700,
          attackSpeed: 0.16,
          光の矢ダメージ: 70,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、<span className="variable">20%</span>
          の確率で一直線上にいる全ての敵に
          <span className="variable">
            {incrementalCalculate(
              120,
              15,
              70,
              7,
              diceClasses.holybow || 7,
              diceDots.holybow || 1
            )}
          </span>
          ダメージを与える。
        </p>
        <p className="font-medium">
          また、生成/合成する時、<span className="variable">20%</span>
          の確率で天上の弓のダイスに変化し、この時にスキルを発動した場合、スキルダメージ量が
          <span className="variable">150%</span>増加する。
        </p>
        <p className="mt-4">
          一定確率で貫通して攻撃することができるダイスです。
        </p>
        <p>
          天上の弓になると、弓ダメージが2.5倍になることからかなりの強さを発揮します。
        </p>
        <p>
          盾のダイスを攻撃しても奥に攻撃できるうえ、盾のダイスを破壊するのも早いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="holysword"
        name="光の剣のダイス"
        rarity="伝説"
        image={Holysword}
        addImages={[HolyswordDivine]}
        atk={100}
        attackSpeed={0.9}
        range={2}
        hp={1400}
        diceColor="deepskyblue"
        diceColorGradient="linear-gradient(180deg, deepskyblue 50%, orange 50%)"
        customProperties={{
          "発動確率(%)": 20,
          "最大HP基盤ダメージ(%)": 5,
          "変身確率(%)": 20,
          "ダメージ増加(%)": 150,
        }}
        incrementWhenClassUp={{
          atk: 10,
          hp: 140,
          attackSpeed: 0.09,
          "最大HP基盤ダメージ(%)": 0.25,
        }}
        incrementWhenDotUp={{
          atk: 70,
          hp: 980,
          attackSpeed: 0.18,
          "最大HP基盤ダメージ(%)": 1.5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、<span className="variable">20%</span>
          の確率で攻撃した敵の最大HP
          <span className="variable">
            {incrementalCalculate(
              5,
              0.25,
              1.5,
              7,
              diceClasses.holysword || 7,
              diceDots.holysword || 1
            )}
            %
          </span>
          分の追加ダメージを与える。
        </p>
        <p className="font-medium">
          また、生成/合成する時、<span className="variable">20%</span>
          の確率で天上の剣のダイスに変化し、この時にスキルを発動した場合、スキルダメージ量が
          <span className="variable">150%</span>増加する。
        </p>
        <p className="mt-4">一定確率で最大HP割合ダメージを与えるダイスです。</p>
        <p>
          出目を上げると割合がかなり強くなります。
        </p>
      </DiceDesc>
      <DiceDesc
        id="soulcollector"
        name="魂のダイス"
        rarity="伝説"
        image={Soulcollector}
        atk={50}
        attackSpeed={1}
        range={3}
        hp={1300}
        diceColor="darkslategray"
        customProperties={{
          "攻撃力増加(%)": 6,
          "攻撃速度増加(%)": 6,
          "HP増加(%)": 6,
        }}
        incrementWhenClassUp={{
          atk: 5,
          hp: 130,
          attackSpeed: 0.1,
          "攻撃力増加(%)": 0.5,
          "攻撃速度増加(%)": 0.5,
          "HP増加(%)": 0.5,
        }}
        incrementWhenDotUp={{ atk: 35, hp: 910, attackSpeed: 0.2 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向を2倍に拡張した範囲内にいる味方のダイスが死ぬたびに、攻撃力と攻撃速度、HPが各
          <span className="variable">
            {incrementalCalculate(
              6,
              0.5,
              0,
              7,
              diceClasses.soulcollector || 7,
              diceDots.soulcollector || 1
            )}
            %
          </span>
          ずつ増加する。
        </p>
        <p className="mt-4">味方のダイスが死ぬほど強くなるダイスです。</p>
        <p>復活のダイスで復活したダイスもカウントされます。</p>
      </DiceDesc>
      <DiceDesc
        id="recall"
        name="リコールのダイス"
        rarity="伝説"
        image={Recall}
        atk={60}
        attackSpeed={1}
        range={3}
        hp={1100}
        diceColor="darkcyan"
        customProperties={{ "HP回復(%)": 20 }}
        incrementWhenClassUp={{
          atk: 6,
          hp: 110,
          attackSpeed: 0.1,
          "HP回復(%)": 2,
        }}
        incrementWhenDotUp={{
          atk: 42,
          hp: 770,
          attackSpeed: 0.2,
          "HP回復(%)": 10,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          自分が死ぬ時、出目数が一番高い味方のダイス1個を自分の位置に移動させる。
        </p>
        <p className="font-medium">
          移動したダイスは、最大HPの
          <span className="variable">
            {incrementalCalculate(
              20,
              2,
              10,
              7,
              diceClasses.recall || 7,
              diceDots.recall || 1
            )}
            %
          </span>
          を回復する。
        </p>
        <p className="mt-4">
          出目が7のダイスを2つ作ってしまうとランダムで移動してしまうので、弱いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="prediction"
        name="予測のダイス"
        rarity="伝説"
        image={Prediction}
        atk={50}
        attackSpeed={1.1}
        range={2}
        hp={1300}
        diceColor="gold"
        customProperties={{ 攻撃力増加: 110, "攻撃力増加(%)": 150 }}
        incrementWhenClassUp={{
          atk: 5,
          hp: 130,
          attackSpeed: 0.11,
          攻撃力増加: 10,
          "攻撃力増加(%)": 7.5,
        }}
        incrementWhenDotUp={{ atk: 35, hp: 910, attackSpeed: 0.22 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <CalcNote content="予測成功時のステータス" />
        <p className="font-medium">
          予測のダイスを生成/合成する時、範囲内にいる敵のダイスが生成/合成されたら予測成功となる。
        </p>
        <p className="font-medium">
          予測に成功した場合、攻撃力が永久に
          <span className="variable">
            {incrementalCalculate(
              110,
              10,
              0,
              7,
              diceClasses.prediction || 7,
              diceDots.prediction || 1
            )}
          </span>
          増加する。
        </p>
        <p className="font-medium">
          予測に成功したラウンドでは、フィールドに設置された全ての予測のダイスの攻撃力が
          <span className="variable">
            {incrementalCalculate(
              150,
              7.5,
              0,
              7,
              diceClasses.prediction || 7,
              diceDots.prediction || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="mt-4">
          攻撃力が永久に上がる点はレベルと似ていますが、最大生成1回+出目上げ6回までしかチャンスがありません。その代わりにレベルのダイスより安定して攻撃力をあげることができます。
        </p>
        <p>また、攻撃力200%増加は基本攻撃力のみにかかります。予測成功時の攻撃力は増えません。</p>
      </DiceDesc>
    </>
  );
}
