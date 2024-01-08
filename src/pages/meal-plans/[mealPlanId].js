import { useRouter } from "next/router";
import Image from "next/image";
import MainLayout from "@/layouts/mainLayout";
import { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import cn from "@/lib/utils";
import { useGetGroupedMealsByMealPlanIDQuery, useGetMealByMealPlanIDQuery, useGetSingleMealPlanQuery } from "@/redux/feature/meal/meal-api";
import { Spinner } from "@nextui-org/react";
import { useUpdateUserMutation } from "@/redux/feature/user/user-api";
import { useSelector } from "react-redux";

function MealDetailsPage() {
  const { user } = useSelector((state) => state?.user);

  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedMealStates, setSelectedMealStates] = useState({});
  console.log(selectedMeals);

  console.log("SelectedMeals", selectedMeals);
  const [isBorderd, setIsBordered] = useState(false);

  const [updateUser] = useUpdateUserMutation();




  const handleSubmitMeals = async (data) => {
    console.log(data);
    // return;
    // const mealData = { ...data, ingredients: items };
    // console.log(object)

    const updateUserInfo = {
      data: {
        selected_meals: selectedMeals
      },
      userId: user?.id
    };
    // console.log("mealplan-response", createMealPlanResponse?.data?.status);
    // console.log("updateuserinfo", updateUserInfo);
    // return;
    // return;
    const result = await updateUser(updateUserInfo);
    if (result?.data?.status === 200) {
      router.push("/dashboard");
    }
    console.log(result);

  };


  const handleMealSelect = (categoryName, mealId) => {
    const selectedMeal = groupedMealsByMealPlan?.categorizedMeals?.[categoryName]?.find(
      (meal) => meal.meal_id === mealId
    );

    if (selectedMeal) {
      const isMealSelected = selectedMealStates[mealId];

      if (isMealSelected) {
        // If selected, remove it from the list
        const updatedSelectedStates = { ...selectedMealStates };
        delete updatedSelectedStates[mealId];
        setSelectedMealStates(updatedSelectedStates);

        // Remove the meal from selectedMeals
        const updatedSelectedMeals = selectedMeals.filter(
          (meal) => meal.categoryName !== categoryName || meal.meal_id !== mealId
        );
        setSelectedMeals(updatedSelectedMeals);
      } else {
        // If not selected, add it to the list
        setSelectedMealStates({ ...selectedMealStates, [mealId]: true });
        setSelectedMeals([...selectedMeals, { categoryName, meal_id: mealId }]);
      }
    }
  };



  const router = useRouter();
  const { mealPlanId } = router.query;

  const { data, isLoading } = useGetSingleMealPlanQuery(mealPlanId);
  const { data: mealDataByMealPlan, isLoading: mealLoading } = useGetMealByMealPlanIDQuery(mealPlanId);
  const { data: groupedMealsByMealPlan, isLoading: groupMealLoading } = useGetGroupedMealsByMealPlanIDQuery(mealPlanId);
  console.log("🔥", groupedMealsByMealPlan);

  if (isLoading || mealLoading || groupMealLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const { mealPlan_name, mealPlan_description, mealPlan_id, trainer_id, mealPlan_cover_img, mealPlan_category } = data?.mealPlan;

  console.log("ssssssssselemeals", selectedMeals);





  // console.log("",selectedMeals);

  const isSubmitDisabled = selectedMeals.length === 0;

  return (
    <section className="grid max-w-screen-xl grid-cols-1 grid-rows-1 py-10 mx-auto md:grid-cols-1">
      <div className="flex justify-center  h-[100vh] relative">
        <Image
          removewrapper
          src={mealPlan_cover_img ? mealPlan_cover_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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

            {/* Breakfast meals */}
            {
              groupedMealsByMealPlan?.categorizedMeals?.breakfast && <>
                <div className="py-6 text-base text-black">
                  <div>
                    {groupedMealsByMealPlan?.categorizedMeals?.breakfast.length !== 0 && <p className="flex justify-between mb-4 text-xl font-semibold">Breakfast</p>}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupedMealsByMealPlan?.categorizedMeals?.breakfast?.map((meal) => (
                        <div
                          key={meal?.meal_id}
                          className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?.meal_id] ? "border-2 border-blue-800" : ""
                            }`}
                          onClick={() =>
                            handleMealSelect("breakfast", meal?.meal_id)
                          }
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
                              src={meal?.meal_img ? meal?.meal_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
            {/* Breakfast meals ends */}


            {/* Lunch meals */}
            {
              groupedMealsByMealPlan?.categorizedMeals?.lunch && <>
                <div className="py-6 text-base text-black">
                  <div>

                    {groupedMealsByMealPlan?.categorizedMeals?.lunch.length !== 0 && <p className="flex justify-between mb-4 text-xl font-semibold">Lunch</p>}

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupedMealsByMealPlan?.categorizedMeals?.lunch?.map((meal) => (
                        <div
                          key={meal?.meal_id}
                          className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?.meal_id] ? "border-2 border-blue-800" : ""
                            }`}
                          onClick={() =>
                            handleMealSelect("lunch", meal?.meal_id)
                          }
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
                              src={meal?.meal_img ? meal?.meal_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
            {/* Lunch meals ends */}


            {/* Dinner meals */}
            {
              groupedMealsByMealPlan?.categorizedMeals?.dinner && <>
                <div className="py-6 text-base text-black">
                  <div>
                    {groupedMealsByMealPlan?.categorizedMeals?.dinner.length !== 0 && <p className="flex justify-between mb-4 text-xl font-semibold">Dinner</p>}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupedMealsByMealPlan?.categorizedMeals?.dinner?.map((meal) => (
                        <div
                          key={meal?.meal_id}
                          className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?.meal_id] ? "border-2 border-blue-800" : ""
                            }`}
                          onClick={() =>
                            handleMealSelect("dinner", meal?.meal_id)
                          }
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
                              src={meal?.meal_img ? meal?.meal_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
            {/* Dinner meals ends */}

            {/* Snacks meals */}
            {
              groupedMealsByMealPlan?.categorizedMeals?.snacks && <>
                <div className="py-6 text-base text-black">
                  <div>
                    {groupedMealsByMealPlan?.categorizedMeals?.snacks.length !== 0 && <p className="flex justify-between mb-4 text-xl font-semibold">Snacks</p>}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                      {groupedMealsByMealPlan?.categorizedMeals?.snacks?.map((meal) => (
                        <div
                          key={meal?.meal_id}
                          className={`flex selectable justify-between items-center rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${selectedMealStates[meal?.meal_id] ? "border-2 border-blue-800" : ""
                            }`}
                          onClick={() =>
                            handleMealSelect("snacks", meal?.meal_id)
                          }
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
                              src={meal?.meal_img ? meal?.meal_img : "https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
            {/* Snacks meals ends */}
          </div>
        </div>
      </div >


      {/* submit     */}
      <div className="text-center" >
        <KFButton
          type="submit"
          onClick={handleSubmitMeals}
          size="lg"
          color="secondary"
        // className="opacity-60"
        // className="text-blue-800 bg-indigo-50"
        // className={cn(``, {
        //   "opacity-60": isSubmitDisabled,
        // })}
        // disabled={isSubmitDisabled}
        >
          Confirm Meal Submission
        </KFButton>
      </div >
    </section >
  );
}
export default MealDetailsPage;

MealDetailsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
