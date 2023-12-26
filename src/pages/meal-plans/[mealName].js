import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { Checkbox } from "@nextui-org/react";
import { KFButton } from "@/components/UI/KFButton";
import { mealData } from "@/lib/db/meal-data";

function MealDetailsPage() {
    const router = useRouter();
    const { mealName } = router.query;
    const meal_details = mealData.find(
        (w) => w.name === mealName
    );

    return (
        <section className="grid max-w-screen-xl mx-auto grid-cols-1 grid-rows-1 md:grid-cols-2 py-10">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="p-6">
                    <Image
                        removewrapper
                        alt="meal_cover"
                        className="z-0 object-cover w-full h-full"
                        src={meal_details?.image}
                        width={500}
                        height={500}
                    />
                    <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
                        {meal_details?.name}
                    </h5>
                    <h5 className="my-5 text-xl font-medium leading-tight text-neutral-800">
                        Meal Description
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 ">
                        {meal_details?.description}
                    </p>
                </div>
            </div>

            <div className="block">
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                        Meal Overview
                    </h5>
                    <div className="mb-4 text-base text-neutral-600 ">
                        {meal_details?.categories.map((category) => {
                            return (
                                <div className="text-base text-black p-6 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]" key={category?.name}>
                                    <div>
                                        <p
                                            className="flex justify-between mb-4 font-semibold  text-xl"
                                        >
                                            {category?.name}
                                        </p>
                                        {
                                            category?.meals.map((meal) => (
                                                <div key={meal?.name} className="flex flex-col mt-4">
                                                    <div className="flex justify-between">
                                                        <span className="text-lg font-medium">{meal?.name}</span>
                                                    </div>
                                                    <div className="flex justify-between"><div>
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
                                                    <span className="text-neutral-800 leading-normal">Prepare time: {meal?.prep_time} minutes</span></div>
                                            ))
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
