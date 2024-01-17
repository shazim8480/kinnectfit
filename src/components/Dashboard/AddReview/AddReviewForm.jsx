import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";
import { useGetAllWorkoutsQuery } from "@/redux/feature/workout/workout-api";
import StarRating from "./StarRating";
import { KFButton } from "@/components/UI/KFButton";
import UploadIcon from "@/assets/icons/UploadIcon";
import UploadVideo from "./UploadVideo";
import { PhotoIcon } from "@heroicons/react/24/outline";
import RecordIcon from "@/assets/icons/RecordIcon";

import { CldUploadButton, CldImage } from "next-cloudinary";

const AddReviewForm = ({
  register,
  errors,
  setRating,
  setMealPlanId,
  setWorkoutId,
  reviewImg,
  setReviewImg
}) => {
  // review images
  console.log("🚀 ~ file: AddReviewForm.jsx:27 ~ reviewImg:", reviewImg);

  // append upload cover
  const addFile = (newFile) => {
    const updatedFiles = [...reviewImg, newFile];
    setReviewImg(updatedFiles);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reviewType, setReviewType] = useState("");
  const {
    data,
    isLoading,
    refetch: workoutsRefetch,
  } = useGetAllWorkoutsQuery();
  const {
    data: mealPlanData,
    isLoading: mealPlanLoading,
    refetch: mealPlansRefetch,
  } = useGetAllMealPlansQuery();

  useEffect(() => {
    if (data !== undefined) {
      workoutsRefetch();
    }
    if (mealPlanData !== undefined) {
      mealPlansRefetch();
    }
  }, [data, mealPlanData]);

  // console.log("meal data", mealPlanData);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const workoutCategoryNames = data?.workouts?.map((workout) => ({
    label: workout?.workout_name,
    value: workout?.workout_name,
    workout_id: workout?.workout_id,
  }));
  const mealPlanCategoryNames = mealPlanData?.mealPlans?.map((mealPlan) => ({
    label: mealPlan?.mealPlan_name,
    value: mealPlan?.mealPlan_name,
    mealPlan_id: mealPlan?.mealPlan_id,
  }));
  // console.log(mealPlanCategoryNames);
  const reviewTypes = [
    {
      label: "Workout",
      value: "workout",
    },
    {
      label: "Meal",
      value: "meal",
    },
    {
      label: "App",
      value: "app",
    },
  ];
  const handleReviewType = (type) => {
    setIsCategorySelected(true);
    setReviewType(type);
  };
  // console.log(reviewType);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (mealPlanLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  // console.log("mealplanId", isMealPlanId);
  // console.log("workoutId", isWorkoutId);
  return (
    <div className="max-w-xs mx-auto md:max-w-5xl">
      <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
          <div>
            <div className="mt-4 mb-3 text-base text-left">
              <label>Select review type</label>
            </div>
            <Select
              items={reviewTypes}
              // label="Choose"
              placeholder="Select review type"
              className="max-w-l"
              {...register("review_type", {
                required: "Please select review type",
              })}
            >
              {(category) => (
                <SelectItem
                  onClick={() => handleReviewType(category.value)}
                  key={category.value}
                >
                  {category.label}
                </SelectItem>
              )}
            </Select>
            {errors.review_type && !isCategorySelected && (
              <p className="mt-1 text-left text-red-500">
                {errors.review_type.message}
              </p>
            )}
          </div>

          {
            reviewType !== 'app' && <div>
              <div className="mt-4 mb-3 text-base text-left">
                <label>
                  {" "}
                  {reviewType === "workout" ? "Select workout" : "Select meal"}
                </label>
              </div>
              <Select
                // items={workoutCategoryNames}
                items={
                  reviewType === "workout"
                    ? workoutCategoryNames
                    : mealPlanCategoryNames
                }
                placeholder={
                  reviewType === "workout" ? "Select workout" : "Select meal"
                }
                className="max-w-l"
                {...register("review_name", {
                  required: "Please select review category name",
                })}
              >
                {(review_name) => (
                  <SelectItem
                    onClick={
                      reviewType === "workout"
                        ? () => setWorkoutId(review_name?.workout_id)
                        : () => setMealPlanId(review_name?.mealPlan_id)
                    }
                    key={review_name.value}
                  >
                    {review_name.label}
                  </SelectItem>
                )}
              </Select>
              {errors.review_name && !isCategorySelected && (
                <p className="mt-1 text-left text-red-500">
                  {errors.review_name.message}
                </p>
              )}
            </div>
          }

        </div>

        <div>
          <div className="mt-4 mb-3 text-base text-left">
            <label htmlFor="workoutDescription">Review Description</label>
          </div>
          <Textarea
            minRows={5}
            name="description"
            placeholder="Describe your review"
            {...register("description", {
              required: "You have to describe your review",
            })}
          />
          {errors.description && (
            <p className="mt-1 text-left text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/*starts review description */}
        <div className="mt-10 mb-4">
          <div className="mt-4 text-base text-left">
            <label htmlFor="workoutDescription">Share your review</label>
          </div>
          <div>
            <StarRating setRating={setRating} />
          </div>
        </div>
        {/*ends review description */}

        <div className="flex items-center justify-center gap-14 ">
          <div className=" h-[320px] w-[400px]  flex justify-center px-6 py-6 border border-dashed rounded-lg border-gray-900/25">
            <div className="">
              {/* <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25"> */}
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
                {reviewImg ? (
                  <div className="relative flex items-center justify-center">
                    {reviewImg?.map((file, i) => {
                      //   console.log("showing file", file);
                      return (
                        <CldImage
                          key={i}
                          className="mr-5 w-[140px] h-[60px]"
                          width="120"
                          height="40"
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
              {/* </div> */}
            </div>
          </div>
          <div className="mt-4 mb-3 text-base text-left">
            <label>
              <span className="mr-3 text-xl font-bold text-blue-900">OR</span>
            </label>
          </div>
          <div>
            {/* <StarRating /> */}
            <div
              className="h-[250px] w-[400px] bg-[#4B4B4B] flex justify-center items-center rounded-xl"
              {...register("upload_video")}
            >
              <div className="flex flex-col">
                <span className="text-[#FFFFFF] text-center font-medium text-lg">
                  Create a video review
                </span>
                <KFButton
                  onPress={onOpen}
                  startContent={<RecordIcon className="text-white" />}
                  className="mt-3 bg-[#F5D3D4] text-[#962529] font-semibold "
                >
                  Record Now
                </KFButton>
                <KFButton
                  onPress={onOpen}
                  startContent={<UploadIcon className="text-white" />}
                  className="mt-3 bg-[#008020] text-[#FFFFFF] font-semibold "
                >
                  Upload video
                </KFButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UploadVideo isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default AddReviewForm;
