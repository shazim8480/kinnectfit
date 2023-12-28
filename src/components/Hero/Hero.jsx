import Image from "next/image";

import { KFButton } from "../UI/KFButton";
import hero_img from "@/assets/images/hero-img.webp";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Hero = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleStart = () => {
    if (isAuthenticated) {
      router.push("start-today");
    } else {
      router.push("sign-in");
    }
  };

  return (
    <section className="bg-white lg:bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] lg:from-blue-800 lg:via-blue-50 lg:to-blue-50 dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-6">
          <p className="max-w-2xl mb-4 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
            #1 nutrition tracking app
          </p>
          <h1 className="relative max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-950 md:text-5xl xl:text-5xl">
            Reach your goals <br />
            <span className="">
              with <span className="text-blue-800">KinnectFit</span>
            </span>
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
            href="start-today"
            onClick={handleStart}
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
