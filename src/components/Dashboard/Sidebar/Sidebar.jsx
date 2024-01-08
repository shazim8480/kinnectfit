import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import SidebarLinkGroup from ;
import MealPlanIcon from "@/assets/icons/MealPlanIcon";
import HealthSummaryIcon from "@/assets/icons/HealthSummaryIcon";
import TrainerSummaryIcon from "@/assets/icons/TrainerSummaryIcon";
import CreateWorkoutIcon from "@/assets/icons/CreateWorkoutIcon";
import UserProfileIcon from "@/assets/icons/UserProfileIcon";
import AddReviewIcon from "@/assets/icons/AddReviewIcon";
import { TrainerListIcon } from "@/assets/icons/TrainerListIcon";
import { useSelector } from "react-redux";
import { useGetAllTrainersQuery } from "@/redux/feature/trainer/trainer-api";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state?.user);
  let userID = user?.id;
  // check if trainer is true
  const [isTrainer, setIsTrainer] = useState(false);

  // get all trainers query
  const { data: allTrainerData, refetch: trainersRefetch } =
    useGetAllTrainersQuery();

  useEffect(() => {
    if (allTrainerData !== undefined) {
      trainersRefetch();
    }
    let matchedTrainer = allTrainerData?.trainers?.find(
      (trainer) => trainer?.trainer_id === userID
    );
    let isUserTrainer = matchedTrainer?.isTrainer;
    setIsTrainer(isUserTrainer);
  }, [allTrainerData]);

  console.log("is trainer", isTrainer);

  // console.log("isAdmin", user);
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blue-100 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2  py-5.5 lg:py-6.5">
        <Link
          href="/"
          className="font-bold text-blue-800 brand-name text-[18px] ml-10 mt-5"
        >
          KinnectFit
        </Link>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {!user?.isAdmin && !isTrainer && (
                <>
                  {/* <!-- Menu Item Health Summary --> */}
                  <li>
                    <Link
                      href="/dashboard/health-summary"
                      className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                        pathname.includes("health-summary") && "bg-blue-200"
                      }`}
                    >
                      <HealthSummaryIcon
                        fill="currentColor"
                        className="w-5 h-5"
                      />
                      Health Summary
                    </Link>
                  </li>
                  {/* <!-- Menu Item Health Summary --> */}

                  {/* <!-- Menu Item Add Review --> */}
                  <li>
                    <Link
                      href="/dashboard/add-review"
                      className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                        pathname.includes("add-review") && "bg-blue-200 "
                      }`}
                    >
                      <AddReviewIcon fill="currentColor" className="w-5 h-5" />
                      Add Review
                    </Link>
                  </li>
                  {/* <!-- Menu Item Add Review --> */}
                </>
              )}

              {/* {isTrainer === true && ( */}
                <>
                  {/* <!-- Menu Item Trainer Summary --> */}
                  <li>
                    <Link
                      href="/dashboard/trainer-summary"
                      className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                        pathname.includes("trainer-summary") &&
                        "bg-blue-200 dark:bg-meta-4"
                      }`}
                    >
                      <TrainerSummaryIcon
                        fill="currentColor"
                        className="w-5 h-5"
                      />
                      Trainer Summary
                    </Link>
                  </li>
                  {/* <!-- Menu Item Trainer Summary --> */}

                  {/* <!-- Menu Item Create Workout --> */}
                  <li>
                    <Link
                      href="/dashboard/create-workout"
                      className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                        pathname.includes("create-workout") &&
                        "bg-blue-200 dark:bg-meta-4"
                      }`}
                    >
                      <CreateWorkoutIcon
                        fill="currentColor"
                        className="w-5 h-5"
                      />
                      Create Workout
                    </Link>
                  </li>
                  {/* <!-- Menu Item Create Workout --> */}

                  {/* <!-- Menu Item Create Meal Plan --> */}
                  <li>
                    <Link
                      href="/dashboard/create-mealplan"
                      className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                        pathname.includes("create-mealplan") &&
                        "bg-blue-200 dark:bg-meta-4"
                      }`}
                    >
                      <MealPlanIcon fill="currentColor" className="w-5 h-5" />
                      Create Meal Plan
                    </Link>
                  </li>
                  {/* <!-- Menu Item Create Meal Plan --> */}
                </>
              {/* )} */}

              {/* <!-- Menu Item Add Review --> */}
              {user?.isAdmin && (
                <li>
                  <Link
                    href="/dashboard/trainer-list"
                    className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-blue-800 duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-meta-4 ${
                      pathname.includes("trainer-list") && "bg-blue-200 "
                    }`}
                  >
                    <TrainerListIcon fill="currentColor" className="w-5 h-5" />
                    Trainer List
                  </Link>
                </li>
              )}
              {/* <!-- Menu Item Add Review --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
