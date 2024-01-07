import React from "react";
import gymImg from "@/assets/images/gym.webp";
import appImg from "@/assets/images/app.png";
import bodyImg from "@/assets/images/body.jpeg";
import Image from "next/image";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import { KFButton } from "@/components/UI/KFButton";
import Link from "next/link";
import MainLayout from "@/layouts/mainLayout";

const StartTodayPage = () => {
  const welcomeData = [
    {
      img: gymImg,
      description: "Turn workouts into a blockbuster with KinnectFit",
    },
    {
      img: bodyImg,
      description: "Download now, your coach awaits in KinnectFit",
    },
    {
      img: appImg,
      description: "Share fitness progress openly with KinnectFit app",
    },
  ];

  return (
    <div>
      <div className="min-h-screen">
        {/* welcome-heading */}
        <h4 className="mt-8 text-xl text-center">
          Welcome to <br />
          <span className="text-3xl font-semibold text-blue-800">
            KinnectFit
          </span>
        </h4>
        {/* welcome images */}
        <div className="container flex flex-wrap justify-center mx-auto ">
          {/* I want to show welcomeData here */}
          {welcomeData.map((item, index) => (
            <div key={index} className="items-center mt-2 ">
              <div className="flex flex-col items-center  max-w-[250px]">
                <Image
                  src={item?.img ? item?.img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt={`Welcome Image ${index + 1}`}
                  className="py-2 rounded-2xl h-72 w-60 object-cover"
                />
                <div className="">
                  <p className="ml-4 text-center text-md">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-3 text-center">
          <KFButton
            as={Link}
            type="submit"
            color="secondary"
            variant="shadow"
            size="md"
            className="my-4 "
            href="start-today/basic-info"
          >
            Continue <RightArrowIcon />
          </KFButton>
        </div>
      </div>
    </div>
  );
};

export default StartTodayPage;

StartTodayPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
