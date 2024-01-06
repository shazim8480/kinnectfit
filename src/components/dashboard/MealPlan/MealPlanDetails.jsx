import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";
import { useCreateMealPlanMutation } from "@/redux/feature/meal/meal-api";
import { useUpdateUserMutation } from "@/redux/feature/user/user-api";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const MealPlanDetails = () => {
  const { user } = useSelector((state) => state?.user);
  // console.log(user?.id);
  const [createMealPlan] = useCreateMealPlanMutation();
  const [updateUser] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    // return;
    // const mealData = { ...data, ingredients: items };
    // console.log(object)
    let createMealPlanResponse = await createMealPlan({ data, trainer_id: user?.id });
    console.log("createMealPlanResponse", createMealPlanResponse);
    const updateUserInfo = {
      data: {
        mealPlan_id: data
      },
      userId: user?.id
    };
    // console.log("mealplan-response", createMealPlanResponse?.data?.status);
    // console.log("updateuserinfo", updateUserInfo);
    // return;
    if (createMealPlanResponse?.data?.status === 201) {
      const result = await updateUser(updateUserInfo);
      console.log(result);
      // reset();
    } else if (createMealPlanResponse?.error) {
      console.log("err msg", createMealPlanResponse?.error);
    }
  };
  const categories = [
    {
      label: "Dietary Goals",
      value: "Dietary Goals",
    },
    {
      label: "Dietary Restrictions",
      value: "Dietary Restrictions",
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xs md:max-w-5xl mx-auto">
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            {/*starts meal name */}
            <div>
              <div className="text-left mt-4 text-base mb-3">
                <label htmlFor="mealPlan_name">Meal plan name</label>
              </div>
              <KFInput
                name="mealPlan_name"
                type="text"
                placeholder="Give a Meal plan name"
                {...register("mealPlan_name", {
                  required: "You must need to give a meal plan name",
                })}
              />
              {errors.mealPlan_name && (
                <p className="text-red-500 text-left mt-1">
                  {errors.mealPlan_name.message}
                </p>
              )}
            </div>
            {/*ends meal name */}

            {/*starts meal category */}
            <div>
              <div className="text-left mt-4 text-base mb-3">
                <label>Meal plan category</label>
              </div>
              <Select
                items={categories}
                label="Select meal plan category"
                className="max-w-l"
                {...register("mealPlan_category", {
                  required: "Please select meal plan category",
                })}
              >
                {(category) => (
                  <SelectItem key={category.value}>{category.label}</SelectItem>
                )}
              </Select>
              {errors.category && (
                <p className="text-red-500 text-left mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/*ends meal category */}
          </div>

          {/*starts meal description */}
          <div>
            <div className="text-left mt-4 text-base mb-3">
              <label htmlFor="mealPlanDescription">Meal plan description</label>
            </div>
            <Textarea
              minRows={5}
              name="mealPlan_description"
              placeholder="Enter meal plan description"
              {...register("mealPlan_description", {
                required: "You have to describe about your meal plan",
              })}
            />
            {errors.mealPlan_description && (
              <p className="text-red-500 text-left mt-1">
                {errors.mealPlan_description.message}
              </p>
            )}
          </div>
          {/*ends meal description */}

          {/*starts meal cover */}
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="img">Meal Image Cover</label>
          </div>
          <div className="  flex justify-center px-6 py-10 border border-dashed rounded-lg border-gray-900/25">
            <div>
              <div className="text-center">
                <PhotoIcon
                  className="w-12 h-12 mx-auto text-gray-300"
                  aria-hidden="true"
                />
                <div className="flex mt-4 text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative font-semibold text-blue-800 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload Photo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      {...register("mealPlan_cover_img")}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/*ends meal cover */}

          {/* Submit button */}
          <div className="text-center flex gap-4 justify-center mt-8">
            <KFButton
              color="secondary"
              size="lg"
              type="submit"
            >
              Create Meal Plan
            </KFButton>
          </div>

        </div>
      </div >
    </form>

  );
};

export default MealPlanDetails;
