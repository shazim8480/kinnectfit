import MainLayout from "@/layouts/mainLayout";
import { mealData } from "@/lib/db/meal-data";
import { workout_data } from "@/lib/db/workout-data";
import MealPlanCard from "@/components/MealPlanCard/MealPlanCard";
import WorkoutCard from "@/components/Workout-Items/WorkoutCard";
import { useSelector } from "react-redux";
import { Slider } from "@nextui-org/react";

const RecommendedPlanPage = () => {
  const formData = useSelector((state) => state.surveyForm);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = i + Math.floor(Math.random() * (array.length - i));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledMealsData = shuffle(mealData);
  const shuffledWorkoutData = shuffle(workout_data);

  const {
    height,
    weight,
    age,
    selectedGender,
    goalWeight,
    country,
    goal,
    plan,
  } = formData;
  const calculateBmi = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi;
  };
  const bmi = calculateBmi(height, weight);
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal weight";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };

  return (
    <>
      <section className="max-w-screen-xl px-4 py-10 mx-auto">
        <div className="grid justify-end grid-cols-1 grid-rows-1 py-10 md:grid-cols-2">
          <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <p className="p-5 text-lg font-medium text-center text-neutral-600">
              Your entries
            </p>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Height
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {height} cm
                    </th>
                    <td className="px-6 py-4">{weight} kg</td>
                    <td className="px-6 py-4">{age} yrs</td>
                    <td className="px-6 py-4">
                      {selectedGender.toUpperCase()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="relative my-3 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Goal Weight
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Selected Workout
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Selected Plan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {goalWeight} kg
                    </th>
                    <td className="px-6 py-4">{goal}</td>
                    <td className="px-6 py-4">{plan} </td>
                    <td className="px-6 py-4">{country}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="p-6">
              <h5 className="my-4 text-xl font-medium leading-tight text-neutral-800">
                Body mass index (BMI)
              </h5>
              <Slider
                label="BMI"
                showTooltip={true}
                step={bmi.toFixed(2)}
                maxValue={50}
                minValue={0}
                defaultValue={bmi.toFixed(2)}
                className="max-w-md"
              />
              <h6 className="my-4 text-lg leading-tight text-neutral-800">
                Your BMI is{" "}
                <span className="font-medium text-blue-800">
                  {bmi.toFixed(2)}
                </span>
              </h6>
              <h6 className="my-4 text-lg leading-tight text-neutral-800">
                BMI Category -
                <span className="font-bold text-red-600">
                  {" "}
                  {getBmiCategory(bmi)}
                </span>
              </h6>
            </div>
          </div>
        </div>

        {shuffledWorkoutData.length !== 0 && (
          <h5 className="mt-8 mb-4 text-xl font-medium leading-tight text-neutral-800">
            Recommended Workout Plans
          </h5>
        )}
        <div className="grid max-w-screen-xl grid-cols-1 gap-6 mx-auto lg:place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">
          {shuffledWorkoutData?.map((item) => {
            return <WorkoutCard key={item.workout_name} workoutItem={item} />;
          })}
        </div>
        {shuffledMealsData.length !== 0 && (
          <h5 className="my-4 text-xl font-medium leading-tight text-neutral-800">
            Recommended Meal Plans
          </h5>
        )}
        <div className="grid max-w-screen-xl grid-cols-2 gap-6 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">
          {shuffledMealsData?.slice(0, 4).map((item) => {
            return <MealPlanCard key={item.name} mealItem={item} />;
          })}
        </div>
      </section>
    </>
  );
};

export default RecommendedPlanPage;

RecommendedPlanPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
