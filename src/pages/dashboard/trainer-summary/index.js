import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const TrainerSummaryPage = () => {
    return (
        <div>
            <h3>This is trainer summary page.</h3>
        </div>
    );
};

export default TrainerSummaryPage;

TrainerSummaryPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};