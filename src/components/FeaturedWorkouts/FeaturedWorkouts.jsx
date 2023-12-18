import React from "react";
import WorkoutCard from "../Workout-Items/WorkoutCard";
import { workout_data } from "@/lib/db/workout-data";

const FeaturedWorkouts = () => {
  return (
    <section className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
      {workout_data.map((workoutItem, index) => (
        <WorkoutCard key={index} workoutItem={workoutItem} />
      ))}
    </section>
  );
};

export default FeaturedWorkouts;
