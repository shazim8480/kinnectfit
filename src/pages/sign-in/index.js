import React, { useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";

import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/assets/icons/MailIcon";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`h-screen md:flex ${montserrat.className}`}>
      <div className="flex items-center justify-center py-10 bg-white md:w-1/2">
        <form
          className="w-1/2 "
          onSubmit={handleSubmit}
          action="#"
          method="POST"
        >
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <KFInput
            id="email"
            type="email"
            name="email"
            isRequired
            value={formData.email}
            onChange={handleInputChange}
            variant="bordered"
            placeholder="Enter your email"
            endContent={
              <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
            }
            className="mb-4"
          />
          <KFInput
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            label="Password"
            variant="bordered"
            size="xl"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <KFButton
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full my-4"
          >
            Login
          </KFButton>
          <p className="ml-2 text-sm">
            Dont have an account ?
            <Link
              href="/sign-up"
              className="ml-2 text-sm underline cursor-pointer decoration-indigo-950 hover:decoration-blue-700 text-blue-950 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
          {/* <br></br>
          <span className="text-sm ml-2 hover:text-[#0C134F] cursor-pointer">
            Forgot Password ?
          </span> */}
        </form>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-[#0C134F] to-[#1D267D] i justify-around items-center hidden">
        <div>
          <h1 className="font-sans text-4xl font-bold text-white">
            KinnectFit
          </h1>
          <p className="my-10 text-white">
            Discover more about fitness related things
          </p>
          <Link href={"/"}>
            <button
              type="submit"
              className="block w-1/2 bg-white text-[#0C134F] mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Back to Home
            </button>
          </Link>
        </div>
        <div className="absolute border-4 border-t-8 rounded-full -bottom-32 -left-40 w-80 h-80 border-opacity-30"></div>
        <div className="absolute border-4 border-t-8 rounded-full -bottom-40 -left-20 w-80 h-80 border-opacity-30"></div>
        <div className="absolute border-4 border-t-8 rounded-full -top-40 -right-0 w-80 h-80 border-opacity-30"></div>
        <div className="absolute border-4 border-t-8 rounded-full -top-20 -right-20 w-80 h-80 border-opacity-30"></div>
      </div>
    </div>
  );
};

export default SignInPage;
