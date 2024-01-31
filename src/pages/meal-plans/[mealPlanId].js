import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { useEffect, useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import { useGetGroupedMealsByMealPlanIDQuery, useGetMealByUserIDQuery, useGetSingleMealPlanQuery, useSelectMealMutation } from "@/redux/feature/meal/meal-api";
import { Spinner } from "@nextui-org/react";
import { getItemFromLocalStorage } from "@/lib/utils";
import MealComponent from "@/components/dashboard/MealPlan/MealComponent";
import { useGetReviewsByMealPlanIdQuery } from "@/redux/feature/review/review-api";
import ShowReview from "@/components/ShowReview/ShowReview";

function MealDetailsPage() {
  // get token and userData from localStorage
  const accessToken = getItemFromLocalStorage('accessToken');
  const userData = getItemFromLocalStorage('userData');
  const [key, setKey] = useState(Date.now());
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedMealStates, setSelectedMealStates] = useState({});

  const router = useRouter();
  const { mealPlanId } = router.query;

  // query & mutations
  const [selectMeal] = useSelectMealMutation();
  const { data, isLoading } = useGetSingleMealPlanQuery(mealPlanId);
  const { data: groupMealsData, isLoading: groupMealsLoading } = useGetGroupedMealsByMealPlanIDQuery(mealPlanId);
  const { data: userSelectedMealsData, refetch } = useGetMealByUserIDQuery(userData?._id);
  const { data: mealPlanReviewsData } = useGetReviewsByMealPlanIdQuery(mealPlanId);
  // console.log("🚀 mealplan reviews", mealPlanReviewsData);

  const isSubmitDisabled = selectedMeals.length === 0;

  // logic for selecting meal
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

  // submit meals after selecting
  const handleSubmitMeals = async () => {
    // if (!accessToken) {
    //   const currentUrl = window.location.pathname + window.location.search;
    //   sessionStorage.setItem('mealPlanRedirectUrl', currentUrl);
    //   router.push('/sign-in');
    // }
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
        router.push("/dashboard/health-summary");
        refetch();
      }
    }
  };



  useEffect(() => {
    // Reset selected meal states when accessToken becomes unavailable (user logs out)
    if (!accessToken) {
      setSelectedMeals([]);
      setSelectedMealStates({});
      setKey(Date.now());
    }
  }, [accessToken]);

  if (isLoading || groupMealsLoading || !data) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const { mealPlan_cover, mealPlan_name, mealPlan_description } = data.data;



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
              {groupMealsData?.data?.Breakfast && (
                <div className="py-6 text-base text-black">
                  <div>
                    <p className="flex justify-between mb-4 text-xl font-semibold">Breakfast</p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupMealsData?.data?.Breakfast?.map((meal) => (
                        <MealComponent
                          setSelectedMeals={setSelectedMeals}
                          setSelectedMealStates={setSelectedMealStates}
                          key={meal?._id}
                          meal={meal}
                          selected={accessToken && selectedMealStates[meal?._id]}
                          onClick={handleSelectMeal}
                          alreadySelected={accessToken && userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Breakfast ends*/}

              {/* Lunch */}
              {groupMealsData?.data?.Lunch && (
                <div className="py-6 text-base text-black">
                  <div>
                    <p className="flex justify-between mb-4 text-xl font-semibold">Lunch</p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupMealsData?.data?.Lunch?.map((meal) => (
                        <MealComponent
                          setSelectedMeals={setSelectedMeals}
                          setSelectedMealStates={setSelectedMealStates}
                          key={meal?._id}
                          meal={meal}
                          selected={accessToken && selectedMealStates[meal?._id]}
                          onClick={handleSelectMeal}
                          alreadySelected={accessToken && userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Lunch ends */}

              {/* Dinner */}
              {groupMealsData?.data?.Dinner && (
                <div className="py-6 text-base text-black">
                  <div>
                    <p className="flex justify-between mb-4 text-xl font-semibold">Dinner</p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupMealsData?.data?.Dinner?.map((meal) => (
                        <MealComponent
                          setSelectedMeals={setSelectedMeals}
                          setSelectedMealStates={setSelectedMealStates}
                          key={meal?._id}
                          meal={meal}
                          selected={accessToken && selectedMealStates[meal?._id]}
                          onClick={handleSelectMeal}
                          alreadySelected={accessToken && userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Dinner ends */}

              {/* Snacks */}
              {groupMealsData?.data?.Snacks && (
                <div key={key} className="py-6 text-base text-black">
                  <div>
                    <p className="flex justify-between mb-4 text-xl font-semibold">Snacks</p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupMealsData?.data?.Snacks?.map((meal) => (
                        <MealComponent
                          setSelectedMeals={setSelectedMeals}
                          setSelectedMealStates={setSelectedMealStates}
                          key={meal?._id}
                          meal={meal}
                          selected={accessToken && selectedMealStates[meal?._id]}
                          onClick={handleSelectMeal}
                          alreadySelected={accessToken && userSelectedMealsData?.data[0]?.selected_meals.some(item => item._id === meal?._id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Snacks ends */}
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
            className={`${(isSubmitDisabled || !accessToken) && "opacity-[0.6]"}`}
          // disabled={isSubmitDisabled}
          >
            Confirm Meal Submission
          </KFButton>
        </div >
      </section >

      {/* Reviews  */}
      {mealPlanReviewsData?.data?.map((review) => (
        <ShowReview key={review?._id} review={review} />
      )
      )}
      {/* Reviews ends */}

    </>

  );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
