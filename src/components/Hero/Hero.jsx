import Image from "next/image";

import { KFButton } from "../UI/KFButton";
import hero_img from "@/assets/images/hero-img.webp";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";

const Hero = () => {
  return (
    <section className="bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-blue-800 via-blue-50 to-blue-50 dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-6">
          <p className="max-w-2xl font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
            #1 nutrition tracking app
          </p>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-6 tracking-tight md:text-5xl xl:text-6xl">
            Reach your goals <br /> with <span>KinnectFit</span>
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
            Build healthy habits with the all-in-one food, exercise, and calorie
            tracker.
          </p>

          <KFButton
            type="submit"
            color="primary"
            variant="shadow"
            size="xl"
            className="my-4"
          >
            Start today <RightArrowIcon />
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
