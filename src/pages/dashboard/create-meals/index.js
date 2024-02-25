import MealCategories from "@/components/dashboard/MealPlan/MealCategories";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";
import { useForm } from "react-hook-form";

const CreateMealPage = () => {

    const {
        formState: { errors },
    } = useForm();
    const { data: allMealPlansData, isLoading: mealPlanLoading, refetch } = useGetAllMealPlansQuery({ searchTerm: "" });

    return (
        <div>
            <MealCategories allMealPlansData={allMealPlansData} mealPlanLoading={mealPlanLoading} />
        </div>
    );
};

export default CreateMealPage;

CreateMealPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
