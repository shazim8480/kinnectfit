import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { UserIcon } from "@/assets/icons/UserIcon";
import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const WorkoutCard = ({ workoutItem }) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleStart = () => {
    if (isAuthenticated) {
      router.push(`/workouts/${workout_name}`);
    } else {
      router.replace(`/workouts/${workout_name}`, "sign-in");
    }
  };
  // destructure workout item data //
  const {
    workout_name,
    total_workout_time,
    trainer_name,
    average_rating,
    category,
    workout_cover,
    workout_id
  } = workoutItem;
  return (
    <Card
      isFooterBlurred
      className="lg:w-[300px] lg:h-[300px] w-[400px] h-[400px]"
    >
      <CardHeader className="absolute top-0 z-10 flex-col items-start bg-black/40">
        <p className="font-bold uppercase text-tiny text-white/70">
          {category}
        </p>
        <h4 className="text-xl font-medium text-white/90">{workout_name}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="workout_cover"
        className="z-0 object-cover w-full h-full rounded-lg"
        src={workout_cover ? workout_cover : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      />
      <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex items-center flex-grow gap-2">
          <div className="flex flex-col">
            <div className="flex justify-start mb-2">
              <UserIcon />
              <p className="ml-1 text-tiny text-white/80">{trainer_name}</p>
            </div>
            <div className="flex justify-between ">
              <div className="flex justify-between mr-3">
                <Clock />
                <p className="ml-1 text-tiny text-white/60">
                  {total_workout_time} min
                </p>
              </div>
              <div className="flex justify-between">
                <Star />
                <p className="ml-1 text-tiny text-white/60">
                  {average_rating} / 5
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button radius="full" size="sm" onClick={handleStart}>
          <Link href={`/workouts/${workout_id}`}>Start Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
