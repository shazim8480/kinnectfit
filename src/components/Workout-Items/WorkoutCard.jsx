import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { UserIcon } from "@/assets/icons/UserIcon";
import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getItemFromLocalStorage } from "@/lib/utils";

const WorkoutCard = ({ workoutItem }) => {
  const {
    workout_name,
    total_workout_time,
    trainer,
    workout_description,
    workout_cover,
    workout_category,
    _id: workout_id,
  } = workoutItem;

  // console.log("Workout Item", workoutItem);
  // const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');
  const router = useRouter();
  const handleStart = () => {
    if (accessToken) {
      router.push(`/workouts/${workout_id}`);
    } else {
      router.replace(`/workouts/${workout_id}`, "sign-in");
    }
  };
  // destructure workout item data //

  return (
    <Card
      isFooterBlurred
      className="lg:w-[300px] lg:h-[300px] w-[400px] h-[400px]"
    >
      <CardHeader className="absolute top-0 z-10 flex-col items-start bg-black/40">
        <p className="font-bold uppercase text-tiny text-white/70">
          {workout_category}
        </p>
        <h4 className="text-xl font-medium text-white/90">{workout_name}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="workout_cover"
        className="z-0 object-cover w-full h-full rounded-lg"
        src={
          workout_cover
        }
      />
      <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex items-center flex-grow gap-2">
          <div className="flex flex-col">
            <div className="flex justify-start mb-2">
              <UserIcon />
              <p className="ml-1 text-tiny text-white/80">{trainer?.name}</p>
            </div>
            <div className="flex justify-between ">
              <div className="flex justify-between mr-3">
                <Clock />
                <p className="ml-1 text-tiny text-white/60">
                  {total_workout_time} min
                </p>
              </div>
              {/* <div className="flex justify-between">
                <Star />
                <p className="ml-1 text-tiny text-white/60">
                  {average_rating} / 5
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <Button color="primary" radius="full" size="sm" onClick={handleStart}>
          <Link href={`/workouts/${workout_id}`}>See Workout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
