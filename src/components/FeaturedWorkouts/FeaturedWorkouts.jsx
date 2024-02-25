import WorkoutCard from "../Workout-Items/WorkoutCard";
import HeadingText from "../UI/HeadingText";
import { KFButton } from "../UI/KFButton";
import Link from "next/link";
import { useGetAllWorkoutsQuery, useGetFeaturedWorkoutsQuery } from "@/redux/feature/workout/workout-api";
import { Card, Skeleton } from "@nextui-org/react";

const FeaturedWorkouts = () => {
  const { data, isLoading } = useGetFeaturedWorkoutsQuery();
  return (
    <section className="pt-8 pb-8 lg:pt-24 lg:pb-16">
      <HeadingText title="Popular Workouts" className="text-center" />
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {isLoading || !data?.data ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="rounded-lg">
              <Card
                className="lg:w-[300px] lg:h-[300px] w-[400px] h-[400px]"
                radius="lg"
              ></Card>
            </Skeleton>
          ))
        ) : (
          data.data.map((workoutItem, index) => (
            <WorkoutCard key={index} workoutItem={workoutItem} />
          ))
        )}
      </div >
      <div className="flex justify-center">
        <KFButton color="secondary" size="lg" className="mt-4">
          <Link href="/workouts">Explore All Workouts</Link>
        </KFButton>
      </div>
    </section >
  );
};

export default FeaturedWorkouts;
