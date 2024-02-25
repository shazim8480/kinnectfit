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
import { useGetMealByTrainerIDQuery } from "@/redux/feature/meal/meal-api";
import { useGetTrainerByUserQuery } from "@/redux/feature/user/user-api";

const TrainerMeals = () => {

    const userData = getItemFromLocalStorage('userData');
    // console.log("🚀 userData", userData?._id);
    const { data: trainerData, isLoading: trainerLoading } = useGetTrainerByUserQuery(userData?._id);
    console.log("🚀 trainerData", trainerData?.data?._id);
    // return;
    const { data, isLoading } = useGetMealByTrainerIDQuery(
        trainerData?.data?._id,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    // console.log("☘️meals by trainer", data);
    // return;

    // return
    const columns = [
        { name: "Meal name", uid: "meal_name" },
        { name: "Meal category", uid: "meal_category" },
        { name: "Creation date", uid: "createdAt" },
        { name: "Preparation time", uid: "prep_time" },
        { name: "Total nutrients", uid: "nutrients" },
        { name: "Ingredients", uid: `ingredients` },
    ];

    const renderCell = useCallback((meal, columnKey) => {
        // const cellValue = meal[columnKey];
        const cellValue = meal?.meal_name;
        const ingredients = meal?.ingredients.join(", ");
        const fat = parseInt(meal?.fat);
        const protein = parseInt(meal?.protein);
        const carbs = parseInt(meal?.carbs);
        const total_nutrients = fat + protein + carbs;
        // console.log(object)
        switch (columnKey) {
            case "meal_name":
                return <p>{cellValue}</p>;
            case "createdAt":
                const dateString = meal?.createdAt.slice(0, 10);
                const registrationDate = moment(dateString).format("DD MMM YYYY");
                return (
                    <div className="flex flex-col">
                        <p className="text-sm capitalize text-bold text-neutral-600">
                            {registrationDate}
                        </p>
                    </div>
                );
            case "meal_category":
                const mealCategory = meal?.meal_category;
                return <p>{mealCategory}</p>;
            case "nutrients":
                return (
                    <p className="pl-[1rem]">
                        {total_nutrients} gm
                    </p>
                );
            case "prep_time":
                const prepDuration = meal?.prep_time;
                return <p className="pl-[2rem]">{prepDuration} min</p>;
            case "ingredients":
                return (
                    <p>{ingredients}</p>
                );
            default:
                return cellValue;
        }
    }, []);

    if (isLoading || trainerLoading) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
    // console.log("🚀 See data", data?.data);
    return (
        <>
            <h3 className="font-bold my-5">Created meal</h3>
            {data?.data.length !== 0 ? (
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "workout.modules" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data?.data}>
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
                <h3 >Not Created any meal </h3>
            )}
        </>
    );
};

export default TrainerMeals;
