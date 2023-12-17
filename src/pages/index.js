import Image from "next/image";
import { Montserrat } from "next/font/google";
import FAQ from "@/components/FAQ";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={` ${montserrat.className}`}>
      <FAQ />
    </main>
  );
}
