import AddReviewForm from '@/components/Dashboard/AddReview/AddReviewForm';
import { KFButton } from '@/components/UI/KFButton';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddReviewPage = () => {
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(rating, data);
        // console.log(data);
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
                <AddReviewForm setRating={setRating} register={register} errors={errors} />
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