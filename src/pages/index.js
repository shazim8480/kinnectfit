import Hero from "@/components/Hero";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={` ${montserrat.className}`}>
      <Hero />
    </main>
  );
}
