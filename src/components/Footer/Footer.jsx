import React from "react";

import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className={` bg-blue-900 w-[100%] text-blue-100`}>
      <div className="max-w-screen-xl px-4 mx-auto py-14">
        <div className="grid gap-20 lg:place-content-evenly lg:grid-cols-4 sm:grid-cols-1">
          <div className="lg:flex lg:flex-col lg:justify-center">
            <h4 className="font-semibold text-[16px] mb-4">About Us</h4>
            <div>
              <p>
                We are a team of fitness enthusiasts dedicated to bringing you
                the best workout experience.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-col lg:items-center">
            <h4 className="font-semibold text-[16px] mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-1">
              <Link href="/">Home</Link>
              <Link href="/">Workouts</Link>
              <Link href="/">Plans</Link>
              <Link href="/">Contact Us</Link>
            </div>
          </div>
          <div className="lg:flex lg:flex-col lg:items-start">
            <h4 className="font-semibold text-[16px] mb-4">Contact</h4>
            <div className="flex flex-col">
              <span>123 Fitness Street,</span>
              <span>Fit City, 56789</span>
              <span>Email:info@fitnessapp.com</span>
            </div>
          </div>
          <div className="lg:flex lg:flex-col lg:items-start">
            <h4 className="font-semibold text-[16px] mb-4">Follow Us</h4>
            <div className="flex space-x-8">
              <FiFacebook size={24} />
              <FiTwitter size={24} />
              <FiInstagram size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center pb-6 text-center ">
        <div>© 2023 Fitness App.All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
