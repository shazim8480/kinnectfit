import React, { useEffect } from "react";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

const DashboardPage = () => {

  return (
    <div>
      <h3>This is dashboard page</h3>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
