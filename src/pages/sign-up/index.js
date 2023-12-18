import { useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";

import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/assets/icons/MailIcon";
import { NameIcon } from "@/assets/icons/NameIcon";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={`h-screen md:flex ${montserrat.className}`}>
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
            className="block w-1/2 bg-white text-[#0C134F] mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Back to Home
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          className="bg-white w-1/2"
          onSubmit={handleSubmit}
          action="#"
          method="POST"
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <KFInput
            id="name"
            type="text"
            name="name"
            isRequired
            value={formData.name}
            onChange={handleInputChange}
            variant="bordered"
            fullWidth
            placeholder="Enter you full name"
            endContent={<NameIcon />}
            className="mb-4"
          />
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
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            className="mb-4"
          />
          <KFInput
            id="password"
            name="password"
            isRequired
            value={formData.password}
            onChange={handleInputChange}
            variant="bordered"
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
            Sign in
          </KFButton>
          <span className="text-sm ml-2">
            Already have an account ?
            <Link
              href="/sign-in"
              className="text-sm ml-2 cursor-pointer underline decoration-indigo-950 hover:decoration-blue-700 text-blue-950 hover:text-blue-700"
            >
              Login
            </Link>
          </span>
          <br></br>
          {/* <span className="text-sm ml-2 hover:text-[#0C134F] cursor-pointer">
            Forgot Password ?
          </span> */}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
