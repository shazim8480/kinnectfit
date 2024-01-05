import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useSelector } from "react-redux";

const HealthSummaryPage = () => {
  const { user } = useSelector((state) => state.user);

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
