import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import { useGetGroupedMealsByMealPlanIDQuery, useGetMealByUserIDQuery, useGetSingleMealPlanQuery, useSelectMealMutation } from "@/redux/feature/meal/meal-api";
import { Spinner } from "@nextui-org/react";
import { getItemFromLocalStorage } from "@/lib/utils";

function MealDetailsPage() {

  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedMealStates, setSelectedMealStates] = useState({});

  const accessToken = getItemFromLocalStorage('accessToken');
  const userData = getItemFromLocalStorage('userData');

  const router = useRouter();
  const { mealPlanId } = router.query;

  const [selectMeal] = useSelectMealMutation();
  const { data, isLoading } = useGetSingleMealPlanQuery(mealPlanId);
  const { data: groupMealsData, isLoading: groupMealsLoading } = useGetGroupedMealsByMealPlanIDQuery(mealPlanId);
  const { data: userSelectedMealsData, refetch } = useGetMealByUserIDQuery(userData?._id);
  console.log("userSelectedMealsData", userSelectedMealsData);

  const isSubmitDisabled = selectedMeals.length === 0;

  let alreadyMealSelected;
  const handleSelectMeal = (mealId) => {
    alreadyMealSelected = userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === mealId);
    if (alreadyMealSelected) {
      return;
    }
    const updatedSelectedMeals = [...selectedMeals];
    if (updatedSelectedMeals.includes(mealId)) {
      const index = updatedSelectedMeals.indexOf(mealId);
      updatedSelectedMeals.splice(index, 1);
    } else {
      updatedSelectedMeals.push(mealId);
    }

    setSelectedMeals(updatedSelectedMeals);

    // Update selected meal states
    const updatedSelectedMealStates = { ...selectedMealStates };
    updatedSelectedMealStates[mealId] = !updatedSelectedMealStates[mealId];
    setSelectedMealStates(updatedSelectedMealStates);
  };


  const handleSubmitMeals = async () => {
    const selectedMealsData = {
      data: {
        user: userData?._id,
        selected_meals: selectedMeals
      }, accessToken
    };
    const selectedMealsResponse = await selectMeal(selectedMealsData);
    // console.log("selectedMealsResponse", selectedMealsResponse);
    if (selectedMealsResponse?.data?.statusCode === 200) {
      if (!isSubmitDisabled) {
        router.push('/dashboard');
        refetch();
      }
    }
  };

  if (isLoading || groupMealsLoading || !data) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }


  const { mealPlan_cover, mealPlan_name, mealPlan_description, mealPlan_category } = data.data;

  return (
    <>

      <section className="grid max-w-screen-xl grid-cols-1 grid-rows-1 py-10 mx-auto md:grid-cols-1">
        <div className="flex justify-center  h-[100vh] relative">
          <Image
            removewrapper
            src={mealPlan_cover[0]}
            alt="meal_cover"
            className="absolute"
            layout="fill"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="block bg-white rounded-lg ">
          <div>
            <h5 className="pl-5 my-3 text-xl font-medium leading-tight text-neutral-800">
              {/* {data?.mealPlan?.mealPlan_name} */}
              {mealPlan_name}
            </h5>
            <p className="pl-5 mb-4 text-base text-neutral-600">
              {/* {data?.mealPlan?.mealPlan_description} */}
              {mealPlan_description}
            </p>
          </div>
        </div>


        <div className="block">
          <div className="p-6">
            <div className="mb-4 text-base text-neutral-600 bg-green-60">

              {/* Breakfast */}
              {
                groupMealsData?.data?.Breakfast && <>
                  <div className="py-6 text-base text-black">
                    <div>
                      <p className="flex justify-between mb-4 text-xl font-semibold">Breakfast</p>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                        {groupMealsData?.data?.Breakfast?.map((meal) => (
                          <div
                            key={meal?._id}
                            onClick={() => handleSelectMeal(meal?._id)}
                            className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?._id] ? "border-2 border-blue-800 rounded-sm" : ""
                              } ${userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id) ? "opacity-[0.6] border-2 rounded-sm border-blue-800" : ""
                              }`}
                          >

                            <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                              <div className="flex justify-between">
                                <span className="text-base font-medium">
                                  {meal?.meal_name}
                                </span>
                              </div>
                              <div className="flex justify-between ">
                                <div>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Protein:</span>{" "}
                                    {meal?.protein}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Carbs:</span> {meal?.carbs}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Fat:</span> {meal?.fat}
                                  </p>
                                </div>
                              </div>
                              <span className="leading-normal text-neutral-800">
                                Prepare time: {meal?.prep_time} minutes
                              </span>
                            </div>

                            <div className="relative w-40 h-40">
                              <Image
                                src={meal?.meal_cover[0]}
                                alt="meal-img"
                                layout="fill"
                                className="absolute object-cover"
                              />
                            </div>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }
              {/* Breakfast ends*/}

              {/* Lunch */}
              {
                groupMealsData?.data?.Lunch && <>
                  <div className="py-6 text-base text-black">
                    <div>
                      <p className="flex justify-between mb-4 text-xl font-semibold">Lunch</p>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                        {groupMealsData?.data?.Lunch?.map((meal) => (
                          <div
                            key={meal?._id}
                            onClick={() => handleSelectMeal(meal?._id)}
                            className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?._id] ? "border-2 border-blue-800 rounded-sm" : ""
                              } ${userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id) ? "opacity-[0.6] border-2 rounded-sm border-blue-800" : ""
                              }`}
                          >

                            <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                              <div className="flex justify-between">
                                <span className="text-base font-medium">
                                  {meal?.meal_name}
                                </span>
                              </div>
                              <div className="flex justify-between ">
                                <div>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Protein:</span>{" "}
                                    {meal?.protein}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Carbs:</span> {meal?.carbs}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Fat:</span> {meal?.fat}
                                  </p>
                                </div>
                              </div>
                              <span className="leading-normal text-neutral-800">
                                Prepare time: {meal?.prep_time} minutes
                              </span>
                            </div>

                            <div className="relative w-40 h-40">
                              <Image
                                src={meal?.meal_cover[0]}
                                alt="meal-img"
                                layout="fill"
                                className="absolute object-cover"
                              />
                            </div>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }


              {/* Dinner */}
              {
                groupMealsData?.data?.Dinner && <>
                  <div className="py-6 text-base text-black">
                    <div>
                      {<p className="flex justify-between mb-4 text-xl font-semibold">Dinner</p>}
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                        {groupMealsData?.data?.Dinner?.map((meal) => (
                          <div
                            key={meal?._id}
                            onClick={() => handleSelectMeal(meal?._id)}
                            className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?._id] ? "border-2 border-blue-800 rounded-sm" : ""
                              } ${userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id) ? "opacity-[0.6] border-2 rounded-sm border-blue-800" : ""
                              }`}
                          >

                            <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                              <div className="flex justify-between">
                                <span className="text-base font-medium">
                                  {meal?.meal_name}
                                </span>
                              </div>
                              <div className="flex justify-between ">
                                <div>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Protein:</span>{" "}
                                    {meal?.protein}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Carbs:</span> {meal?.carbs}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Fat:</span> {meal?.fat}
                                  </p>
                                </div>
                              </div>
                              <span className="leading-normal text-neutral-800">
                                Prepare time: {meal?.prep_time} minutes
                              </span>
                            </div>

                            <div className="relative w-40 h-40">
                              <Image
                                src={meal?.meal_cover[0]}
                                alt="meal-cover"
                                layout="fill"
                                className="absolute object-cover"
                              />
                            </div>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }

              {/* Snacks */}
              {
                groupMealsData?.data?.Snacks && <>
                  <div className="py-6 text-base text-black">
                    <div>
                      <p className="flex justify-between mb-4 text-xl font-semibold">Snacks</p>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                        {groupMealsData?.data?.Snacks?.map((meal) => (
                          <div
                            key={meal?._id}
                            onClick={() => handleSelectMeal(meal?._id)}
                            className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?._id] ? "border-2 border-blue-800 rounded-sm" : ""
                              } ${userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id) ? "opacity-[0.6] border-2 rounded-sm border-blue-800" : ""
                              }`}
                          >

                            <div className="flex flex-col max-w-[14rem] md:max-w-lg pl-0 md:pl-8 ">
                              <div className="flex justify-between">
                                <span className="text-base font-medium">
                                  {meal?.meal_name}
                                </span>
                              </div>
                              <div className="flex justify-between ">
                                <div>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Protein:</span>{" "}
                                    {meal?.protein}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Carbs:</span> {meal?.carbs}
                                  </p>
                                  <p className="leading-normal text-neutral-800">
                                    <span>Fat:</span> {meal?.fat}
                                  </p>
                                </div>
                              </div>
                              <span className="leading-normal text-neutral-800">
                                Prepare time: {meal?.prep_time} minutes
                              </span>
                            </div>

                            <div className="relative w-40 h-40">
                              <Image
                                src={meal?.meal_cover[0]}
                                alt="meal-img"
                                layout="fill"
                                className="absolute object-cover"
                              />
                            </div>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div >


        {/* submit     */}
        <div className="text-center" >
          <KFButton
            // type="submit"
            onClick={handleSubmitMeals}
            size="lg"
            color="secondary"
            className={`${isSubmitDisabled && "opacity-[0.6]"}`}
          // disabled={isSubmitDisabled}
          >
            Confirm Meal Submission
          </KFButton>
        </div >
      </section >

      {/* {mealPlanReviewData?.reviews?.map((review) => {
        return <div key={review?.review_id} className=" m-10">
          <div className='grid grid-cols-1 md:grid-cols-2 h-full  min-h-[650px] md:min-h-[350px] items-center shadow-lg '>
            <div className='p-10'>
              <div>
                <span className='font-semibold text-lg'>{review?.review_information?.review_info?.reviewer_name}</span>
              </div>
              <div className='mt-1'>
                <ReviewStar rating={review?.review_information?.review_info?.rating} />
              </div>
              <div className='mt-2'>
                <span className='font-medium text-base'>{review?.review_information?.review_info?.review_name}</span>
              </div>
              <div className='mt-2'>
                <span className='italic text-gray-600'>
                  {review?.review_information?.review_info?.description}
                </span>
              </div>
            </div>
            <div className='h-full relative '>
              <Image src={review?.review_information?.review_info?.review_img[0]} alt='rental' layout='fill' className='absolute' />
            </div>
          </div>
        </div>;
      })} */}

    </>

  );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
