import { incrementalCalculate, DiceDesc, CArgsType, BuffNote } from "./components";
import { useLang } from "@/pages/_app";
import { useLocale } from "@/hooks/useLocale";

import Light from "@/../public/dices/light.webp";
import Sniper from "@/../public/dices/sniper.webp";
import Heal from "@/../public/dices/heal.webp";
import Gale from "@/../public/dices/gale.webp";
import GaleTransform from "@/../public/dices/gale_transform.webp";
import Invincible from "@/../public/dices/invincible.webp";
import Spear from "@/../public/dices/spear.webp";

export default function RareDices({
  diceClasses,
  setDiceClasses,
  diceDots,
  setDiceDots,
  i18n
}: CArgsType) {
  const { lang } = useLang();
  const { t } = useLocale(lang, i18n, "dicedesc/rare");
  return (
    <>
      <DiceDesc
        id="light"
        name={t("light.name")}
        rarity={t("common:rare")}
        image={Light}
        atk={50}
        attackSpeed={0.8}
        range={1}
        hp={700}
        diceColor="yellow"
        customProperties={{ [t("light.speedup")]: 20 }}
        incrementWhenClassUp={{ atk: 2.5, hp: 35, [t("light.speedup")]: 0.5 }}
        incrementWhenDotUp={{
          atk: 35,
          hp: 490,
          attackSpeed: 0.16,
          [t("light.speedup")]: 5,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          {t("light.desc1")}
          <span className="variable">
            {incrementalCalculate(
              20,
              0.5,
              5,
              3,
              diceClasses.light || 3,
              diceDots.light || 1
            )}
            %
          </span>
          {t("light.desc2")}
        </p>
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
        incrementWhenClassUp={{
          atk: 3,
          hp: 25,
          "距離ごとの追加ダメージ(%)": 1.5,
        }}
        incrementWhenDotUp={{
          atk: 42,
          hp: 350,
          attackSpeed: 0.1,
          "距離ごとの追加ダメージ(%)": 3,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          攻撃する敵との距離が1マス遠くなるほど、与えるダメージ量が
          <span className="variable">
            {incrementalCalculate(
              30,
              1.5,
              3,
              3,
              diceClasses.sniper || 3,
              diceDots.sniper || 1
            )}
            %
          </span>
          ずつ増加する。
        </p>
        <p className="mt-4">GO史上一番射程が長いダイスです。</p>
        <p>
          ボードの中央におけばどのダイスにも攻撃が届く上に、攻撃速度は遅いが敵のダイスとの距離が離れていれば攻撃力が高いのでかなり有用なダイスです。
        </p>
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
        customProperties={{ "発動時間(s)": 1, HP回復: 50 }}
        incrementWhenClassUp={{ atk: 3, hp: 45, HP回復: 2.5 }}
        incrementWhenDotUp={{ atk: 42, hp: 630, attackSpeed: 0.16, HP回復: 10 }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          <span className="variable">1秒</span>ごとに周囲8方向にいる味方のHPを
          <span className="variable">
            {incrementalCalculate(
              50,
              2.5,
              10,
              3,
              diceClasses.heal || 3,
              diceDots.heal || 1
            )}
          </span>
          回復させる。
        </p>
        <p className="mt-4">
          周囲の味方を高頻度で回復することができるダイスです。
        </p>
        <p>
          しかし、序盤は回復量が上回ることがありますが、後半になってくると攻撃された時点でもう回復しても意味がないような状況になってしまうことが多いです。
        </p>
      </DiceDesc>
      <DiceDesc
        id="gale"
        name="強風のダイス"
        rarity="レア"
        image={Gale}
        addImages={[GaleTransform]}
        atk={60}
        attackSpeed={1.2}
        range={3}
        hp={600}
        diceColor="darkturquoise"
        customProperties={{ "発動時間(s)": 5, "攻撃速度増加(%)": 80 }}
        incrementWhenClassUp={{ atk: 3, hp: 30, "攻撃速度増加(%)": 4 }}
        incrementWhenDotUp={{
          atk: 42,
          hp: 420,
          attackSpeed: 0.24,
          "攻撃速度増加(%)": 8,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          バトル開始<span className="variable">5秒後</span>
          に変身し、変身した場合、攻撃速度が
          <span className="variable">
            {incrementalCalculate(
              80,
              4,
              8,
              3,
              diceClasses.gale || 3,
              diceDots.gale || 1
            )}
            %
          </span>
          増加する。
        </p>
        <p className="mt-4">
          5秒(以前は4秒だった)を耐えることで、攻撃速度を1.5倍以上にできるダイスです。
        </p>
        <p>
          盾のダイスを使用することで5秒は簡単に稼げるため、簡単に高DPSな攻撃を遠距離から与えることができます。
        </p>
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
        incrementWhenDotUp={{
          atk: 35,
          hp: 420,
          attackSpeed: 0.16,
          "持続時間(s)": 0.1,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          周囲8方向の範囲内にいる味方のHPが<span className="variable">20%</span>
          以下になると、その味方に
          <span className="variable">
            {incrementalCalculate(
              0.5,
              0.025,
              0.1,
              3,
              diceClasses.invincible || 3,
              diceDots.invincible || 1
            )}
            秒間
          </span>
          無敵状態になるバフを与える。
        </p>
        <p className="mt-4">
          味方が瀕死になると0.5秒(以前は1秒だった)以上の無敵バフを付与するダイスです。
        </p>
        <p>
          盾のダイスや倒されるとまずい火力ダイスと組み合わせて使われることが多いです。
        </p>
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
        customProperties={{ 追加ダメージ: 150 }}
        incrementWhenClassUp={{ atk: 2, hp: 50, 追加ダメージ: 7.5 }}
        incrementWhenDotUp={{
          atk: 28,
          hp: 700,
          attackSpeed: 0.2,
          追加ダメージ: 75,
        }}
        diceClasses={diceClasses}
        setDiceClasses={setDiceClasses}
        dots={diceDots}
        setDots={setDiceDots}
      >
        <p className="font-medium">
          敵を攻撃する時、攻撃した敵の1マス後ろの方向にいる敵に
          <span className="variable">
            {incrementalCalculate(
              150,
              7.5,
              75,
              3,
              diceClasses.spear || 3,
              diceDots.spear || 1
            )}
          </span>
          の追加ダメージを与える。
        </p>
        <p className="mt-4">
          敵を攻撃するときに1マス貫通して攻撃を与えることができるダイスです。
        </p>
        <p>
          素の攻撃力が低いうえ、攻撃範囲が1のためかなり使いづらいダイスです。
        </p>
      </DiceDesc>
    </>
  );
}
