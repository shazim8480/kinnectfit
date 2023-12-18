import { Montserrat } from "next/font/google";

// landing page components
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={` ${montserrat.className}`}>
      <Hero />
      <FAQ />
    </main>
  );
}
