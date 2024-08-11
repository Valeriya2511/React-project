import SearchBar from "@/components/searchBar";
import { Advent_Pro } from "next/font/google";

const inter = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const cons = () => {
    console.log('Hello');
  }
  return (
  <main className={`main ${inter.className}`}>
    <SearchBar lastSearchQuery="" onSearch={cons}></SearchBar>
  </main>
  )
}
