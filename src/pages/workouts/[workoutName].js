import { useRouter } from "next/router";
import Image from "next/image";
import { workout_data } from "@/lib/db/workout-data";
import MainLayout from "@/layouts/mainLayout";
import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";
import { UserIcon } from "@/assets/icons/UserIcon";
import { KFButton } from "@/components/UI/KFButton";
import { useState } from "react";
import { Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import {
  useGetSingleWorkoutQuery,
  useStartWorkoutMutation,
  useUpdateWorkoutModuleMutation,
} from "@/redux/feature/workout/workout-api";
import { useSelector } from "react-redux";

function WorkoutPage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { workoutName } = router.query;
  console.log("workoutName", workoutName);
  // const { workoutName } = req.params;
  // console.log(user);
  const [startWorkout] = useStartWorkoutMutation();
  const { data } = useGetSingleWorkoutQuery(workoutName);
  const [updateWorkoutModule] = useUpdateWorkoutModuleMutation();
  const [isSelected, setIsSelected] = useState(false);

  console.log("getSingleWorkout", data);

  const workout_details = workout_data.find(
    (w) => w.workout_name === workoutName
  );

  const [isStarted, setIsStarted] = useState(false);

  const handleCheck = async (module) => {
    console.log("clicked", module);
    const updateModuleInfo = {
      data: {
        isConfirmed: true,
      },
      id: workoutName,
      module_id: module?.id,
    };
    const updatedResult = await updateWorkoutModule(updateModuleInfo);
    console.log("updatedResult", updatedResult);

    // setIsSelected(true);

    // const data = {
    //   data: module,
    //   userId: user.id
    // };

    let startWorkoutResponse = await startWorkout(data);
    // console.log(startWorkoutResponse);
    // return;
    if (startWorkoutResponse?.data?.status) {
    } else if (startWorkoutResponse?.error) {
      console.log("err msg", startWorkoutResponse?.error);
    }
  };
  const handleStartWorkout = async () => {
    const data = {
      data: workout_details,
      userId: user?.id,
    };
    console.log(data);
    let startWorkoutResponse = await startWorkout(data);
    if (startWorkoutResponse?.data?.status) {
      setIsStarted(true);
    } else if (startWorkoutResponse?.error) {
      console.log("err msg", startWorkoutResponse?.error);
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
              workout_details?.workout_cover
                ? workout_details?.workout_cover
                : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={500}
            height={500}
          />
          <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
            {workout_details?.workout_name}
          </h5>
          <div className="flex gap-3">
            <div className="flex items-center">
              <UserIcon fill="black" />
              <p className="ml-1">{workout_details?.trainer_name}</p>
            </div>
            <div className="flex items-center">
              <Clock fill="black" />
              <p className="ml-1">{workout_details?.total_workout_time} min</p>
            </div>
            <div className="flex items-center">
              <Star fill="black" />
              <p className="ml-1">{workout_details?.average_rating}/5</p>
            </div>
          </div>
          <h5 className="my-5 text-xl font-medium leading-tight text-neutral-800">
            Workout Description
          </h5>
          <p className="mb-4 text-base text-neutral-600 ">
            {workout_details?.description}
          </p>
        </div>
      </div>

      <div className="blo">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            Workout Overview
          </h5>
          <div className="mb-4 text-base text-neutral-600">
            {data?.workout?.workout_modules.map((module) => {
              return (
                <>
                  <div className="py-4 w-full">
                    <Checkbox
                      key={module.name}
                      aria-label={module.name}
                      onClick={() => handleCheck(module)}
                      classNames={{
                        base: cn(
                          "inline-flex w-full max-w-xl bg-content1",
                          "hover:bg-content2 items-center justify-start",
                          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                          "data-[selected=true]:border-primary"
                        ),
                        label: "w-full",
                      }}
                      isDisabled={!isStarted}
                      // isIndeterminate={isSelected}
                      onValueChange={setIsSelected}
                    >
                      <div className="w-full flex justify-end gap-2">
                        <div className="flex flex-col items-end gap-1">
                          {module.name}
                          <Chip color="success" size="sm" variant="flat">
                            {module.time} sec
                          </Chip>
                        </div>
                      </div>
                    </Checkbox>
                  </div>
                </>
              );
            })}
          </div>
          <KFButton
            color={"primary"}
            onClick={isStarted ? undefined : handleStartWorkout}
            isDisabled={isStarted}
          >
            {"Start Workout"}
          </KFButton>
        </div>
      </div>
    </section>
  );
}
export default WorkoutPage;

WorkoutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
