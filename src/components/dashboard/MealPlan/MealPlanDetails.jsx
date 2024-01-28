import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";
import { useCreateMealPlanMutation } from "@/redux/feature/meal/meal-api";
import { useGetTrainerByUserQuery, useUpdateUserMutation } from "@/redux/feature/user/user-api";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Spinner, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { CldUploadButton, CldImage } from "next-cloudinary";
import { getItemFromLocalStorage } from "@/lib/utils";

const MealPlanDetails = ({ refetch }) => {
  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');
  // console.log("Userforls",_id)
  //   file upload section
  const [mealPlanFiles, setMealPlanFiles] = useState([]);
  // console.log("🚀 MealPlanDetails ~ mealPlanFiles:", mealPlanFiles);
  // console.log(user?.id);
  const [createMealPlan] = useCreateMealPlanMutation();
  const { data: trainerData, isLoading } = useGetTrainerByUserQuery(userData?._id);
  // console.log("UserId Trainer data", trainerData);
  const [updateUser] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // append upload cover
  const addFile = (newFile) => {
    const updatedFiles = [...mealPlanFiles, newFile];
    setMealPlanFiles(updatedFiles);
  };

  const onSubmit = async (data) => {
    const mealPlanData = { data: { ...data, mealPlan_cover: mealPlanFiles, trainer: trainerData?.data?._id, }, accessToken };
    // return;
    let createMealPlanResponse = await createMealPlan(mealPlanData);
    // console.log("createMealPlanResponse", createMealPlanResponse);

    if (createMealPlanResponse?.data?.statusCode === 200) {
      // console.log(result);
      refetch();
      reset();
      setMealPlanFiles([]);
    } else if (createMealPlanResponse?.error) {
      alert(createMealPlanResponse?.error?.data?.errorMessages[0].message);
      console.log("err msg", createMealPlanResponse?.error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-xs mx-auto md:max-w-5xl">
        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
            {/*starts meal name */}
            <div className="my-4">
              <div className="mb-4 text-sm font-medium text-left">
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
                <p className="mt-1 text-left text-red-500">
                  {errors.mealPlan_name.message}
                </p>
              )}
            </div>
            {/*ends meal name */}

            {/*starts meal category */}
            <div className="my-4">
              <div className="mb-4 text-sm font-medium text-left">
                <label htmlFor="mealPlan_name">Meal plan category</label>
              </div>
              <KFInput
                name="mealPlan_category"
                type="text"
                placeholder="Give a Meal plan category name"
                {...register("mealPlan_category", {
                  required: "You must need to give a meal plan category name",
                })}
              />
              {errors.mealPlan_category && (
                <p className="mt-1 text-left text-red-500">
                  {errors.mealPlan_category.message}
                </p>
              )}
            </div>
            {/*ends meal category */}

          </div>

          {/*starts meal description */}
          <div className="my-4">
            <div className="mb-4 text-sm font-medium text-left">
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
              <p className="mt-1 text-left text-red-500">
                {errors.mealPlan_description.message}
              </p>
            )}
          </div>
          {/*ends meal description */}

          {/*starts meal cover */}

          {/* Upload Images */}
          <div className="my-4">
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
                {mealPlanFiles ? (
                  <div className="relative flex items-center justify-center">
                    {mealPlanFiles?.map((file, i) => {
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
          {/*ends meal cover */}

          {/* Submit button */}
          <div className="flex justify-center gap-4 mt-8 text-center">
            <KFButton color="secondary" size="md" type="submit">
              Create Meal Plan
            </KFButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MealPlanDetails;
