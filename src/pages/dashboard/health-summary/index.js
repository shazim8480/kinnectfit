import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const HealthSummaryPage = () => {
    return (
        <div>
            <h3>This is health summary page.</h3>
        </div>
    );
};

export default HealthSummaryPage;

HealthSummaryPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};