import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';

const TrainerListPage = () => {
    return (
        <div>
            <p>This is trainer list page</p>
        </div>
    );
};

export default TrainerListPage;


TrainerListPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};