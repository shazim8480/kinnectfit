import MealPlanList from "@/components/Dashboard/MealPlan/MealPlanList";
import WorkoutList from "@/components/Dashboard/Workout/WorkoutList";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

const HealthSummaryPage = () => {
  return (
    <>
      <WorkoutList />
      <MealPlanList />
    </>
  );
};

export default HealthSummaryPage;

HealthSummaryPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
