import React, { useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";

import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/assets/icons/MailIcon";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/redux/feature/auth/auth-api";
import { setUser } from "@/redux/feature/user/userSlice";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const SignInPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const setCredentials = (emailValue, passwordValue) => {
    // Update state with the new values
    setUserEmail(emailValue);
    setUserPassword(passwordValue);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // sign in query
  const [signIn] = useSignInMutation();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      let signInResponse = await signIn(data);
      const accessToken = signInResponse?.data?.data?.accessToken;
      const userData = signInResponse?.data?.data?.user;
      // Store user data or token in localStorage

      if (signInResponse?.data?.statusCode === 200) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch(setUser(signInResponse?.data?.data));
        router.push("/");
      } else if (signInResponse?.error) {
        setError("email", {
          message: signInResponse?.error?.data?.message,
        });
      }
    }
  };

  return (
    <div className={`h-screen md:flex ${montserrat.className}`}>
      <div className="flex items-center justify-center py-10 bg-white md:w-1/2">
        <form className="w-1/2 " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          {/* email */}
          <KFInput
            id="email"
            type="email"
            name="email"
            {...register("email", {
              required: "*Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid!",
              },
            })}
            variant="bordered"
            placeholder={"Enter your email"}
            endContent={
              <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
            }
          />
          <div className="h-[25px] my-1">
            {errors.email && (
              <p className="mb-4 ml-1 text-sm text-left text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <KFInput
            id="password"
            name="password"
            label="Password"
            variant="bordered"
            // defaultValue={isUser ? isUser.password : null}
            {...register("password", {
              required: "*Password is required",
              minLength: {
                value: 4,
                message: "Password should be at least 4 characters.",
              },
            })}
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

          <div className="flex items-center justify-around mt-10">
            <div className="p-5 mr-5 rounded-md shadow-sm bg-blue-50">
              <h5 className="font-medium text-blue-900">Admin</h5>
              <p className="pt-2">test@gmail.com</p>
              <p className="pt-1">1234</p>
            </div>
            <div className="p-5 mr-5 rounded-md shadow-sm bg-blue-50">
              <h5 className="font-medium text-blue-900">Trainer</h5>
              <p className="pt-2">trainer2@gmail.com</p>
              <p className="pt-1">1234</p>
            </div>
            <div className="p-5 mr-5 rounded-md shadow-sm bg-blue-50">
              <h5 className="font-medium text-blue-900">User</h5>
              <p className="pt-2">adnan@gmail.com</p>
              <p className="pt-1">1234</p>
            </div>
          </div>
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
