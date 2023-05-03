import {
  incrementalCalculate,
  DiceDesc,
  CArgsType,
  BuffNote,
} from "./components";

import Gumiho from "@/../public/dices/gumiho.webp";
import GumihoInactive from "@/../public/dices/gumiho_inactive.webp";
import Gargoyle from "@/../public/dices/gargoyle.webp";
import GargoyleInactive from "@/../public/dices/gargoyle_inactive.webp";

export default function CreatureDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
}: CArgsType) {
  return (
    <>
      <DiceDesc
        id="gumiho"
        name="九尾のダイス"
        rarity="妖怪"
        image={Gumiho}
        addImages={[GumihoInactive]}
        atk={40}
        attackSpeed={1}
        range={3}
        hp={1300}
        diceColor="lightpink"
        diceColorGradient="linear-gradient(180deg, white 0%, lightpink 50%, deeppink 100%)"
        customProperties={{
          "発動HP(%)": 40,
          "持続時間(s)": 4,
        }}
        incrementWhenClassUp={{
          atk: 4,
          hp: 130,
          attackSpeed: 0.1,
          "発動HP(%)": 1,
          "持続時間(s)": 0.25,
        }}
        incrementWhenDotUp={{
          atk: 28,
          hp: 910,
          attackSpeed: 0.2,
          "発動HP(%)": 7,
          "持続時間(s)": 0.5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          「九尾のダイス」が2個以下で配置されている場合、スキルを発動できる。
        </p>
        <p className="font-medium">
          敵を攻撃する時、攻撃した敵のHPが
          <span className="variable">
            {incrementalCalculate(
              40,
              1,
              7,
              7,
              diceClasses.gumiho || 7,
              diceDots.gumiho || 1
            )}%
          </span>
          以下である場合、
          <span className="variable">
            {incrementalCalculate(
              4,
              0.25,
              0.5,
              7,
              diceClasses.gumiho || 7,
              diceDots.gumiho || 1
            )}
            秒間
          </span>
          その対象を誘惑する。
        </p>
        <p className="font-medium">誘惑されたダイスは、自分の味方を攻撃する。</p>
        <p className="mt-4">
          敵を一時自分の味方にできるダイスです。
        </p>
        <p>
          盾に吸われると意味がないですが、白虎のダイスなどを誘惑できるとかなりの強さを発揮します。
        </p>
      </DiceDesc>
      <DiceDesc
        id="gargoyle"
        name="ガーゴイルのダイス"
        rarity="妖怪"
        image={Gargoyle}
        addImages={[GargoyleInactive]}
        atk={60}
        attackSpeed={1}
        range={1}
        hp={1500}
        diceColor="darkslategray"
        diceColorGradient="linear-gradient(180deg, darkslategray 0%, teal 100%)"
        customProperties={{
          "持続時間(s)": 3,
          "受けるダメージ減少(%)": 50,
          "スキル減少(%)": 5,
          "攻撃力増加(%)": 200
        }}
        incrementWhenClassUp={{
          atk: 6,
          hp: 150,
          attackSpeed: 0.1,
          "受けるダメージ減少(%)": 1.25,
          "攻撃力増加(%)": 10,
        }}
        incrementWhenDotUp={{
          atk: 42,
          hp: 1050,
          attackSpeed: 0.2,
          "受けるダメージ減少(%)": 6,
          "攻撃力増加(%)": 20,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          「ガーゴイルのダイス」が2個以下で配置されている場合、スキルを発動できる。
        </p>
        <p className="font-medium">
          バトル開始時、
          <span className="variable">3秒間</span>
          周囲8方向を2倍に拡張した範囲にいる全ての敵を挑発する。
        </p>
        <p className="font-medium">
          挑発した敵から基本攻撃を受けた場合、その基本攻撃ダメージ量が
          <span className="variable">
            {incrementalCalculate(
              50,
              1.25,
              6,
              7,
              diceClasses.gargoyle || 7,
              diceDots.gargoyle || 1
            )}%
          </span>
          減少する。
        </p>
        <p className="font-medium">
          このスキルの減少率は、挑発した敵のダイス1個ごとに
          <span className="variable">5%</span>
          ずつ減少する。
        </p>
        <p className="font-medium">
          挑発スキル終了後、この「ガーゴイルのダイス」の攻撃範囲が1増加し、攻撃力が
          <span className="variable">
            {incrementalCalculate(
              200,
              10,
              20,
              7,
              diceClasses.gargoyle || 7,
              diceDots.gargoyle || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="mt-4">
          挑発スキルと高い攻撃力を兼ね備えた善悪のダイスのようなダイスです。
        </p>
        <p>
          挑発できると攻撃力を減少させられる上に、その後の攻撃力がかなり強いです。
        </p>
        <p>(表記ミスであった善悪の攻撃力200%(100%)上昇とは違い、こちらは本当に200%上昇することが確認されています。)</p>
      </DiceDesc>      
    </>
  );
}
