import { KFButton } from "@/components/UI/KFButton";
import MealCategories from "@/components/dashboard/MealPlan/MealCategories";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { setMealValues } from "@/redux/feature/meal/mealSlice";
import { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateMealPlanPage = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  const [formSteps, setFormSteps] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,

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
    const categoryData = {
      ...data,
      categories: data.categories.map((category, index) => ({
        ...category,
        ingredients: items || []
      })),
    };
    console.log(categoryData);
    dispatch(setMealValues(categoryData));
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
        {/* {formSteps === 0 && (
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
        )} */}

        {(
          <MealCategories
            register={register}
            Controller={Controller}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            control={control}
            getValues={getValues}
            reset={reset}
            setValue={setValue}
            watch={watch}
            items={items}
            setItems={setItems}
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
