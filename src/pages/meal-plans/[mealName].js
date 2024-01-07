import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { mealData } from "@/lib/db/meal-data";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import cn from "@/lib/utils";
import { useSubmitMealPlanMutation } from "@/redux/feature/meal/meal-api";
import { useSelector } from "react-redux";

function MealDetailsPage() {
  const { user } = useSelector((state) => state.user);
  const [submitMealPlan] = useSubmitMealPlanMutation();
  const [selectedMeals, setSelectedMeals] = useState([]);
  console.log(selectedMeals);

  const router = useRouter();
  const { mealName } = router.query;
  const meal_details = mealData.find((w) => w.name === mealName);

  const handleMealSelect = (categoryName, mealName) => {
    const isSelected = selectedMeals.some(
      (meal) => meal.categoryName === categoryName && meal.mealName === mealName
    );

    if (isSelected) {
      // If the meal is already selected, remove it from the selection
      setSelectedMeals((prevSelected) =>
        prevSelected.filter(
          (meal) =>
            !(meal.categoryName === categoryName && meal.mealName === mealName)
        )
      );
    } else {
      // If the meal is not selected, add it to the selection
      setSelectedMeals((prevSelected) => [
        ...prevSelected,
        { categoryName, mealName },
      ]);
    }
  };
  const isSubmitDisabled = selectedMeals.length === 0;

  const handleMealPlan = async () => {
    const data = {
      data: selectedMeals,
      userId: user?.id,
    };
    let submitMealPlanResponse = await submitMealPlan(data);
    if (submitMealPlanResponse?.data?.status) {
      router.push("/");
    } else if (submitMealPlanResponse?.error) {
      console.log("err msg", submitMealPlanResponse?.error);
    }
  };

  return (
    <section className="grid max-w-screen-xl grid-cols-1 grid-rows-1 py-10 mx-auto md:grid-cols-1">
      <div className="flex justify-center  h-[100vh] relative">
        <Image
          removewrapper
          alt="meal_cover"
          src={meal_details?.cover_img ? meal_details?.cover_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          className="absolute"
          layout="fill"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="block bg-white rounded-lg ">
        <div>
          <h5 className="pl-5 my-3 text-xl font-medium leading-tight text-neutral-800">
            {meal_details?.name}
          </h5>
          <p className="pl-5 mb-4 text-base text-neutral-600">
            {meal_details?.description}
          </p>
        </div>
      </div>

      <div className="block">
        <div className="p-6">
          <div className="mb-4 text-base text-neutral-600 bg-green-60">
            {meal_details?.categories.map((category) => {
              return (
                <div className="py-6 text-base text-black" key={category?.name}>
                  <div>
                    <p className="flex justify-between mb-4 text-xl font-semibold">
                      {category?.name}
                    </p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {category?.meals.map((meal) => (
                        <div
                          key={meal?.name}
                          className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMeals.some(
                            (selectedMeal) =>
                              selectedMeal.categoryName === category.name &&
                              selectedMeal.mealName === meal.name
                          )
                            ? "border-2 border-blue-800" // Apply border to selected meals
                            : ""
                            }`}
                          onClick={() =>
                            handleMealSelect(category.name, meal.name)
                          }
                        >
                          <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                            <div className="flex justify-between">
                              <span className="text-base font-medium">
                                {meal?.name}
                              </span>
                            </div>
                            <div className="flex justify-between ">
                              <div>
                                <p className="leading-normal text-neutral-800">
                                  <span>Protein:</span>{" "}
                                  {meal?.nutrients?.protein}
                                </p>
                                <p className="leading-normal text-neutral-800">
                                  <span>Carbs:</span> {meal?.nutrients?.carbs}
                                </p>
                                <p className="leading-normal text-neutral-800">
                                  <span>Fat:</span> {meal?.nutrients?.fat}
                                </p>
                              </div>
                            </div>
                            <span className="leading-normal text-neutral-800">
                              Prepare time: {meal?.prep_time} minutes
                            </span>
                          </div>

                          <div className="relative w-40 h-40">
                            <Image
                              src={meal?.img ? meal?.img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                              alt="meal-img"
                              layout="fill"
                              className="absolute object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* submit     */}
      <div className="text-center">
        <KFButton
          type="submit"
          onClick={handleMealPlan}
          size="lg"
          color="secondary"
          className={cn(``, {
            "opacity-60": isSubmitDisabled,
          })}
          disabled={isSubmitDisabled}
        >
          Confirm Meal Submission
        </KFButton>
      </div>
    </section>
  );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
