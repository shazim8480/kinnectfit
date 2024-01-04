import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem, Textarea } from "@nextui-org/react";

const MealPlanDetails = ({ register, errors }) => {
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
    <div className="max-w-xs md:max-w-5xl mx-auto">
      <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        {/* starts name & category */}
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
        {/* ends name & category */}

        {/*starts meal description */}
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="mealPlanDescription">Meal plan description</label>
          </div>
          <Textarea
            minRows={5}
            name="mealPlan_description"
            placeholder="Enter meal plan description"
            description="Write a concise description about meal plan"
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
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="mealPlan_cover_img">Meal plan Cover</label>
          </div>
          <KFInput
            type="file"
            name="mealPlan_cover_img"
            // size="xl"
            placeholder="Upload a meal plan cover"
            {...register("mealPlan_cover_img")}
          />

        </div>
        {/*ends meal cover */}
      </div>
    </div>
  );
};

export default MealPlanDetails;
