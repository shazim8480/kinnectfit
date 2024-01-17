import React, { useState } from "react";
import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setWorkoutCover } from "@/redux/feature/workout/workoutSlice";

const CreateWorkout = ({ register, errors }) => {
  const dispatch = useDispatch();
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  //   file upload section
  const [files, setFiles] = useState([]);
  // console.log("🚀CreateWorkout ~ files:", files);

  const addFile = (newFile) => {
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    dispatch(setWorkoutCover(updatedFiles));
  };

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
    <div className="max-w-xs mx-auto md:max-w-5xl">
      <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        {/* starts name & category */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
          {/*starts workout name */}
          <div>
            <div className="mt-4 mb-3 text-base text-left">
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
              <p className="mt-1 text-left text-red-500">
                {errors.workout_name.message}
              </p>
            )}
          </div>
          {/*ends workout name */}

          {/*starts workout category */}
          <div>
            <div className="mt-4 mb-3 text-base text-left">
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
                <SelectItem
                  onClick={() => setIsCategorySelected(true)}
                  key={category.value}
                >
                  {category.label}
                </SelectItem>
              )}
            </Select>
            {errors.category && !isCategorySelected && (
              <p className="mt-1 text-left text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
          {/*ends workout category */}
        </div>
        {/* ends name & category */}

        {/* starts time & rating */}
        <div className="grid grid-cols-1 md:gap-10">
          {/*starts workout time */}
          <div>
            <div className="mt-4 mb-3 text-base text-left">
              <label htmlFor="total_workout_time">Workout Time</label>
            </div>
            <KFInput
              name="total_workout_time"
              size="xl"
              placeholder="Minutes"
              {...register("total_workout_time", {
                required: "Set workout duration",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Minutes can't be letter.",
                },
              })}
            />
            {errors.total_workout_time && (
              <p className="mt-1 text-left text-red-500">
                {errors.total_workout_time.message}
              </p>
            )}
          </div>
        </div>

        {/*starts workout description */}
        <div>
          <div className="mt-4 mb-3 text-base text-left">
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
            <p className="mt-1 text-left text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        {/*ends workout description */}

        {/*starts workout cover */}
        {/* Upload Images */}
        <div className="">
          <label
            htmlFor="cover-photo"
            className="block mt-4 text-sm font-medium leading-6 text-gray-900"
          >
            Upload Cover
          </label>
          <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
            <div className="text-center">
              <PhotoIcon
                className="w-12 h-12 mx-auto text-gray-300"
                aria-hidden="true"
              />
              <div className="h-[20px] my-4 text-sm leading-6">
                <label
                  htmlFor="file_upload"
                  className="font-semibold text-center text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <CldUploadButton
                    onUpload={(results) => {
                      if (results) {
                        const fileList = results?.info?.secure_url;
                        addFile(fileList);
                      }
                    }}
                    uploadPreset="kinnectfit_app"
                  />
                </label>
              </div>
              <p className="relative mb-5 text-xs leading-5 text-gray-600">
                PNG, JPG up to 10MB
              </p>
              {/* show uploaded images */}
              {files ? (
                <div className="relative flex items-center justify-center">
                  {files?.map((file, i) => {
                    //   console.log("showing file", file);
                    return (
                      <CldImage
                        key={i}
                        className="mr-5"
                        width="140"
                        height="80"
                        src={file}
                        alt="trainer_img"
                      />
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/*ends workout cover */}
      </div>
    </div>
  );
};

export default CreateWorkout;
