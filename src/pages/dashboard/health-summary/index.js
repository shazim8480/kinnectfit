import WorkoutList from "@/components/dashboard/Workout/WorkoutList";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

const HealthSummaryPage = () => {
  return (
    <>
      <WorkoutList />
    </>
  );
};

export default HealthSummaryPage;

HealthSummaryPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
