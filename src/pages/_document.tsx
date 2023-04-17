import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head prefix="og: http://ogp.me/ns#" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
