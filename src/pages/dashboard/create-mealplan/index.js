import { KFButton } from "@/components/UI/KFButton";
import MealCategories from "@/components/dashboard/MealPlan/MealCategories";
import MealPlanDetails from "@/components/dashboard/MealPlan/MealPlanDetails";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const CreateMealPlanPage = () => {
  const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

  } = useForm();
  const onSubmit = (data) => {
    const mealData = { ...data, ingredients: items };
    console.log(mealData);


  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <MealPlanDetails register={register} errors={errors} />
        <MealCategories
          register={register}
          Controller={Controller}
          errors={errors}
          items={items}
          setItems={setItems}
        />
        <div className="text-center flex gap-4 justify-center">
          <KFButton
            color="secondary"
            size="lg"
            className="mt-4"
            type="submit"
          >
            Create MealPlan
          </KFButton>
          {/* )} */}
        </div>
      </form>
    </div>
  );
};

export default CreateMealPlanPage;

CreateMealPlanPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
