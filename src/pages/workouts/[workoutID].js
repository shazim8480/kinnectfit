import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";
import { UserIcon } from "@/assets/icons/UserIcon";
import { KFButton } from "@/components/UI/KFButton";
import { useState } from "react";
import { Checkbox, Link, User, Chip, cn, Spinner } from "@nextui-org/react";
import {
  useGetSingleWorkoutQuery,
  useGetUserWorkoutByIdQuery,
  useStartWorkoutMutation,
  useUpdateWorkoutModuleMutation,
} from "@/redux/feature/workout/workout-api";
import { useSelector } from "react-redux";
import UserCard from "@/components/Workout-Items/UserCard";
import ShowReview from "@/components/ShowReview/ShowReview";
import ReviewStar from "@/components/ShowReview/ReviewStar";
import { useGetReviewsByWorkoutIdQuery } from "@/redux/feature/review/review-api";

function WorkoutPage() {
  const router = useRouter();
  const { workoutID } = router.query;
  // console.log("route query", router?.query);
  const { user } = useSelector((state) => state.user);
  // console.log("userinfo ", user);
  const { data: workoutReviewData, isLoading: workoutReviewLoading } = useGetReviewsByWorkoutIdQuery(workoutID);
  const [startWorkout, { isLoading, isSuccess }] = useStartWorkoutMutation();
  const [updateWorkoutModule] = useUpdateWorkoutModuleMutation();
  const { data: workoutData } = useGetSingleWorkoutQuery(workoutID);
  const { data: getworkoutbyuserid } = useGetUserWorkoutByIdQuery(user?.id, {
    refetchOnMountOrArgChange: true,
  });

  const [isStarted, setIsStarted] = useState(false);

  const handleStartWorkout = async () => {
    try {
      const data = {
        data: workoutData,
        userId: user.id,
      };
      // console.log(data);

      let startWorkoutResponse = await startWorkout(data);
      // console.log("start workout -", startWorkoutResponse);
      if (startWorkoutResponse?.data?.status === 200) {
        setIsStarted(true);
      } else {
        console.log("err msg", startWorkoutResponse?.error);
      }
    } catch (error) {
      console.error("Error fetching workout data:", error);
    }
  };

  const handleCheck = async (module) => {
    // console.log("clicked", module);
    const updateModuleInfo = {
      data: {
        isConfirmed: true,
      },
      id: workoutID,
      module_id: module?.id,
    };
    const updatedResult = await updateWorkoutModule(updateModuleInfo);
    // console.log("updatedResult", updatedResult);

    if (updatedResult?.data?.status === 200) {
      setIsStarted(true);
    } else if (updatedResult?.error) {
      console.log("err msg", updatedResult?.error);
    }
  };

  if (workoutReviewLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

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
              workoutData?.workout.workout_cover
                ? workoutData?.workout.workout_cover
                : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={1000}
            height={300}
          />
          <div className="p-6">
            <h5 className="text-2xl font-bold leading-tight text-blue-900">
              {workoutData?.workout.workout_name}
            </h5>
            <div className="flex gap-3 mt-3">
              <div className="flex items-center">
                <UserIcon fill="black" />
                <p className="ml-1 text-gray-500">
                  {workoutData?.workout.trainer_name}
                </p>
              </div>
              <div className="flex items-center">
                <Clock fill="black" />
                <p className="ml-1 text-gray-500">
                  {workoutData?.workout.total_workout_time} min
                </p>
              </div>
              <div className="flex items-center">
                <Star fill="orange" />
                <p className="ml-1 text-gray-500">
                  {workoutData?.workout.average_rating
                    ? workoutData?.workout.average_rating
                    : "4.8"}
                </p>
              </div>
            </div>
            <h5 className="mt-5 mb-2 text-lg font-medium leading-tight text-gray-800">
              Workout Overview
            </h5>
            <p className="text-gray-500 text-md ">
              {workoutData?.workout?.description}
            </p>
          </div>
        </div>
        <div className="block">
          <div className="px-6 py-6 lg:py-0 xl:py-0">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
              Workout Modules
            </h5>
            <div className="mb-4 text-base text-neutral-600">
              {isLoading ? (
                <Spinner />
              ) : getworkoutbyuserid?.workouts?.some(
                (e) => e?.workout_id === workoutID
              ) ? (
                getworkoutbyuserid?.workouts
                  ?.filter((e) => e?.workout_id === workoutID)
                  ?.map((module, index) => {
                    // console.log("module if user started workout", module);
                    return module.workout_modules?.map((module) => (
                      <UserCard
                        key={module?._id}
                        module={module}
                        handleCheck={handleCheck}
                        isStarted={isStarted}
                      />
                    ));
                  })
              ) : (
                workoutData?.workout?.workout_modules?.map((module, index) => {
                  // console.log("mod", module);
                  return (
                    <UserCard
                      key={module?.id}
                      module={module}
                      handleCheck={handleCheck}
                      isStarted={isStarted}
                    />
                  );
                })
              )}
            </div>
            {getworkoutbyuserid?.workouts?.some(
              (e) => e?.workout_id === workoutID
            ) ? (
              <></>
            ) : (
              <KFButton
                color={"secondary"}
                className="w-full rounded-md"
                onClick={isStarted ? undefined : handleStartWorkout}
                isDisabled={getworkoutbyuserid?.workouts?.some(
                  (e) => e?.workout_id === workoutID
                )}
              >
                {"Start Workout"}
              </KFButton>
            )}
          </div>
        </div>
      </section>;
      {/* workout modules ends */}









      {/* Show reviews  */}
      {workoutReviewData?.reviews?.map((review) => {
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
      })}

      {/* Show reviews ends */}





    </>
  );
}
export default WorkoutPage;

WorkoutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
