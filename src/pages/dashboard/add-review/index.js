import AddReviewForm from "@/components/Dashboard/AddReview/AddReviewForm";
import { KFButton } from "@/components/UI/KFButton";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { getItemFromLocalStorage } from "@/lib/utils";
import { useCreateReviewMutation } from "@/redux/feature/review/review-api";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddReviewPage = () => {
  const router = useRouter();
  const [reviewImg, setReviewImg] = useState([]);
  const [mealPlanId, setMealPlanId] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview] = useCreateReviewMutation();

  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');

  // review videos
  // const [reviewVideo, setReviewVideo] = useState([]);

  // console.log("Userid", user?.id, "userName", user?.name);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("reviewData", data);
    const { review_type,
      review_item_name,
      review_description } = data;
    const review_data = {
      data: {
        review_type,
        review_item_name,
        review_description,
        rating,
        review_cover: reviewImg,
        ...(workoutId ? { workout: workoutId } : {}),
        ...(mealPlanId ? { mealPlan: mealPlanId } : {}),
        user: userData?._id
      },
      accessToken
    };
    console.log("review_data", review_data);
    // return;

    let createReviewResponse = await createReview(review_data);
    console.log("res", createReviewResponse);

    // reset();
    // return;
    if (createReviewResponse?.data?.statusCode === 200) {
      router.push("/dashboard/health-summary");
      setWorkoutId("");
      setMealPlanId("");
      setReviewImg([]);
      reset();
    } else if (createReviewResponse?.error) {
      console.log("err msg", createReviewResponse?.error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <p>Hello</p> */}
        <AddReviewForm
          reviewImg={reviewImg}
          setReviewImg={setReviewImg}
          setMealPlanId={setMealPlanId}
          setWorkoutId={setWorkoutId}
          setRating={setRating}
          register={register}
          errors={errors}
        />
        <div className="mx-auto text-center">
          <KFButton
            type="submit"
            color="secondary"
            size="lg"
            className="mx-auto mt-1"
          >
            Submit Review
          </KFButton>
        </div>
      </form>
    </div>
  );
};

export default AddReviewPage;

AddReviewPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
