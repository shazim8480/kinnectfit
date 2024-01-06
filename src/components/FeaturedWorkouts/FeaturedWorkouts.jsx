import WorkoutCard from "../Workout-Items/WorkoutCard";
import { workout_data } from "@/lib/db/workout-data";
import HeadingText from "../UI/HeadingText";
import { KFButton } from "../UI/KFButton";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import Link from "next/link";
import { useGetAllWorkoutsQuery } from "@/redux/feature/workout/workout-api";

const FeaturedWorkouts = () => {
  const { data, isLoading } = useGetAllWorkoutsQuery();
  console.log("workout data", data);

  return (
    <section className="pt-8 pb-8 lg:pt-24 lg:pb-16">
      <HeadingText title="Popular Workouts" className="text-center" />
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {data?.workouts?.map((workoutItem, index) => (
          <WorkoutCard key={index} workoutItem={workoutItem} />
        ))}
      </div>
      <div className="flex justify-center">
        <KFButton color="secondary" size="lg" className="mt-4">
          <Link href="/workouts">
            Explore All Workouts
            {/* <RightArrowIcon /> */}
          </Link>
        </KFButton>
      </div>
    </section>
  );
};

export default FeaturedWorkouts;
