import AddReviewForm from '@/components/Dashboard/AddReview/AddReviewForm';
import { KFButton } from '@/components/UI/KFButton';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { useCreateReviewMutation } from '@/redux/feature/review/review-api';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AddReviewPage = () => {
    const [isMealPlanId, setMealPlanId] = useState("");
    const [isWorkoutId, setWorkoutId] = useState("");
    const { user } = useSelector((state) => state?.user);
    // console.log("Userid", user?.id, "userName", user?.name);
    const [createReview] = useCreateReviewMutation();
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const { upload_photo, upload_video, review_type, review_name, rating, description } = data;
        const img_video = [upload_photo, upload_video];
        const review_data = {
            review_information: {
                workout_id: isWorkoutId,
                mealPlan_id: isMealPlanId,
                review_info: {
                    review_type, review_name, description, rating: rating
                },
                img_video
            }
        };
        console.log(review_data);
        await createReview(review_data);

        // console.log("ReviewsData", { ...restData, img_video, rating, user_id: user?.id, user_name: user?.name });

        return;
        let createWorkoutResponse = await createWorkout(data);
        if (createWorkoutResponse?.data?.status === 201) {
            router.push("/dashboard");
            reset();
        } else if (createWorkoutResponse?.error) {
            console.log("err msg", createWorkoutResponse?.error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AddReviewForm setMealPlanId={setMealPlanId} setWorkoutId={setWorkoutId} setRating={setRating} register={register} errors={errors} />
                <div className='mx-auto text-center'>
                    <KFButton type="submit" color='secondary' size='lg' className='mx-auto mt-1'>Submit Review</KFButton></div>
            </form>
        </div>
    );
};

export default AddReviewPage;

AddReviewPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};