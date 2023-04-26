import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import { useEffect, useState, memo, Fragment } from "react";
import Ogp from "@/components/Ogp";
import Big from "big.js";
import {
  Dot
} from "@/alldices/components";


export default function Tools() {
  const [dot, setDot] = useState(1);
  const [hue, setHue] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [brightness, setBrightness] = useState(100)
  return (
    <>
      <Head>
        <title>開発者用ツール｜RandomDiceGo攻略</title>
      </Head>
      <Ogp
        url="https://rdg.suzuneu.com/tools"
        type="article"
        title="開発者用ツール"
        description="RandomDiceGoページのためのツールです。"
      />
      <Header />
      <main className="mx-4 pc:mx-12">
        <Headline id="all-dices">開発者用ツール</Headline>
        <p>
          私が使っています
        </p>
        <Headline id="dps">あ</Headline>
        <Dot {...{ dot, hue, saturate, brightness }} />
        <p>dot</p>
        <input type="range" min={1} max={7} value={dot} onChange={(e) => setDot(Number(e.target.value))} />
        <p>hue</p>
        <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} />
        <p>saturate</p>
        <input type="range" min={0} max={5000} value={saturate} onChange={(e) => setSaturate(Number(e.target.value))} />
        <p>brightness</p>
        <input type="range" min={0} max={100} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
      </main>
    </>
  );
}
