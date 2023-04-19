import {
  incrementalCalculate,
  DiceDesc,
  CArgsType,
  BuffNote,
} from "./components";

import Azuredragon from "@/../public/dices/azuredragon.webp";
import Vermilionbird from "@/../public/dices/vermilionbird.webp";
import Blacktortoise from "@/../public/dices/blacktortoise.webp";
import Whitetiger from "@/../public/dices/whitetiger.webp";

export default function GuardianDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
}: CArgsType) {
  return (
    <>
      <DiceDesc
        id="azuredragon"
        name="青龍のダイス"
        rarity="四神"
        image={Azuredragon}
        atk={40}
        attackSpeed={0.9}
        range={3}
        hp={1400}
        diceColor="darkgreen"
        diceColorGradient="linear-gradient(180deg, mediumseagreen 0%, darkgreen 100%)"
        customProperties={{
          破壊されたダイス: 10,
          ビームダメージ: 250,
          味方のHP回復: 100,
        }}
        incrementWhenClassUp={{
          atk: 4,
          hp: 140,
          attackSpeed: 0.09,
          ビームダメージ: 25,
          味方のHP回復: 10,
        }}
        incrementWhenDotUp={{
          atk: 28,
          hp: 980,
          attackSpeed: 0.18,
          ビームダメージ: 50,
          味方のHP回復: 20,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          スキルは、フィールドに[青龍]が1体のみ配置されている場合に使用できる。
        </p>
        <p className="font-medium">
          範囲内にいる<span className="variable">10個</span>
          のダイスが破壊されると、攻撃が強化される。
        </p>
        <p className="font-medium">
          強化後は、一直線上にいる全ての敵に
          <span className="variable">
            {incrementalCalculate(
              250,
              25,
              50,
              7,
              diceClasses.azuredragon || 7,
              diceDots.azuredragon || 1
            )}
          </span>
          ダメージを与え、味方には
          <span className="variable">
            {incrementalCalculate(
              100,
              10,
              20,
              7,
              diceClasses.azuredragon || 7,
              diceDots.azuredragon || 1
            )}
            HP
          </span>
          を回復させる。
        </p>
        <p className="mt-4">
          敵味方関係なくダイスが10個破壊されたら、味方のダイスに対して回復効果がある光の弓のようなものを放つ攻撃をします。
        </p>
        <p>
          10個は盾のダイスを破壊したり、復活のダイスで復活したダイスを破壊することでかなり簡単に稼ぐことができます。
        </p>
      </DiceDesc>
      <DiceDesc
        id="vermilionbird"
        name="朱雀のダイス"
        rarity="四神"
        image={Vermilionbird}
        atk={70}
        attackSpeed={0.9}
        range={2}
        hp={700}
        diceColor="red"
        diceColorGradient="linear-gradient(180deg, orange 0%, maroon 100%)"
        customProperties={{
          "卵状態のHP(%)": 100,
          "生存時間(s)": 2.5,
          範囲ダメージ: 1000,
          攻撃力増加: 50,
        }}
        incrementWhenClassUp={{
          atk: 7,
          hp: 70,
          attackSpeed: 0.09,
          範囲ダメージ: 100,
          攻撃力増加: 2.5,
        }}
        incrementWhenDotUp={{
          atk: 49,
          hp: 490,
          attackSpeed: 0.18,
          範囲ダメージ: 500,
          攻撃力増加: 20,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          スキルは、フィールドに[朱雀]が1体のみ配置されている場合に使用できる。
        </p>
        <p className="font-medium">
          朱雀が破壊されるときに1回、<span className="variable">100%</span>
          のHPを持つ卵状態になる。卵状態で
          <span className="variable">2.5秒間</span>生存すると復活する。
        </p>
        <p className="font-medium">
          復活すると周囲8方向を2倍に拡張した範囲にいる全ての敵に
          <span className="variable">
            {incrementalCalculate(
              1000,
              100,
              500,
              7,
              diceClasses.vermilionbird || 7,
              diceDots.vermilionbird || 1
            )}
          </span>
          ダメージを与え、フィールド上にいる全ての味方の攻撃力を
          <span className="variable">
            {incrementalCalculate(
              50,
              2.5,
              20,
              7,
              diceClasses.vermilionbird || 7,
              diceDots.vermilionbird || 1
            )}
          </span>
          増加させる。
        </p>
        <p className="mt-4">
          倒されても一度復活し、そのまま耐えれば味方の攻撃力を上昇し、自爆のダイスの上位互換効果を発動できるダイスです。
        </p>
        <p>
          このダイスと復活のダイスとの特殊挙動として、卵状態で倒されたあと、復活のダイスで復活したとき、生存秒数のカウントが
          <span className="font-bold">
            卵状態での経過時間がすでに経過した状態からスタート
          </span>
          します。
        </p>
      </DiceDesc>
      <DiceDesc
        id="blacktortoise"
        name="玄武のダイス"
        rarity="四神"
        image={Blacktortoise}
        atk={90}
        attackSpeed={0.5}
        range={1}
        hp={1800}
        diceColor="indigo"
        diceColorGradient="linear-gradient(180deg, mediumpurple 0%, indigo 80%, darkslateblue 100%)"
        customProperties={{ 基本攻撃被撃数: 12, 獲得保護シールド: 500 }}
        incrementWhenClassUp={{
          atk: 9,
          hp: 180,
          attackSpeed: 0.05,
          獲得保護シールド: 50,
        }}
        incrementWhenDotUp={{
          atk: 63,
          hp: 1260,
          attackSpeed: 0.1,
          獲得保護シールド: 100,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          スキルは、フィールドに[玄武]が1体のみ配置されている場合に使用できる。
        </p>
        <p className="font-medium">
          <span className="variable">12回</span>
          基本攻撃を受けると、自分の攻撃範囲が最大に広がり、全ての敵を挑発する。
        </p>
        <p className="font-medium">
          挑発された敵は、攻撃範囲が最大に広がり、挑発した敵1体ごとに
          <span className="variable">
            {incrementalCalculate(
              500,
              50,
              10,
              7,
              diceClasses.blacktortoise || 7,
              diceDots.blacktortoise || 1
            )}
            HP
          </span>
          分の保護シールドを獲得する。
        </p>
        <p className="mt-4">
          12回被弾したら、とても多いバリアをゲットし、挑発効果を獲得するダイスです。
        </p>
        <p>
          他のダイスが玄武のダイスを攻撃している間に、自分の強いダイスで相手のダイスを攻撃することができます。
        </p>
        <p>
          注意点として、火のダイスの範囲攻撃、青龍のダイスのビームなどは基本攻撃に当たらず、回数を稼ぐことができません。
        </p>
        <p>
          また、「攻撃範囲が最大に広がり」とあるように、盾のダイスや時間のダイスなど、攻撃範囲が0のダイスも玄武のダイスを攻撃するようになります。(これらのダイスに攻撃力がセットされているのはおそらくこのため)
        </p>
      </DiceDesc>
      <DiceDesc
        id="whitetiger"
        name="白虎のダイス"
        rarity="四神"
        image={Whitetiger}
        atk={50}
        attackSpeed={1}
        range={2}
        hp={1300}
        diceColor="midnightblue"
        diceColorGradient="linear-gradient(180deg, paleturquoise 0%, midnightblue 50%, black 100%)"
        customProperties={{ "待機時間(s)": 0.5, クリティカルダメージ増加: 50 }}
        incrementWhenClassUp={{
          atk: 5,
          hp: 130,
          attackSpeed: 0.1,
          クリティカルダメージ増加: 2.5,
        }}
        incrementWhenDotUp={{
          atk: 35,
          hp: 910,
          attackSpeed: 0.2,
          クリティカルダメージ増加: 5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          スキルは、フィールドに[白虎]が1体のみ配置されている場合に使用できる。
        </p>
        <p className="font-medium">
          <span className="variable">0.5秒間</span>
          攻撃する敵がいない場合、敵の周囲8方向に瞬間移動する。
        </p>
        <p className="font-medium">
          初めて瞬間移動したとき、攻撃範囲が1、クリティカル率は100%になり、瞬間移動するたびにクリティカルダメージが
          <span className="variable">
            {incrementalCalculate(
              50,
              2.5,
              5,
              7,
              diceClasses.whitetiger || 7,
              diceDots.whitetiger || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="mt-4">
          周囲の敵を倒し終わったら、他の敵のダイスを全て倒すまで瞬間移動し続けるダイスです。
        </p>
        <p>
          基本的に四隅に置き、最初の周囲の敵をなるべく少なくする立ち回りが基本です。
        </p>
        <p>
          注意点として、四隅に置かれた敵のダイスは白虎のダイスで攻撃することができません。
        </p>
      </DiceDesc>
    </>
  );
}
