import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResult";
import { Advent_Pro } from "next/font/google";

const inter = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const cons = () => {
    console.log('Hello');
  }

  const rusult = {
    name: 'pokemon',
    url: 'https://pokeapi.co/api/v2/pokemon/ditto',
  }
  return (
  <main className={`main ${inter.className}`}>
    <SearchBar lastSearchQuery="" onSearch={cons}></SearchBar>
    <SearchResults results={[rusult]}></SearchResults>
  </main>
  )
}
