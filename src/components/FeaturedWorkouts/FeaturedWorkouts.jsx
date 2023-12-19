import React from "react";
import WorkoutCard from "../Workout-Items/WorkoutCard";
import { workout_data } from "@/lib/db/workout-data";
import HeadingText from "../UI/HeadingText";
import { KFButton } from "../UI/KFButton";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";

const FeaturedWorkouts = () => {
  return (
    <section className="py-8 lg:py-16">
      <HeadingText title="Popular Workouts" className="text-center" />
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {workout_data.map((workoutItem, index) => (
          <WorkoutCard key={index} workoutItem={workoutItem} />
        ))}
      </div>
      <div className="flex justify-center">
        <KFButton type="submit" color="secondary" size="lg" className="mt-4">
          Explore All Workouts
          {/* <RightArrowIcon /> */}
        </KFButton>
      </div>
    </section>
  );
};

export default FeaturedWorkouts;
