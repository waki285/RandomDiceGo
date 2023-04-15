import { Lilita_One } from "next/font/google";
const LilitaOneFont = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="flex flex-col items-center my-8">
      <h1 className={`text-5xl ${LilitaOneFont.className}`}>RANDOM DICE GO 解説</h1>
    </header>
  )
}