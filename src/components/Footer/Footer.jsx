import React from "react";

import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className={`bg-black w-[100%] text-gray-200`}>
      <div className="relative px-10 py-14">
        <div className="grid gap-10 lg:grid-cols-4 sm:grid-cols-1">
          <div>
            <h1 className="font-bold text-[22px] mb-4">About Us</h1>
            <div>
              <p>
                We are a team of fitness enthusiasts dedicated to bringing you
                the best workout experience.
              </p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-[22px] mb-4">Quick Links</h1>
            <div className="flex flex-col space-y-1">
              <Link href="/">Home</Link>
              <Link href="/">Workouts</Link>
              <Link href="/">Plans</Link>
              <Link href="/">Contact Us</Link>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-[22px] mb-4">Contact</h1>
            <div className="flex flex-col">
              <span>123 Fitness Street,</span>
              <span>Fit City, 56789</span>
              <span>Email:info@fitnessapp.com</span>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-[22px] mb-4">Follow Us</h1>
            <div className="flex space-x-8">
              <FiFacebook size={24} />
              <FiTwitter size={24} />
              <FiInstagram size={24} />
            </div>
          </div>
        </div>
        <div className="absolute  left-0 right-0 h-[1px] bg-white mx-10 my-8" />
      </div>
      <div className="flex flex-col px-10 text-center lg:flex-row lg:justify-between">
        <div>© 2023 Fitness App.All rights reserved.</div>
        <div className="flex flex-col pb-10 lg:flex-row lg:gap-5 privacy-container">
          <Link href={"/"}>Privacy Policy</Link>
          <Link href={"/"}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
