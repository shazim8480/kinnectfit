import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import Clock from "@/assets/icons/Clock";
import { UserIcon } from "@/assets/icons/UserIcon";
import { KFButton } from "@/components/UI/KFButton";
import { useState } from "react";
import {
  useGetSingleWorkoutQuery, useGetWorkoutModuleByWorkoutIdQuery
} from "@/redux/feature/workout/workout-api";
import UserCard from "@/components/Workout-Items/UserCard";
import { getItemFromLocalStorage } from "@/lib/utils";

function WorkoutPage() {
  const router = useRouter();
  const { workoutID } = router.query;
  const { data } = useGetSingleWorkoutQuery(workoutID);
  const { data: workoutModuleData } = useGetWorkoutModuleByWorkoutIdQuery(workoutID);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // console.log("🚀 single workoput data", data);
  const userData = getItemFromLocalStorage('userData');


  const handleStarted = () => {
    if (userData?.role === 'trainer') {
      alert("Trainer can't enroll workout modules");
      return;
    }
    setIsStarted(!isStarted);
  };
  const handleCompleted = () => {
    router.push('/dashboard');
  };

  return (
    <>
      {/* workout modules */}
      <section className="grid max-w-screen-xl grid-cols-1 grid-rows-1 py-10 mx-auto md:grid-cols-2">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <Image
            removewrapper="true"
            alt="workout_cover"
            className="z-0 object-cover w-full"
            src={
              data?.data?.workout_cover[0]
            }
            width={1000}
            height={300}
          />
          <div className="p-6">
            <h5 className="text-2xl font-bold leading-tight text-blue-900">
              {data?.data?.workout_name}
            </h5>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center">
                <UserIcon fill="black" />
                <p className="ml-1 text-gray-500">
                  {data?.data?.trainer?.name}
                </p>
              </div>
              <div className="flex items-center">
                <Clock fill="black" />
                <p className="ml-1 text-gray-500">
                  {data?.data?.total_workout_time} min
                </p>
              </div>
            </div>
            <h5 className="mt-5 mb-2 text-lg font-medium leading-tight text-gray-800">
              Workout Overview
            </h5>
            <p className="text-gray-500 text-md ">
              {data?.data?.workout_description}
            </p>
          </div>
        </div>
        <div className="block">
          <div className="px-6 py-6 lg:py-0 xl:py-0">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
              Workout Modules
            </h5>
            <div className="mb-4 text-base text-neutral-600">
              {
                workoutModuleData?.data[0]?.modules.map((module) => (
                  <UserCard
                    key={module?.id}
                    module={module}
                    workoutModuleData={workoutModuleData}
                    isStarted={isStarted}
                    isCompleted={isCompleted}
                    setIsCompleted={setIsCompleted}
                  />
                ))
              }

            </div>
            <KFButton
              color={!isCompleted ? "secondary" : "primary"}
              className="w-full rounded-md"
              onClick={isCompleted ? handleCompleted : handleStarted}
            >
              {
                isCompleted ? "Complete Workout" : isStarted ? "Pause Workout" : !isStarted && "Start Workout"
              }

            </KFButton>
          </div>
        </div>
      </section>;
      {/* workout modules ends */}


      {/* Show reviews  */}

      {/* {workoutReviewData?.reviews?.map((review) => {
        return <div key={review?.review_id} className=" m-10">
          <div className='grid grid-cols-1 md:grid-cols-2 h-full  min-h-[650px] md:min-h-[350px] items-center shadow-lg '>
            <div className='p-10'>
              <div>
                <span className='font-semibold text-lg'>{review?.review_information?.review_info?.reviewer_name}</span>
              </div>
              <div className='mt-1'>
                <ReviewStar rating={review?.review_information?.review_info?.rating} />
              </div>
              <div className='mt-2'>
                <span className='font-medium text-base'>{review?.review_information?.review_info?.review_item_name}</span>
              </div>
              <div className='mt-2'>
                <span className='italic text-gray-600'>
                  {review?.review_information?.review_info?.description}
                </span>
              </div>
            </div>
            <div className='h-full relative '>
              <Image src={review?.review_information?.review_info?.review_img[0]} alt='rental' layout='fill' className='absolute' />
            </div>
          </div>
        </div>;
      })} */}

      {/* Show reviews ends */}
    </>
  );
}
export default WorkoutPage;

WorkoutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
