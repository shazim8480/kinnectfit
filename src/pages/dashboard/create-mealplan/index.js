import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const CreateMealPlanPage = () => {
    return (
        <div>
            <h3>This is create meal plan page.</h3>
        </div>
    );
};

export default CreateMealPlanPage;

CreateMealPlanPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};