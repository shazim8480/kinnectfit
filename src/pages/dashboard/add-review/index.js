import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';

const AddReviewPage = () => {
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