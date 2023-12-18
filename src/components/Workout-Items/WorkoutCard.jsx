import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { UserIcon } from "@/assets/icons/UserIcon";
import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";

const WorkoutCard = ({ workoutItem }) => {
  // destructure workout item data //
  const {
    workout_name,
    total_workout_time,
    trainer_name,
    average_rating,
    category,
  } = workoutItem;
  return (
    <Card isFooterBlurred className="w-[300px] h-[300px]">
      <CardHeader className="absolute z-10 flex-col items-start top-1">
        <p className="font-bold uppercase text-tiny text-white/60">
          {category}
        </p>
        <h4 className="text-xl font-medium text-white/90">{workout_name}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 object-cover w-full h-full"
        src={
          "https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
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
        <Button radius="full" size="sm">
          Start Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
