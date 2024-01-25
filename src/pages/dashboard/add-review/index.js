import AddReviewForm from "@/components/Dashboard/AddReview/AddReviewForm";
import { KFButton } from "@/components/UI/KFButton";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useCreateReviewMutation } from "@/redux/feature/review/review-api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddReviewPage = () => {
  // review images
  const [reviewImg, setReviewImg] = useState([]);
  const [mealPlanId, setMealPlanId] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview] = useCreateReviewMutation();
  const { user } = useSelector((state) => state?.user);

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
    const {
      review_type,
      review_name,
      description,
    } = data;
    const review_data = {
      review_information: {
        workout_id: workoutId,
        mealPlan_id: mealPlanId,
        review_info: {
          review_type,
          review_name,
          reviewer_name: user?.name,
          reviewer_id: user?.id,
          description,
          rating,
          review_img: reviewImg,
        },
      },
    };
    console.log("rating", rating);

    // console.log(review_data);
    // return;
    // await createReview(review_data);

    let createReviewResponse = await createReview(review_data);
    // console.log("res", createReviewResponse);
    setWorkoutId("");
    setMealPlanId("");
    setReviewImg([]);
    reset();
    return;
    if (createReviewResponse?.data?.status === 201) {
      router.push("/dashboard/health-summary");
      reset();
    } else if (createReviewResponse?.error) {
      console.log("err msg", createReviewResponse?.error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
