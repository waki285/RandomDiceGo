import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans_JP, Inter } from "next/font/google";

const IBMPlexSansJPFont = IBM_Plex_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  adjustFontFallback: false,
});
const InterFont = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          #app-root {
            font-family: ${InterFont.style.fontFamily}, ${IBMPlexSansJPFont.style.fontFamily}, sans-serif;
          }
        `}
      </style>
      <div id="app-root" className="h-full">
        <Component {...pageProps} />
      </div>
    </>
  );
}
