import { incrementalCalculate, DiceDesc, CArgsType } from "./components";
import { useLang } from "@/pages/_app";
import { useLocale } from "@/hooks/useLocale";

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
  i18n
}: CArgsType) {
  const { lang } = useLang();
  const { t } = useLocale(lang, i18n, "dicedesc/normal");
//  console.log(i18n);
  return (
    <>
      <DiceDesc
        id="fire"
        name={t("fire.name")}
        rarity={t("common:normal")}
        image={Fire}
        atk={100}
        attackSpeed={0.7}
        range={2}
        hp={900}
        diceColor="red"
        customProperties={{ [t("fire.splashDmg")]: 40 }}
        incrementWhenClassUp={{ atk: 5, hp: 45, [t("fire.splashDmg")]: 2 }}
        incrementWhenDotUp={{
          atk: 70,
          hp: 630,
          attackSpeed: 0.14,
          [t("fire.splashDmg")]: 20,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          {t("fire.desc1")}
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
          {t("fire.desc2")}
        </p>
        <p className="mt-4">
          {t("fire.guide1")}
        </p>
      </DiceDesc>
      <DiceDesc
        id="wind"
        name={t("wind.name")}
        rarity={t("common:normal")}
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
        <p className="font-medium">{t("wind.desc1")}</p>
        <p className="mt-4">
          {t("wind.guide1")}
        </p>
      </DiceDesc>
      <DiceDesc
        id="water"
        name={t("water.name")}
        rarity={t("common:normal")}
        image={Water}
        atk={90}
        attackSpeed={0.8}
        range={2}
        hp={800}
        diceColor="aqua"
        customProperties={
          { 
            [t("water.speedDown")]: 12,
            [t("water.maxstack")]: 3,
            [t("water.duration")]: 3
          }
        }
        incrementWhenClassUp={{ atk: 4.5, hp: 40, [t("water.speedDown")]: 0.6 }}
        incrementWhenDotUp={{
          atk: 63,
          hp: 560,
          attackSpeed: 0.16,
          [t("water.speedDown")]: 1.2,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          {t("water.desc1")}
          <span className="variable">{t("water.reverse") ? `3${t("common:secs")}`:`${incrementalCalculate(
              12,
              0.6,
              1.2,
              1,
              diceClasses.water || 1,
              diceDots.water || 1
            )}%`}</span>
          {t("water.desc2")}
          <span className="variable">
            {!t("water.reverse") ? `3${t("common:secs")}`:`${incrementalCalculate(
              12,
              0.6,
              1.2,
              1,
              diceClasses.water || 1,
              diceDots.water || 1
            )}%`}
          </span>
          {t("water.desc3")}
          <span className="variable">3{t("water.stack")}</span>{t("water.desc4")}
        </p>
        <p className="mt-4">
          {t("water.guide1")}
        </p>
        <p>{t("water.guide2")}</p>
      </DiceDesc>
      <DiceDesc
        id="sword"
        name={t("sword.name")}
        rarity={t("common:normal")}
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
          {t("sword.desc1")}
        </p>
        <p className="mt-4">
          {t("sword.guide1")}
        </p>
        <p>{t("sword.guide2")}</p>
      </DiceDesc>
      <DiceDesc
        id="shield"
        name={t("shield.name")}
        rarity={t("common:normal")}
        image={Shield}
        atk={50}
        attackSpeed={0.6}
        range={0}
        hp={1200}
        diceColor="goldenrod"
        incrementWhenClassUp={{ atk: 2.5, hp: 60 }}
        incrementWhenDotUp={{ atk: 35, hp: 840, attackSpeed: 0.12 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          {t("shield.desc1")}
        </p>
        <p className="mt-4">
          {t("shield.guide1")}
        </p>
        <p className="mt-4">
          {t("shield.guide2")}<span className="font-bold">{t("shield.guide3")}</span>
          {t("shield.guide4")}
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
        atk={60}
        attackSpeed={0.5}
        range={2}
        hp={1000}
        diceColor="dimgray"
        customProperties={{ "現在HP基盤ダメージ(%)": 10 }}
        incrementWhenClassUp={{ atk: 3, hp: 50, "現在HP基盤ダメージ(%)": 0.5 }}
        incrementWhenDotUp={{
          atk: 42,
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
