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

function WorkoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.user);
  console.log("specific workout id", router.query.id);
  console.log("userinfo ", user);

  const [startWorkout, { isLoading }] = useStartWorkoutMutation();
  const [updateWorkoutModule] = useUpdateWorkoutModuleMutation();
  const { data: workoutData } = useGetSingleWorkoutQuery(id);
  const { data: getworkoutbyuserid } = useGetUserWorkoutByIdQuery(user?.id, {
    refetchOnMountOrArgChange: true,
  });

  const [isStarted, setIsStarted] = useState(false);

  const handleCheck = async (module) => {
    console.log("clicked", module);
    const updateModuleInfo = {
      data: {
        isConfirmed: true,
      },
      id: id,
      module_id: module?.id,
    };
    const updatedResult = await updateWorkoutModule(updateModuleInfo);
    console.log("updatedResult", updatedResult);

    if (updatedResult?.data?.status) {
      setIsStarted(true);
    } else if (updatedResult?.error) {
      console.log("err msg", updatedResult?.error);
    }
  };
  const handleStartWorkout = async () => {
    try {
      const data = {
        data: workoutData,
        userId: user.id,
      };
      console.log(data);

      let startWorkoutResponse = await startWorkout(data);
      console.log("start workout -", startWorkoutResponse);
      if (startWorkoutResponse?.data?.status) {
        setIsStarted(true);
      } else if (startWorkoutResponse?.error) {
        console.log("err msg", startWorkoutResponse?.error);
      }
    } catch (error) {
      console.error("Error fetching workout data:", error);
    }
  };

  return (
    <section className="grid max-w-screen-xl mx-auto grid-cols-1 grid-rows-1 md:grid-cols-2 py-10">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-6">
          <Image
            removewrapper
            alt="workout_cover"
            className="z-0 object-cover w-full h-full"
            src={
              workoutData?.workout.workout_cover
                ? workoutData?.workout.workout_cover
                : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={500}
            height={500}
          />
          <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
            {workoutData?.workout.workout_name}
          </h5>
          <div className="flex gap-3">
            <div className="flex items-center">
              <UserIcon fill="black" />
              <p className="ml-1">{workoutData?.workout.trainer_name}</p>
            </div>
            <div className="flex items-center">
              <Clock fill="black" />
              <p className="ml-1">
                {workoutData?.workout.total_workout_time} min
              </p>
            </div>
            <div className="flex items-center">
              <Star fill="black" />
              <p className="ml-1">
                {workoutData?.workout.average_rating
                  ? workoutData?.workout.average_rating
                  : "4.8"}
                /5
              </p>
            </div>
          </div>
          <h5 className="my-5 text-xl font-medium leading-tight text-neutral-800">
            Workout Description
          </h5>
          <p className="mb-4 text-base text-neutral-600 ">
            {workoutData?.workout.description}
          </p>
        </div>
      </div>
      <div className="block">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            Workout Overview
          </h5>
          <div className="mb-4 text-base text-neutral-600">
            {isLoading ? (
              <Spinner />
            ) : getworkoutbyuserid?.workouts?.some(
                (e) => e.workout_id === id
              ) ? (
              getworkoutbyuserid?.workouts
                ?.filter((e) => e.workout_id === id)
                ?.map((module, index) => {
                  return module.workout_modules?.map((module) => (
                    <UserCard
                      key={index}
                      module={module}
                      handleCheck={handleCheck}
                      isStarted={isStarted}
                    />
                  ));
                })
            ) : (
              workoutData?.workout?.workout_modules?.map((module, index) => {
                return (
                  <UserCard
                    key={index}
                    module={module}
                    handleCheck={handleCheck}
                    isStarted={isStarted}
                  />
                );
              })
            )}
          </div>
          {getworkoutbyuserid?.workouts?.some((e) => e.workout_id === id) ? (
            <></>
          ) : (
            <KFButton
              color={"primary"}
              onClick={isStarted ? undefined : handleStartWorkout}
              isDisabled={getworkoutbyuserid?.workouts?.some(
                (e) => e.workout_id === id
              )}
            >
              {"Start Workout"}
            </KFButton>
          )}
        </div>
      </div>
    </section>
  );
}
export default WorkoutPage;

WorkoutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
