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

function WorkoutPage() {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { workoutName } = router.query;
  const workout_deatils = workout_data.find(
    (w) => w.workout_name === workoutName
  );

  const [isStarted, setIsStarted] = useState(false);

  const handleStartWorkout = () => {
    setIsStarted(true);
  };

  return (
    <section className="grid max-w-screen-xl mx-auto grid-cols-1 grid-rows-1 md:grid-cols-2 py-10">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-6">
          <Image
            removewrapper
            alt="workout_cover"
            className="z-0 object-cover w-full h-full"
            src={workout_deatils?.workout_cover}
            width={500}
            height={500}
          />
          <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
            {workout_deatils?.workout_name}
          </h5>
          <div className="flex gap-3">
            <div className="flex items-center">
              <UserIcon fill="black" />
              <p className="ml-1">{workout_deatils?.trainer_name}</p>
            </div>
            <div className="flex items-center">
              <Clock fill="black" />
              <p className="ml-1">{workout_deatils?.total_workout_time} min</p>
            </div>
            <div className="flex items-center">
              <Star fill="black" />
              <p className="ml-1">{workout_deatils?.average_rating}/5</p>
            </div>
          </div>
          <h5 className="my-5 text-xl font-medium leading-tight text-neutral-800">
            Workout Description
          </h5>
          <p className="mb-4 text-base text-neutral-600 ">
            {workout_deatils?.description}
          </p>
        </div>
      </div>

      <div className="blo">
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            Workout Overview
          </h5>
          <div className="mb-4 text-base text-neutral-600">
            {workout_deatils?.workout_modules.map((module) => {
              return (
                <>
                  <div className="py-4 w-full">
                    <Checkbox
                      key={module.name}
                      aria-label={module.name}
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
                      // isSelected={isSelected}
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
