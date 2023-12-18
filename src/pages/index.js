import { Montserrat } from "next/font/google";

// landing page components
import Hero from "@/components/Hero/Hero";
import FAQ from "@/components/FAQ/FAQ";
import KFNavbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={` ${montserrat.className}`}>
      <KFNavbar />
      <Hero />
      <FAQ />
      <Footer />
    </main>
  );
}
