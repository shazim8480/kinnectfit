import { useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";

import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/assets/icons/MailIcon";
import { NameIcon } from "@/assets/icons/NameIcon";

//
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "@/redux/feature/auth/auth-api";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/feature/user/userSlice";

const montserrat = Montserrat({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // sign up query
  const [signUp] = useSignUpMutation();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const onSubmit = async (data) => {
    // e.preventDefault();
    // console.log(data);
    if (Object.keys(errors).length === 0) {
      let signUpResponse = await signUp(data);
      // console.log("sign up response", signUpResponse);
      if (signUpResponse?.data?.status === 200) {
        dispatch(setUser(data));
        router.push("/");
      } else if (signUpResponse?.error) {
        console.log("err msg", signUpResponse?.error);
        setError("email", {
          message: signUpResponse?.error?.data?.message,
        });
      }
    }
  };

  return (
    <div className={`h-screen md:flex ${montserrat.className}`}>
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
      <div className="flex items-center justify-center py-10 bg-white md:w-1/2">
        <form
          className="w-1/2 bg-white"
          onSubmit={handleSubmit(onSubmit)}
          // action="#"
          // method="POST"
        >
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

          {/* Name */}
          <KFInput
            id="name"
            type="text"
            name="name"
            {...register("name", {
              required: "*Name is required",
            })}
            // value={formData.name}
            // onChange={handleInputChange}
            variant="bordered"
            fullWidth
            placeholder="Enter you full name"
            endContent={<NameIcon />}
            // className="mb-4"
          />

          <div className="h-[25px] my-1">
            {errors.name && (
              <p className="mb-4 ml-1 text-sm text-left text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
            // value={formData.email}
            // onChange={handleInputChange}
            variant="bordered"
            placeholder="Enter your email"
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
            {...register("password", {
              required: "*Password is required",
              minLength: {
                value: 4,
                message: "Password should be at least 4 characters.",
              },
            })}
            // value={formData.password}
            // onChange={handleInputChange}
            variant="bordered"
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
          <div className="h-[25px] my-1">
            {errors.password && (
              <p className="ml-1 text-sm text-left text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <KFButton
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full my-4"
          >
            Create Account
          </KFButton>
          <span className="ml-2 text-sm">
            Already have an account ?
            <Link
              href="/sign-in"
              className="ml-2 text-sm underline cursor-pointer decoration-indigo-950 hover:decoration-blue-700 text-blue-950 hover:text-blue-700"
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
