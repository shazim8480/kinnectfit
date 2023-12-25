import Clock from "@/assets/icons/Clock";
import Star from "@/assets/icons/Star";
import { UserIcon } from "@/assets/icons/UserIcon";
import { KFButton } from "@/components/UI/KFButton";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  button,
} from "@nextui-org/react";
import Link from "next/link";
const WorkoutPlanCard = ({ workoutItem }) => {
  const {
    workout_name,
    workout_cover,
    category,
    average_rating,
    total_workout_time,
    trainer_name,
  } = workoutItem;
  return (
    <Card className=" h-[380px] rounded-md " shadow="md" key={workout_name}>
      <CardBody className="overflow-visible p-5 ">
        <Image
          shadow="sm"
          radius="md"
          width="100%"
          alt={workout_name}
          className="w-full object-cover h-[200px] "
          src={workout_cover}
        />
        <div className="mt-5">
          <span className="text-lg font-bold">{workout_name}</span>
          <p className="text-[#666] mt-1">{category}</p>
        </div>
      </CardBody>
      <CardFooter className="absolute bottom-0 z-10 bg-[#1D267D] border-t-1 border-default-600 dark:border-default-100">
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
        <div
          as={button}
          className="bg-slate-300 rounded-xl px-2 text-sm font-bold"
          radius="full"
          size="sm"
        >
          <Link href={`/workouts/${workout_name}`}>Start Now</Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutPlanCard;
