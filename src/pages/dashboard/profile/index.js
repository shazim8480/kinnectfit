import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React from 'react';
const ProfilePage = () => {
    return (
        <div>
            <h3>This is profile page.</h3>
        </div>
    );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};