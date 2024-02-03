import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import MealPlanCard from "../MealPlanCard/MealPlanCard";
import HeadingText from "../UI/HeadingText";
import { KFButton } from "../UI/KFButton";
import Link from "next/link";
import { useGetFeaturedMealPlansQuery } from "@/redux/feature/meal/meal-api";
import { Card, Skeleton } from "@nextui-org/react";

const FeatureMealPlans = () => {
  const { data,isLoading } = useGetFeaturedMealPlansQuery();

  return (
    <section className="py-8 lg:py-16">
      <HeadingText title="Featured Meal Plans" className="text-center" />
      <div className="grid max-w-screen-xl grid-cols-2 gap-4 px-4 py-8 mx-auto place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {isLoading || !data?.data ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="rounded-lg">
              <Card
                className="lg:w-[300px] lg:h-[300px] w-[400px] h-[400px]"
                radius="lg"
              ></Card>
            </Skeleton>
          ))
        ) : (
          data.data.map((mealItem, index) => (
            <MealPlanCard key={index} mealItem={mealItem} />
          ))
        )}
        {/* {data?.data.map((mealItem, index) => (
          <MealPlanCard key={index} mealItem={mealItem} />
        ))} */}
      </div>
      <div className="flex justify-center">
        <KFButton
          type="submit"
          // variant="bordered"
          size="lg"
          className="font-semibold text-blue-800 border-2 border-blue-500 bg-indigo-50"
        >
          <Link href={"meal-plans"}>Find your Plan</Link>
          <RightArrowIcon />
        </KFButton>
      </div>
    </section>
  );
};

export default FeatureMealPlans;
