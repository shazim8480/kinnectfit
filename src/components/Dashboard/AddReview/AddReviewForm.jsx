import React, { useState } from "react";
import {
    Select, SelectItem, Spinner, Textarea, useDisclosure,
} from "@nextui-org/react";
import { useGetAllMealPlansQuery } from '@/redux/feature/meal/meal-api';
import { useGetAllWorkoutsQuery } from '@/redux/feature/workout/workout-api';
import StarRating from "./StarRating";
import { KFButton } from "@/components/UI/KFButton";
import UploadIcon from "@/assets/icons/UploadIcon";
import UploadVideo from "./UploadVideo";
import { PhotoIcon } from "@heroicons/react/24/outline";
import RecordIcon from "@/assets/icons/RecordIcon";

const AddReviewForm = ({ register, errors, setRating, setMealPlanId, setWorkoutId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [reviewType, setReviewType] = useState("");
    const { data, isLoading } = useGetAllWorkoutsQuery();
    const { data: mealPlanData, isLoading: mealPlanLoading } = useGetAllMealPlansQuery();
    // console.log("meal data", mealPlanData);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const workoutCategoryNames = data?.workouts?.map((workout) => ({
        label: workout?.workout_name,
        value: workout?.workout_name,
        workout_id: workout?.workout_id

    }));
    const mealPlanCategoryNames = mealPlanData?.mealPlans?.map((mealPlan) => ({
        label: mealPlan?.mealPlan_name,
        value: mealPlan?.mealPlan_name,
        mealPlan_id: mealPlan?.mealPlan_id
    }));
    // console.log(mealPlanCategoryNames);
    const reviewTypes = [
        {
            label: "Workout",
            value: "workout"
        },
        {
            label: "Meal",
            value: "meal"
        },
    ];
    const handleReviewType = (type) => {
        setIsCategorySelected(true);
        setReviewType(type);
    };
    console.log(reviewType);

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
        <div className="max-w-xs md:max-w-5xl mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">

                    <div>
                        <div className="text-left mt-4 text-base mb-3">
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
                                <SelectItem onClick={() => handleReviewType(category.value)} key={category.value}>{category.label}</SelectItem>
                            )}
                        </Select>
                        {(errors.review_type && !isCategorySelected) && (
                            <p className="text-red-500 text-left mt-1">
                                {errors.review_type.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="text-left mt-4 text-base mb-3">
                            <label> {reviewType === "workout" ? "Select workout" : "Select meal"}</label>
                        </div>
                        <Select
                            // items={workoutCategoryNames}
                            items={reviewType === "workout" ? workoutCategoryNames : mealPlanCategoryNames}
                            placeholder={reviewType === "workout" ? "Select workout" : "Select meal"}
                            className="max-w-l"
                            {...register("review_name", {
                                required: "Please select review category name",
                            })}
                        >
                            {(review_name) => (
                                <SelectItem onClick={reviewType === "workout" ? () => setWorkoutId(review_name?.workout_id) : () => setMealPlanId(review_name?.mealPlan_id)} key={review_name.value}>{review_name.label}</SelectItem>
                            )}
                        </Select>
                        {(errors.review_name && !isCategorySelected) && (
                            <p className="text-red-500 text-left mt-1">
                                {errors.review_name.message}
                            </p>
                        )}
                    </div>
                </div>


                <div>
                    <div className="text-left mt-4 text-base mb-3">
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
                        <p className="text-red-500 text-left mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>


                {/*starts review description */}
                <div className="mt-10 mb-4">
                    <div className="text-left mt-4 text-base">
                        <label htmlFor="workoutDescription">Share your review</label>
                    </div>
                    <div>
                        {/* <div className="text-left mt-4 text-base ">
                            <label>Share your review</label>
                        </div> */}
                        <StarRating setRating={setRating} />
                    </div>
                </div>
                {/*ends review description */}

                <div className="flex flex-wrap justify-center items-center gap-14 ">
                    <div className=" h-[250px] w-[400px]  flex justify-center px-6 py-10 border border-dashed rounded-lg border-gray-900/25">
                        <div>
                            <div className="">
                                <div className="text-center">
                                    <PhotoIcon
                                        className="w-12 h-12 mx-auto text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative font-semibold text-blue-800 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                        >
                                            <span>Upload Photo</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                {...register("upload_photo")}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-left mt-4 text-base mb-3">
                        <label><span className="text-blue-900 font-bold mr-3 text-xl">OR</span></label>
                    </div>
                    <div>
                        {/* <StarRating /> */}
                        <div className="h-[250px] md:w-[400px] w-[300px] bg-[#4B4B4B] flex justify-center items-center rounded-xl"
                            {...register("upload_video")}
                        >
                            <div className="flex flex-col">
                                <span className="text-[#FFFFFF] text-center font-medium text-lg">Create a video review</span>
                                <KFButton onPress={onOpen} startContent={<RecordIcon className="text-white" />} className="mt-3 bg-[#F5D3D4] text-[#962529] font-semibold ">Record Now</KFButton>
                                <KFButton onPress={onOpen} startContent={<UploadIcon className="text-white" />} className="mt-3 bg-[#008020] text-[#FFFFFF] font-semibold ">Upload video</KFButton>
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
