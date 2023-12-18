import React, { useState } from "react";
import Link from "next/link";

import { KFButton } from "@/components/KFButton";
import { KFInput } from "@/components/KFInput";

import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/assets/icons/MailIcon";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen md:flex">
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white w-1/2">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <KFInput
            type="email"
            variant="bordered"
            placeholder="Enter your email"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="mb-4"
          />
          <KFInput
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
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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
          <span className="text-sm ml-2">
            Dont have an account ?
            <Link
              href="/sign-up"
              className="text-sm ml-2 text-[#0C134F] hover:text-[#1D267D] cursor-pointer"
            >
              Sign Up
            </Link>
          </span>
          <br></br>
          <span className="text-sm ml-2 hover:text-[#0C134F] cursor-pointer">
            Forgot Password ?
          </span>
        </form>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-[#0C134F] to-[#1D267D] i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            kinnectfit
          </h1>
          <p className="text-white mt-1">
            Discover more about fitness related things
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-[#0C134F] mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
    </div>
  );
};

export default SignInPage;
