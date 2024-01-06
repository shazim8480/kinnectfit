import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useCreateMealMutation, useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/redux/feature/user/user-api";

const MealCategories = () => {
  const { user } = useSelector((state) => state?.user);
  // console.log("useeeeeerid", user?.id);
  const [items, setItems] = useState([]);
  const [isMealPlanId, setMealPlanId] = useState("");
  // console.log({ isMealPlanId });
  const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createMeal] = useCreateMealMutation();
  const { data, isLoading } = useGetAllMealPlansQuery();
  const [updateUser] = useUpdateUserMutation();
  const mealPlanCategoryNames = data?.mealPlans?.map((mealPlan) => ({
    label: mealPlan?.mealPlan_name,
    value: mealPlan?.mealPlan_name,
    mealPlan_id: mealPlan?.mealPlan_id
  }));

  const onSubmit = async (data) => {
    // console.log(data);
    // return;
    const mealData = { ...data, ingredients: items, mealPlan_id: isMealPlanId, trainer_id: user?.id };
    const updateUserInfo = {
      data: {
        meal_id: mealData
      },
      userId: user?.id
    };
    let createMealResponse = await createMeal(mealData);
    if (createMealResponse?.data?.status === 201) {
      const result = await updateUser(updateUserInfo);
      console.log(result);
      // reset();
    } else if (createMealResponse?.error) {
      console.log("err msg", createMealResponse?.error);
    }
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const categories = [
    {
      label: "Breakfast",
      value: "Breakfast",
    },
    {
      label: "Lunch",
      value: "Lunch",
    },
    {
      label: "Dinner",
      value: "Dinner",
    },
    {
      label: "Snacks",
      value: "Snacks",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xs md:max-w-5xl mx-auto">
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 ">
          <div>
            <div >
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 ">
                {/* Meal category */}
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="meal_name">Meal Category</label>
                  </div>
                  <Select
                    items={categories}
                    label="Select meal category"
                    className="max-w-l"
                    {...register(`meal_category`, {
                      required: "Please select meal category",
                    })}
                  >
                    {(category) => (
                      <SelectItem key={category.value}>
                        {category.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                {/* Meal category ends*/}

                {/* Meal name */}
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="meal_name">Meal Name</label>
                  </div>
                  <KFInput
                    name="meal_name"
                    type="text"
                    placeholder="Give a meal name "
                    {...register(`meal_name`, {
                      required: "You must need to give a meal name",
                    })}
                  />
                  {errors.meal_name && (
                    <p className="text-red-500 text-left mt-1">
                      {errors.meal_name.message}
                    </p>
                  )}
                </div>
                {/* Meal name ends */}
              </div>

              {/* Available plan category */}
              <div>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="meal_name">Available meal plans</label>
                </div>
                <Select
                  items={mealPlanCategoryNames}
                  label="Select available category"
                  className="max-w-l"
                  {...register(`available_category`, {
                    required: "Please select available plan",
                  })}
                >
                  {(category) => (
                    <SelectItem onClick={() => setMealPlanId(category.mealPlan_id)} key={category.value}>
                      {category.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              {/* Available plan category ends */}

              {/* Preparation time */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="prep_time">Preparation Time</label>
                  </div>
                  <KFInput
                    name="prep_time"
                    size="xl"
                    placeholder="Minutes"
                    {...register(`prep_time`, {
                      required: "Set prep Time duration",
                      pattern: {
                        value: /^(0|[1-9]\d*)$/,
                        message: "Type in Minutes format.",
                      },
                    })}
                  />
                  {errors.prep_time && (
                    <p className="text-red-500 text-left mt-1">
                      {errors.prep_time.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="ingredients">Ingredients</label>
                  </div>
                  <div>
                    <KFInput
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter a new item"
                    />
                    <div className="flex items-center gap-2">
                      <KFButton size="sm" color="secondary" className="mt-2"
                        onClick={handleAddItem}
                      >
                        Add Item
                      </KFButton>
                      <div className="mt-2 overflow-auto">
                        {/* Display added items */}
                        {items.map((item, index) => (
                          <span key={index} className="mr-2">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Preparation time ends*/}

              {/* Nutrients */}
              <div>

                <div className="flex justify-between gap-10">
                  <div>
                    <div className="text-left mt-4 text-base mb-3">
                      <label htmlFor="protein">Protein</label>
                    </div>
                    <KFInput
                      name="protein"
                      size="xl"
                      placeholder="gm"
                      {...register(`protein`)}
                    />
                  </div>
                  <div>
                    <div className="text-left mt-4 text-base mb-3">
                      <label htmlFor="protein">Carbs</label>
                    </div>  <KFInput
                      name="carbs"
                      size="xl"
                      placeholder="gm"
                      {...register(`carbs`)}
                    />
                  </div>

                  <div>
                    <div className="text-left mt-4 text-base mb-3">
                      <label htmlFor="protein">Fat</label>
                    </div>
                    <KFInput
                      name="fat"
                      size="xl"
                      placeholder="gm"
                      {...register(`fat`)}
                    />
                  </div>


                </div>
              </div>
              {/* Nutrients ends*/}

              {/* upload meal image cover */}
              <div className="text-left mt-8 text-base mb-3">
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
                          {...register(`meal_img`)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* upload meal image cover ends*/}

            </div>
          </div>

          {/* Submit button */}
          <div className="text-center flex gap-4 justify-center mt-8">
            <KFButton
              color="secondary"
              size="lg"
              type="submit"
            >
              Create Meal
            </KFButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealCategories;
