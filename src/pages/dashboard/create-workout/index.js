import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const CreateWorkoutPage = () => {
    return (
        <div>
            <h3>This is create workout page.</h3>
        </div>
    );
};

export default CreateWorkoutPage;

CreateWorkoutPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};