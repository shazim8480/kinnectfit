import DropdownUser from "@/components/dashboard/Header/DropdownUser";
import React from "react";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";
import Header from "@/components/dashboard/Header";
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
