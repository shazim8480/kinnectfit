import { KFButton } from "@/components/UI/KFButton";
import MealPlanDetails from "@/components/dashboard/MealPlan/MealPlanDetails";
import MealCategories from "@/components/dashboard/MealPlan/MealCategories";

import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { setMealValues } from "@/redux/feature/meal/mealSlice";
import { useDispatch } from "react-redux";

const CreateMealPlanPage = () => {
  const dispatch = useDispatch();

  const [formSteps, setFormSteps] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categories: [
        {
          categoryname: "",
          name: "",
          ingredients: [],
          prepTime: "",
          neutrients: {},
          img: "",
        },
      ],
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(setMealValues(data));
    setFormSteps(formSteps + 1);
    reset();
  };
  const prev = () => {
    setFormSteps(formSteps - 1);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {formSteps === 0 && (
          <MealPlanDetails register={register} errors={errors} />
        )}
        {formSteps === 1 && (
          <MealCategories
            register={register}
            Controller={Controller}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            control={control}
          />
        )}

        <div className="text-center flex gap-4 justify-center">
          {formSteps === 1 && (
            <KFButton
              color="secondary"
              size="lg"
              className="mt-4"
              onClick={prev}
            >
              Prev
            </KFButton>
          )}
          {formSteps === 0 && formSteps < 1 && (
            <KFButton
              color="secondary"
              size="lg"
              className="mt-4"
              type="submit"
            >
              Next
            </KFButton>
          )}
          {formSteps === 1 && (
            <KFButton
              color="secondary"
              size="lg"
              className="mt-4"
              type="submit"
            >
              Create MealPlan
            </KFButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateMealPlanPage;

CreateMealPlanPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
