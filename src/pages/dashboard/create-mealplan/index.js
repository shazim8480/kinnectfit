import MealPlanDetails from "@/components/dashboard/MealPlan/MealPlanDetails";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";
import { useForm } from "react-hook-form";

const CreateMealPlanPage = () => {

  const {
    formState: { errors },
  } = useForm();
  const { data: allMealPlansData, isLoading: mealPlanLoading, refetch } = useGetAllMealPlansQuery({ searchTerm: "" });

  return (
    <div>
      <MealPlanDetails refetch={refetch} />
      {/* <MealCategories allMealPlansData={allMealPlansData} mealPlanLoading={mealPlanLoading} /> */}
    </div>
  );
};

export default CreateMealPlanPage;

CreateMealPlanPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
