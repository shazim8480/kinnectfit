import Image from "next/image";

import { KFButton } from "../UI/KFButton";
import hero_img from "@/assets/images/hero-img.webp";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-6">
          <p className="max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            #1 nutrition tracking app
          </p>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
            Reach your goals <br /> with kinnectfit
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Build healthy habits with the all-in-one food, exercise, and calorie
            tracker.
          </p>
          <KFButton
            type="submit"
            color="primary"
            variant="shadow"
            className="my-4"
          >
            Start today{" "}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </KFButton>
        </div>
        <div className="hidden lg:justify-end lg:mt-0 lg:col-span-6 lg:flex">
          <Image alt="hero" src={hero_img} width={"300"} height={300} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
