import { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { mealData } from "@/lib/db/meal-data";
import MealPlanCard from "@/components/MealPlanCard/MealPlanCard";
import { Checkbox, CheckboxGroup, Chip } from "@nextui-org/react";
import { useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";

const MealPlansPage = () => {
    const [searchMealPlan, setSearchMealPlan] = useState('');
    const [groupSelected, setGroupSelected] = useState([]);
    const { data } = useGetAllMealPlansQuery();
    const handleInputSearch = (e) => {
        const { name, value } = e.target;
        setSearchMealPlan(value);
    };


    const uniqueCategories = Array.from(new Set(mealData?.map(item => item.category)));


    return (
        <>
            <section className="max-w-screen-xl mx-auto py-10 px-4">
                <h5 className="my-4 text-xl font-medium leading-tight text-neutral-800">
                    Meal Plans
                </h5>
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
                <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
                    Popular searches
                </h5>
                <Chip color="primary" className="mr-2">
                    Muscle Gain Meal Plan
                </Chip>
                <Chip color="primary" className="mr-2">
                    Fat Loss Meal Plan
                </Chip>
                <Chip color="primary">Vegan Meal Plan</Chip>
                <hr className="my-5"></hr>
                <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
                    Categories
                </h5>
                <CheckboxGroup
                    orientation="horizontal"
                    color="secondary"
                    defaultValue={[]}
                    value={groupSelected}
                    onChange={setGroupSelected}
                >
                    {uniqueCategories?.map((item) => {
                        return (
                            <Checkbox key={item} value={item}>
                                {item}
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
                <div className="grid max-w-screen-xl grid-cols-2 gap-6  mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">
                    {data?.data?.map((item) => {
                        return <MealPlanCard key={item.id} mealItem={item} />;
                    })}
                </div>
            </section>
        </>

    );
};

export default MealPlansPage;

MealPlansPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};