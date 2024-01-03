import { KFButton } from "@/components/UI/KFButton";
import MealCategories from "@/components/dashboard/MealPlan/MealCategories";
import MealPlanDetails from "@/components/dashboard/MealPlan/MealPlanDetails";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useCreateMealPlanMutation } from "@/redux/feature/meal/meal-api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const CreateMealPlanPage = () => {
  const router = useRouter();
  const [createMealPlan] = useCreateMealPlanMutation();
  const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

  } = useForm();
  const onSubmit = async (data) => {
    const mealData = { ...data, ingredients: items };
    let createMealResponse = await createMealPlan(mealData);
    if (createMealResponse?.data?.status === 200) {
      reset();
      router.push("/dashboard");
    } else if (createMealResponse?.error) {
      console.log("err msg", createMealResponse?.error);
    }

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
