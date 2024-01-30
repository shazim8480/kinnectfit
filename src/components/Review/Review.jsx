/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import user1 from "../../assets/images/user1.png";
import user2 from "../../assets/images/user2.png";
import user3 from "../../assets/images/user3.png";
import user4 from "../../assets/images/user4.png";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HeadingText from "../UI/HeadingText";
const Review = () => {
  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <HeadingText title="What Our Customers Say" className="text-center" />
        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="lg:flex lg:gap-10">
              {/* customer 1 review */}
              <div className="flex flex-col items-center gap-8 pt-6 text-center lg:items-stretch lg:text-left lg:flex-row lg:py-16">
                {/* customer image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-full">
                  <Image src={user1} alt="user1" />
                </div>
                {/* customer details */}
                <div>
                  <div>
                    <span className="relative text-base font-semibold leading-7">
                      Tahmid Alom / CEO
                      <div className="absolute  left-0 right-0  h-[1px] bg-black"></div>
                    </span>
                  </div>
                  <div className="mt-5 text-base leading-7 text-gray-600">
                    Amazing workouts! The variety keeps me motivated. The
                    user-friendly interface makes tracking progress a breeze.
                    Highly recommend for anyone looking to elevate their fitness
                    journey.
                  </div>
                </div>
              </div>

              {/* customer 2 review */}
              <div className="flex flex-col items-center gap-8 py-16 text-center lg:items-stretch lg:text-left lg:flex-row">
                {/* customer image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-full">
                  <Image src={user2} alt="user2" />
                </div>
                {/* customer details */}
                <div>
                  <div>
                    <span className="relative text-base font-semibold leading-7">
                      Honey Jisa / Doctor
                      <div className="absolute  left-0 right-0  h-[1px] bg-black"></div>
                    </span>
                  </div>
                  <div className="mt-5 text-base leading-7 text-gray-600">
                    Incredible fitness resource! The expert guidance and diverse
                    routines make every session enjoyable. The interactive
                    features add an extra layer of engagement. A must-try for
                    fitness enthusiasts.
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="lg:flex lg:gap-10">
              {/* customer 3 review */}
              <div className="flex flex-col items-center gap-8 pt-6 text-center lg:items-stretch lg:text-left lg:flex-row lg:py-16">
                {/* customer image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-full">
                  <Image src={user3} alt="user3" />
                </div>
                {/* customer details */}
                <div>
                  <div>
                    <span className="relative text-base font-semibold leading-7">
                      Andrew David / Athlete
                      <div className="absolute  left-0 right-0  h-[1px] bg-black"></div>
                    </span>
                  </div>
                  <div className="mt-5 text-base leading-7 text-gray-600">
                    Exceptional fitness platform! The personalized plans cater
                    to my goals, and the video demos ensure proper form. The
                    community support is fantastic. Transform your fitness with
                    this website
                  </div>
                </div>
              </div>

              {/* customer 4 review */}
              <div className="flex flex-col items-center gap-8 py-16 text-center lg:items-stretch lg:text-left lg:flex-row">
                {/* customer image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-full">
                  <Image src={user4} alt="user4" />
                </div>
                {/* customer details */}
                <div>
                  <div>
                    <span className="relative text-base font-semibold leading-7">
                      Carl Pablo / Designer
                      <div className="absolute  left-0 right-0  h-[1px] bg-black"></div>
                    </span>
                  </div>
                  <div className="mt-5 text-base leading-7 text-gray-600">
                    Outstanding! The easy-to-follow workouts, nutritional tips,
                    and progress tracking make this site a game-changer. It's
                    like having a personal trainer at my fingertips. Love the
                    results and convenience.
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Review;
