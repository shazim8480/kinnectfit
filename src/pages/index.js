import Image from "next/image";
import KinnectNavbar from "@/components/Navbar/Navbar";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${poppins.className}`}
    >
      <KinnectNavbar />
    </main>
  );
}
