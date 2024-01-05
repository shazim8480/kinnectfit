import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { useGetAllMealPlansQuery } from '@/redux/feature/meal/meal-api';
import { useGetAllWorkoutsQuery } from '@/redux/feature/workout/workout-api';
import React from 'react';

const AddReviewPage = () => {
    const { data } = useGetAllWorkoutsQuery();
    const { data:mealPlanData } = useGetAllMealPlansQuery();
    console.log("mealplan data", mealPlanData);

    // console.log("workouts", data);
    return (
        <div>
            <p>This is add review page</p>
        </div>
    );
};

export default AddReviewPage;


AddReviewPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};