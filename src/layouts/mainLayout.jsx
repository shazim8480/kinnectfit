"use client";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <main>
      {/* <Navbar/> */}
      {children}
      {/* <Footer /> */}
    </main>
  );
};

export default MainLayout;
