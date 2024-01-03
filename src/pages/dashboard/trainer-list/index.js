import TrainerList from '@/components/Dashboard/Trainer/TrainerList';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const TrainerListPage = () => {
    return (
        <div>
            <TrainerList />
        </div>
    );
};
export default TrainerListPage;
TrainerListPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};