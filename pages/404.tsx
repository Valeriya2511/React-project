import Link from "next/link";
import { Advent_Pro } from "next/font/google";

const adventPro = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"] });

export default function NotFound() {
  return (
    <div className={`not-found ${adventPro.className}`}>
      <h2>Page not found</h2>
      <p className="page-404">404</p>
      <Link href={"/"} className="return-to-main-page">
        Return to main page
      </Link>
    </div>
  );
}
