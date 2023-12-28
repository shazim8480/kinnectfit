import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { mealData } from "@/lib/db/meal-data";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import cn from "@/lib/utils";

function MealDetailsPage() {
    const [selectedMeals, setSelectedMeals] = useState([]);
    console.log(selectedMeals);

    const router = useRouter();
    const { mealName } = router.query;
    const meal_details = mealData.find(
        (w) => w.name === mealName
    );

    const handleMealSelect = (categoryName, mealName) => {
        const isSelected = selectedMeals.some(
            (meal) => meal.categoryName === categoryName && meal.mealName === mealName
        );

        if (isSelected) {
            // If the meal is already selected, remove it from the selection
            setSelectedMeals((prevSelected) =>
                prevSelected.filter(
                    (meal) => !(meal.categoryName === categoryName && meal.mealName === mealName)
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

    return (
        <section className="grid max-w-screen-xl mx-auto grid-cols-1 grid-rows-1 md:grid-cols-1 py-10">
            <div className="flex justify-center  h-[100vh] relative">
                <Image
                    removewrapper
                    alt="meal_cover"
                    src={meal_details?.cover_img}
                    className="absolute"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div className="block rounded-lg bg-white ">
                <div>
                    <h5 className="my-3 pl-5 text-xl font-medium leading-tight text-neutral-800">
                        {meal_details?.name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 pl-5">
                        {meal_details?.description}
                    </p>
                </div>
            </div>

            <div className="block">
                <div className="p-6">
                    <div className="mb-4 text-base text-neutral-600  bg-green-60">
                        {meal_details?.categories.map((category) => {
                            return (
                                <div className="text-base text-black py-6" key={category?.name}>
                                    <div>
                                        <p className="flex justify-between mb-4 font-semibold  text-xl">
                                            {category?.name}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                                            {
                                                category?.meals.map((meal) => (
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
                                                        onClick={() => handleMealSelect(category.name, meal.name)}
                                                    >
                                                        {/* <div className="flex flex-row justify-between mt-4 bg-green-600"> */}
                                                        <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                                                            <div className="flex justify-between">
                                                                <span className="text-base font-medium">{meal?.name}</span>
                                                            </div>
                                                            <div className="flex justify-between ">
                                                                <div>
                                                                    <p className="text-neutral-800 leading-normal">
                                                                        <span>Protein:</span> {meal?.nutrients?.protein}
                                                                    </p>
                                                                    <p className="text-neutral-800 leading-normal">
                                                                        <span>Carbs:</span> {meal?.nutrients?.carbs}
                                                                    </p>
                                                                    <p className="text-neutral-800 leading-normal">
                                                                        <span>Fat:</span> {meal?.nutrients?.fat}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="text-neutral-800 leading-normal">Prepare time: {meal?.prep_time} minutes</span>
                                                        </div>

                                                        <div className="w-40 h-40 relative">
                                                            <Image src={meal?.img} alt="meal-img" layout="fill" className="absolute object-cover" />
                                                        </div>
                                                    </div>
                                                    // </div>
                                                ))
                                            }
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
                    onClick={() => console.log("I am clickable")
                    }
                    size="lg"
                    color="secondary"
                    // className="opacity-60"
                    // className=" text-blue-800  bg-indigo-50 "
                    className={cn(``, {
                        "opacity-60": isSubmitDisabled,
                    })}
                    disabled={isSubmitDisabled}
                >
                    Submit
                </KFButton>
            </div>
        </section >
    );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};