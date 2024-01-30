import { useState } from "react";
import { Button, Checkbox, CheckboxGroup, Chip, Pagination } from "@nextui-org/react";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import WorkoutCard from "@/components/Workout-Items/WorkoutCard";
import { useGetAllWorkoutsQuery } from "@/redux/feature/workout/workout-api";
import { KFButton } from "@/components/UI/KFButton";

const Workouts = () => {

  const [searchWorkout, setSearchWorkout] = useState("");
  const [groupSelected, setGroupSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = groupSelected.join('&workout_category=');
  const { data: workout_data } = useGetAllWorkoutsQuery({ searchTerm: searchWorkout, page: currentPage, categories });
  const pageLimit = workout_data?.meta?.total / 12;

  const uniqueCategory = [];
  workout_data?.data?.map((workout) => {
    if (!uniqueCategory.includes(workout?.workout_category)) {
      uniqueCategory.push(workout?.workout_category);
    }
  });

  const handleInputSearch = (e) => {
    const { value } = e.target;
    setSearchWorkout(value);
  };

  return (
    <section className="max-w-screen-xl px-4 py-10 mx-auto">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
        Workout Overview
      </h5>
      <KFInput
        id="search"
        name="search"
        isRequired
        variant="bordered"
        placeholder="Search Here ..."
        value={searchWorkout}
        onChange={handleInputSearch}
        type="text"
        className="w-full mb-4 md:w-1/2"
      />
      <hr></hr>
      <h5 className="my-3 text-xl font-medium leading-tight text-neutral-800">
        Popular searches
      </h5>
      <Chip color="primary" className="mr-2">
        HIIT
      </Chip>
      <Chip color="primary" className="mr-2">
        Strength
      </Chip>
      <Chip color="primary">Yoga</Chip>
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
        {uniqueCategory.map((item) => {
          return (
            <Checkbox key={item} value={item}>
              {item}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {workout_data?.data?.map((item) => {
          return <WorkoutCard key={item?.workout_id} workoutItem={item} />;
        })}
      </div>

      {/* pagination */}
      <div className="flex justify-end">
        <div className="flex flex-col gap-5 ">
          {/* <p className="text-small text-default-500">Selected Page: {currentPage}</p> */}
          <Pagination
            total={Math.ceil(pageLimit)}
            color="secondary"
            page={currentPage}
            onChange={setCurrentPage}
          />
          <div className="flex gap-2">
            <KFButton
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              Previous
            </KFButton>
            <KFButton
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() => setCurrentPage((prev) => (prev < `${pageLimit}` ? prev + 1 : prev))}
            >
              Next
            </KFButton>
          </div>
        </div>

      </div>

      {/* pagination ends */}
    </section>
  );
};

export default Workouts;

Workouts.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
