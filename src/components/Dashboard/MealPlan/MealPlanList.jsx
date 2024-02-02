import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";

import { getItemFromLocalStorage } from "@/lib/utils";
import { useCallback } from "react";
import moment from "moment";
import { useGetMealByUserIDQuery } from "@/redux/feature/meal/meal-api";

const MealPlanList = () => {

  const userData = getItemFromLocalStorage('userData');
  const { data, isLoading } = useGetMealByUserIDQuery(
    userData?._id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log("🚀selected meal by user", data?.data);

  // return
  const columns = [
    { name: "Meal name", uid: "meal_name" },
    { name: "Meal category", uid: "meal.meal_category" },
    { name: "Total nutrients", uid: "nutrients" },
    { name: "Ingredients", uid: `meal.ingredients` },
    // { name: "Trainer ID", uid: "trainer_id" },
  ];
  const renderCell = useCallback((meal, columnKey) => {

    const cellValue = meal?.meal_name;
    const meal_category = meal?.meal_category;
    const ingredients = meal?.ingredients.join(", ");
    const fat = parseInt(meal?.fat);
    const protein = parseInt(meal?.protein);
    const carbs = parseInt(meal?.carbs);
    const total_nutrients = fat + protein + carbs;

    // console.log("🚀cellBalue", selectedItemsCount);

    switch (columnKey) {
      case "meal_name":
        return <p>{cellValue}</p>;
      case "nutrients":
        // const dateString = meal?.updatedAt.slice;
        return (
          <p className="">
            {total_nutrients} gm
          </p>
        );
      case "meal.meal_category":
        return <p>{meal_category}</p>;
      case "meal.ingredients":
        return (
          <p>{ingredients}</p>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h3 className="font-bold my-5">Selected meals</h3>
      {data?.data.length !== 0 ? (
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data?.data[0]?.selected_meals}>
            {(item) => (
              <TableRow TableRow key={item._id}>
                {(columnKey) => {
                  // console.log("🚀 column key data", columnKey);
                  return <TableCell>{renderCell(item, columnKey)}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table >
      ) : (
        <h3 >Not Selected  any meal</h3>
      )}
    </>
  );
};

export default MealPlanList;
