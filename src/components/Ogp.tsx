import { memo } from "react";
import Head from "next/head";

const Ogp = memo(function Ogp({ url, type, title, description }: { url: string, type: "website" | "article", title: string, description: string }) {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:site_name" content="RandomDiceGo 攻略" />
      {/* <meta property="og:image" content=" サムネイル画像の URL" /> */}
    </Head>
  )
});