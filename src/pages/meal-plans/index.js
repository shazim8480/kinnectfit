import { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { mealData } from "@/lib/db/meal-data";
import MealPlanCard from "@/components/MealPlanCard/MealPlanCard";
import { Card, Checkbox, CheckboxGroup, Chip, Pagination, Skeleton } from "@nextui-org/react";
import { useGetAllMealPlansQuery } from "@/redux/feature/meal/meal-api";

const MealPlansPage = () => {
    const [searchMealPlan, setSearchMealPlan] = useState('');
    const [groupSelected, setGroupSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = groupSelected.join('&mealPlan_category=');

    const { data: mealPlan_data, isLoading } = useGetAllMealPlansQuery({
        searchTerm: searchMealPlan,
        page: currentPage,
        categories,
    });

    const pageLimit = mealPlan_data?.meta?.total / 12;

    const uniqueCategory = [];
    mealPlan_data?.data?.map((mealPlan) => {
        if (!uniqueCategory.includes(mealPlan?.mealPlan_category)) {
            uniqueCategory.push(mealPlan?.mealPlan_category);
        }
    });

    const handleInputSearch = (e) => {
        const { name, value } = e.target;
        setSearchMealPlan(value);
    };

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
                    value={groupSelected}
                    onChange={setGroupSelected}
                >
                    {uniqueCategory?.map((item) => {
                        return (
                            <Checkbox key={item} value={item}>
                                {item}
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
                <div className="grid max-w-screen-xl grid-cols-2 gap-6  mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-8 lg:grid-cols-4">

                    {isLoading || !mealPlan_data?.data ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg">
                                <Card
                                    className="lg:w-[300px] lg:h-[300px] w-[400px] h-[400px]"
                                    radius="lg"
                                ></Card>
                            </Skeleton>
                        ))
                    ) : (
                        mealPlan_data?.data.map((mealItem, index) => (
                            <MealPlanCard key={index} mealItem={mealItem} />
                        ))
                    )}
                </div>

                {/* pagination */}
                <div className="flex justify-end">
                    <Pagination showControls onChange={setCurrentPage} color="secondary" total={Math.ceil(pageLimit)} initialPage={1} />
                </div>
                {/* pagination ends */}

            </section>
        </>

    );
};

export default MealPlansPage;

MealPlansPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};