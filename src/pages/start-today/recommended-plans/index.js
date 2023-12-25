import { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { mealData } from "@/lib/db/meal-data";
import RecommendedPlanCard from "@/components/StartToday/RecommendedPlan/RecommendedPlanCard";
import WorkoutPlanCard from "@/components/StartToday/WorkoutPlan/WorkoutPlanCard";
import { workout_data } from "@/lib/db/workout-data";

const RecommendedPlanPage = () => {
    const [searchMealPlan, setSearchMealPlan] = useState('');
    const handleInputSearch = (e) => {
        const { name, value } = e.target;
        setSearchMealPlan(value);
    };

    const filteredProducts = mealData?.filter((item) => {
        const searchMatch = item?.name
            .toLowerCase()
            .includes(searchMealPlan.toLowerCase());
        return searchMatch;
    });
    const filteredWorkoutData = workout_data?.filter((item) => {
        const searchMatch = item?.workout_name
            .toLowerCase()
            .includes(searchMealPlan.toLowerCase());
        return searchMatch;
    });

    return (
        <>
            <section className="max-w-screen-xl mx-auto py-10 px-4">
                <KFInput
                    id="search"
                    name="search"
                    isRequired
                    variant="bordered"
                    placeholder="Search Here ..."
                    value={searchMealPlan}
                    onChange={handleInputSearch}
                    type="text"
                    className="mb-4 md:w-1/2 w-full"
                />
                <hr></hr>
                <hr className="mt-5" />
                <h5 className="mt-8 mb-4 text-xl font-medium leading-tight text-neutral-800">
                    Workout Plans
                </h5>
                <div className="grid max-w-screen-xl grid-cols-1 gap-6  mx-auto lg:place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">
                    {filteredWorkoutData?.map((item) => {
                        return <WorkoutPlanCard key={item.workout_name} workoutItem={item} />;
                    })}
                </div>
                <h5 className="my-4 text-xl font-medium leading-tight text-neutral-800">
                    Recommended Plans
                </h5>
                <div className="grid max-w-screen-xl grid-cols-2 gap-6  mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">
                    {filteredProducts?.map((item) => {
                        return <RecommendedPlanCard key={item.name} mealItem={item} />;
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
