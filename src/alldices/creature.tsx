import {
  incrementalCalculate,
  DiceDesc,
  CArgsType,
  BuffNote,
} from "./components";

export default function GuardianDices({
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
        image={undefined}
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
      
    </>
  );
}
