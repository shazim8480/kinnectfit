import React, { useState } from "react";
import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
const CreateWorkout = ({ register, errors }) => {
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const categories = [
    {
      label: "Strength & Conditioning",
      value: "strength & conditioning",
    },
    {
      label: "HIIT",
      value: "hiit",
    },
    {
      label: "YOGA",
      value: "yoga",
    },
    {
      label: "Core Strengthening",
      value: "core strengthening",
    },
  ];
  return (
    <div className="max-w-xs md:max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* starts name & category */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
          {/*starts workout name */}
          <div>
            <div className="text-left mt-4 text-base mb-3">
              <label htmlFor="workoutName">Workout Name</label>
            </div>
            <KFInput
              name="workout_name"
              type="text"
              placeholder="Give a workout name"
              {...register("workout_name", {
                required: "You must need to give a workout name",
              })}
            />
            {errors.workout_name && (
              <p className="text-red-500 text-left mt-1">
                {errors.workout_name.message}
              </p>
            )}
          </div>
          {/*ends workout name */}

          {/*starts workout category */}
          <div>
            <div className="text-left mt-4 text-base mb-3">
              <label>Workout Category</label>
            </div>
            <Select
              items={categories}
              label="Select workout category"
              className="max-w-l"
              {...register("category", {
                required: "Please select workout category",
              })}
            >
              {(category) => (
                <SelectItem onClick={() => setIsCategorySelected(true)} key={category.value}>{category.label}</SelectItem>
              )}
            </Select>
            {(errors.category && !isCategorySelected) && (
              <p className="text-red-500 text-left mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          {/*ends workout category */}
        </div>
        {/* ends name & category */}

        {/* starts time & rating */}
        <div className="grid grid-cols-1  md:gap-10">
          {/*starts workout time */}
          <div>
            <div className="text-left mt-4 text-base mb-3">
              <label htmlFor="workout_time">Workout Time</label>
            </div>
            <KFInput
              name="workout_time"
              size="xl"
              placeholder="Minutes"
              {...register("workout_time", {
                required: "Set workout duration",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Minutes can't be letter.",
                },
              })}
            />
            {errors.workout_time && (
              <p className="text-red-500 text-left mt-1">
                {errors.workout_time.message}
              </p>
            )}
          </div>
          {/*ends workout time */}
        </div>
        {/* ends time & rating */}

        {/*starts workout description */}
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="workoutDescription">Workout Description</label>
          </div>
          <Textarea
            minRows={5}
            name="description"
            placeholder="Enter workout description"
            description="Write a concise description about workout"
            {...register("description", {
              required: "You have to describe about your workout",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-left mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {/*ends workout description */}

        {/*starts workout cover */}
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="workout_cover">Workout Cover</label>
          </div>
          <KFInput
            type="file"
            name="workout_cover"
            placeholder="Upload a workout cover"
          />
        </div>
        {/*ends workout cover */}
      </div>
    </div>
  );
};

export default CreateWorkout;
