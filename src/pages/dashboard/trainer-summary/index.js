import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import TrainerWorkouts from "@/components/Dashboard/Workout/TrainerWorkouts";
import TrainerMealPlans from "@/components/Dashboard/Trainer/TrainerMealPlans";
import TrainerMeals from "@/components/Dashboard/Trainer/TrainerMeals";

const TrainerSummaryPage = () => {

    return (
        <>
            <TrainerWorkouts />
            <TrainerMealPlans />
            <TrainerMeals />
        </>
    );
};

export default TrainerSummaryPage;

TrainerSummaryPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};