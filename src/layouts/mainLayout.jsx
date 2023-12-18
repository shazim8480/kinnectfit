import React from "react";
import Footer from "@/components/Footer/Footer";
import KFNavbar from "@/components/Navbar/Navbar";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const MainLayout = ({ children }) => {
  return (
    <main className={` ${montserrat.className}`}>
      <KFNavbar />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
