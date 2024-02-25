import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import { useForm } from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  useCreateMealMutation
} from "@/redux/feature/meal/meal-api";
import { useRouter } from "next/router";

import { CldUploadButton, CldImage } from "next-cloudinary";
import { getItemFromLocalStorage } from "@/lib/utils";
import { useGetTrainerByUserQuery } from "@/redux/feature/user/user-api";

const MealCategories = ({ mealPlanLoading, allMealPlansData }) => {
  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');
  const { data: trainerData, isLoading } = useGetTrainerByUserQuery(userData?._id);
  // console.log("🚀 traier\dat", trainerData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [mealPlanCategory, setMealPlanCategory] = useState("");
  const [mealPlanId, setMealPlanId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [createMeal] = useCreateMealMutation();


  const [mealFiles, setMealFiles] = useState([]);
  // console.log("🚀mealFiles:", mealFiles);

  // append upload cover
  const addFile = (newFile) => {
    const updatedFiles = [...mealFiles, newFile];
    setMealFiles(updatedFiles);
  };

  const onSubmit = async (data) => {
    // console.log({...data});
    // return;

    const mealData = {
      data: {
        ...data,
        meal_cover: mealFiles,
        ingredients: items,
        mealPlan: mealPlanId,
        trainer: trainerData?.data?._id,
      }, accessToken
    };
    let createMealResponse = await createMeal(mealData);
    console.log("createMealResponse", createMealResponse);
    // return;
    if (createMealResponse?.data?.statusCode === 200) {
      reset();
      setMealFiles([]);
      router.push("/dashboard/trainer-summary");
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
  // console.log("🚀 mealplan data", allMealPlansData);
  const mealPlanItems = allMealPlansData?.data?.map((mealPlan) => (
    {
      _id: mealPlan?._id,
      label: mealPlan?.mealPlan_name,
      value: mealPlan?.mealPlan_name,
    }
  ));

  // console.log("🚀 mealPlan items", mealPlanItems);

  if (mealPlanLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  // if (isLoading) {
  //   return (
  //     <div className="min-h-[80vh] flex justify-center items-center">
  //       <Spinner />
  //     </div>
  //   );
  // }
  // console.log("mealPlanId", mealPlanId);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xs mx-auto md:max-w-5xl">
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded ">
          <div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 ">
                {/* Meal category */}
                <div className="mt-4">
                  <div className="mb-4 text-sm font-medium text-left">
                    <label htmlFor="meal_name">Meal Category</label>
                  </div>
                  <Select
                    items={categories}
                    label="Select meal category"
                    className="max-w-l"
                    onChange={(selectedCategory) => setMealPlanCategory(selectedCategory.value)}
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
                <div className="mt-4">
                  <div className="mb-4 text-sm font-medium text-left">
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
                    <p className="mt-1 text-left text-red-500">
                      {errors.meal_name.message}
                    </p>
                  )}
                </div>
                {/* Meal name ends */}
              </div>

              {/* Available plan category */}
              <div className="mt-6">
                <div className="mb-4 text-sm font-medium text-left">
                  <label htmlFor="meal_name">Available meal plans</label>
                </div>
                <Select
                  items={mealPlanItems || []}
                  label="Select available category"
                  className="max-w-l"
                  {...register(`mealPlan`, {
                    required: "Please select a meal plan",
                  })}
                >
                  {(category) => (
                    <SelectItem
                      onClick={() => setMealPlanId(category._id)}
                      key={category.value}
                    >
                      {category.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              {/* Available plan category ends */}

              {/* Preparation time */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 ">
                <div className="mt-6">
                  <div className="mb-4 text-sm font-medium text-left">
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
                    <p className="mt-1 text-left text-red-500">
                      {errors.prep_time.message}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <div className="mb-4 text-sm font-medium text-left">
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
                      <KFButton
                        size="sm"
                        color="secondary"
                        className="mt-2"
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
                      {(items.length === 0 && isSubmitted) && (
                        <p className="mt-1 text-left text-red-500">
                          Please add an item
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
              {/* Preparation time ends*/}

              {/* Nutrients */}
              <div className="mt-4">
                <div className="flex justify-between gap-10">
                  <div>
                    <div className="mb-4 text-sm font-medium text-left">
                      <label htmlFor="protein">Protein</label>
                    </div>
                    <KFInput
                      name="protein"
                      size="xl"
                      placeholder="gm"
                      {...register(`protein`, {
                        required: "Please enter protein quantity",
                        pattern: {
                          value: /^(0|[1-9]\d*)$/,
                          message: "Enter protein in number format",
                        },
                      })}
                    />
                    {errors.protein && (
                      <p className="mt-1 text-left text-red-500">
                        {errors.protein.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="mb-4 text-sm font-medium text-left">
                      <label htmlFor="carbs">Carbs</label>
                    </div>{" "}
                    <KFInput
                      name="carbs"
                      size="xl"
                      placeholder="gm"
                      {...register(`carbs`, {
                        required: "Please enter carbs quantity",
                        pattern: {
                          value: /^(0|[1-9]\d*)$/,
                          message: "Enter carbs in number format.",
                        },
                      })}
                    />
                    {errors.carbs && (
                      <p className="mt-1 text-left text-red-500">
                        {errors.carbs.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="mb-4 text-sm font-medium text-left">
                      <label htmlFor="fat">Fat</label>
                    </div>
                    <KFInput
                      name="fat"
                      size="xl"
                      placeholder="gm"
                      {...register(`fat`, {
                        required: "Please enter fat quantity",
                        pattern: {
                          value: /^(0|[1-9]\d*)$/,
                          message: "Enter fat in number format.",
                        },
                      })}
                    />
                    {errors.fat && (
                      <p className="mt-1 text-left text-red-500">
                        {errors.fat.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Nutrients ends*/}

              {/* upload meal image cover */}
              <div className="mt-8 mb-4">
                <label
                  htmlFor="cover-photo"
                  className="block mt-4 text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Cover
                </label>
                <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                  <div className="text-center">
                    <PhotoIcon
                      className="w-12 h-12 mx-auto text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="h-[20px] my-4 text-sm leading-6">
                      <label
                        htmlFor="file_upload"
                        className="font-semibold text-center text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <CldUploadButton
                          onUpload={(results) => {
                            if (results) {
                              const fileList = results?.info?.secure_url;
                              addFile(fileList);
                            }
                          }}
                          uploadPreset="kinnectfit_app"
                        />
                      </label>
                    </div>
                    <p className="relative mb-5 text-xs leading-5 text-gray-600">
                      PNG, JPG up to 10MB
                    </p>
                    {/* show uploaded images */}
                    {mealFiles ? (
                      <div className="relative flex items-center justify-center">
                        {mealFiles?.map((file, i) => {
                          //   console.log("showing file", file);
                          return (
                            <CldImage
                              key={i}
                              className="mr-5"
                              width="180"
                              height="80"
                              src={file}
                              alt="trainer_img"
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              {/* upload meal image cover ends*/}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center gap-4 mt-8 text-center">
            <KFButton color="secondary" size="md" type="submit" onClick={() => setIsSubmitted(true)}>
              Create Meal
            </KFButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealCategories;
