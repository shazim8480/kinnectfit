import { useState } from "react";
import { Checkbox, CheckboxGroup, Chip } from "@nextui-org/react";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import WorkoutCard from "@/components/Workout-Items/WorkoutCard";
import { useGetAllWorkoutsQuery } from "@/redux/feature/workout/workout-api";

const Workouts = () => {
  const { data: workout_data } = useGetAllWorkoutsQuery();
  console.log("workout data from workouts page", workout_data);
  const [searchProduct, setSearchProduct] = useState("");
  const [groupSelected, setGroupSelected] = useState([]);

  const handleInputSearch = (e) => {
    const { name, value } = e.target;
    setSearchProduct(value);
  };

  const filteredProducts = workout_data?.workouts?.filter((item) => {
    const searchMatch = item.workout_name
      .toLowerCase()
      .includes(searchProduct.toLowerCase());

    const categoryMatch =
      groupSelected.length === 0 || groupSelected.includes(item.category);

    return searchMatch && categoryMatch;
  });
  return (
    <section className="max-w-screen-xl mx-auto py-10 px-4">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
        Workout Overview
      </h5>
      <KFInput
        id="search"
        name="search"
        isRequired
        variant="bordered"
        placeholder="Search Here ..."
        value={searchProduct}
        onChange={handleInputSearch}
        type="text"
        className="mb-4 md:w-1/2 w-full"
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
        defaultValue={["hiit", "yoga"]}
        value={groupSelected}
        onChange={setGroupSelected}
      >
        {workout_data?.workouts?.map((item) => {
          return (
            <Checkbox key={item.category} value={item.category}>
              {item.category}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto place-items-center lg:place-content-center lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-4">
        {filteredProducts?.map((item) => {
          return <WorkoutCard key={item.workout_name} workoutItem={item} />;
        })}
      </div>
    </section>
  );
};

export default Workouts;

Workouts.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
