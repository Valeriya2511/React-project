import { Advent_Pro } from "next/font/google";

const inter = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return <main className={`main ${inter.className}`}>Hello next.js</main>;
}
