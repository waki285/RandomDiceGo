import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Headline from "@/components/Headline";
import tocbot from "tocbot";
import { useEffect } from "react";

export default function AllDices() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h3, h4",
    });
    return () => tocbot.destroy();
  }, []);
  return (
    <>
      <Header />
      <main className="ml-8">
        <Headline id="all-dices">全ダイス解説</Headline>
        <p>2023/04/15 (バージョン1.1.4) 時点の Random Dice GO の全ダイスを説明します。</p>
        <p>Special Thanks: <a href="http://aureliano.ml/randomdice/alldices.html" className="link">http://aureliano.ml/randomdice/alldices.html</a></p>
        <Headline id="toc-headline">目次</Headline>
        <aside className="toc" />
        <Headline id="dices-headline">ダイス</Headline>
        <div className="body">
          <Headline id="dices-normal" renderAs="h3" fontSize={1.25} borderColor="blue">ノーマル</Headline>
          <Headline id="dice-fire" renderAs="h4" fontSize={1.125} borderColor="red">火のダイス</Headline>
        </div>
      </main>
    </>
  );
}
