import React from "react";
import H1 from "../Custom/H1";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className={`bg-primary w-[100%] text-white`}>
      <div className="px-10 py-14 relative">
        <div className="grid lg:grid-cols-4 sm:grid-cols-1  gap-10">
          <div>
            <H1 text="About Us"></H1>
            <div>
              <p>
                We are a team of fitness enthusiasts dedicated to bringing you the best workout experience.
              </p>
            </div>
          </div>
          <div>
            <H1 text="Quick Links"></H1>
            <div className="flex flex-col space-y-1">
              <Link href="/">
                Home
              </Link>
              <Link href="/">
                Workouts
              </Link>
              <Link href="/">
                Plans
              </Link>
              <Link href="/">
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <H1 text="Contact"></H1>
            <div className="flex flex-col">
              <span>123 Fitness Street,</span>
              <span>Fit City, 56789</span>
              <span>Email:info@fitnessapp.com</span>
            </div>
          </div>
          <div>
            <H1 text="Follow Us"></H1>
            <div className="flex space-x-8">
              <FiFacebook size={24} />
              <FiTwitter size={24} />
              <FiInstagram size={24} />
            </div>
          </div>
        </div>
        <div className="absolute  left-0 right-0 h-[1px] bg-white mx-10 my-8" />
      </div>
      <div className="flex flex-col text-center lg:flex-row lg:justify-between px-10">
        <div>
          © 2023 Fitness App.All rights reserved.
        </div>
        <div className="flex flex-col   lg:flex-row lg:gap-5 pb-10">
          <Link href={"/"}>Privacy Policy</Link >
          <Link href={"/"}>Terms & Conditions</Link >
        </div>
      </div>
    </footer>
  );
};

export default Footer;
