import MealPlanCard from "../MealPlanCard/MealPlanCard";
import HeadingText from "../UI/HeadingText";
import { KFButton } from "../UI/KFButton";
import { mealData } from "@/lib/db/meal-data";

const FeatureMealPlans = () => {
  return (
    <section className="py-8 lg:py-16">
      <HeadingText title="Featured Meal Plans" className="text-center" />
      <div className="grid max-w-screen-xl px-4 py-6 mx-auto gap-4 lg:gap-8 xl:gap-8 lg:py-6 lg:grid-cols-4">
        {mealData.slice(0, 4).map((mealItem, index) => (
          <MealPlanCard key={index} mealItem={mealItem} />
        ))}
      </div>
      <div className="flex justify-center">
        <KFButton
          type="submit"
          color="primary"
          variant="shadow"
          className="my-4"
        >
          Explore more
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </KFButton>
      </div>
    </section>
  );
};

export default FeatureMealPlans;
