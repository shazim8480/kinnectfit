import { mealData } from "@/lib/db/meal-data";
import KFNavbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HeadingText from "@/components/UI/HeadingText";
import MealPlanCard from "@/components/MealPlanCard/MealPlanCard";

const FeatureMealPlans = () => {
    return (
        <>
            <KFNavbar />
            <section className="py-8 lg:py-16">
                <HeadingText title="Featured Meal Plans" className="text-center" />
                <div className="grid max-w-screen-xl grid-cols-2 gap-4 px-4 py-8 mx-auto place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
                    {mealData.slice(0, 4).map((mealItem, index) => (
                        <MealPlanCard key={index} mealItem={mealItem} />
                    ))}
                </div>
            </section>
            <Footer />
        </>

    );
};

export default FeatureMealPlans;
