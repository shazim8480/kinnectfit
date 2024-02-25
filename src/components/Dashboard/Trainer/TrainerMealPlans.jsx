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
import { useGetMealPlanByTrainerIDQuery } from "@/redux/feature/meal/meal-api";
import { useGetTrainerByUserQuery } from "@/redux/feature/user/user-api";

const TrainerMealPlans = () => {

    const userData = getItemFromLocalStorage('userData');
    // console.log("🚀 userData", userData?._id);
    const { data: trainerData, isLoading: trainerLoading } = useGetTrainerByUserQuery(userData?._id);
    // console.log("🚀 trainerData", trainerData);
    // return;
    const { data, isLoading } = useGetMealPlanByTrainerIDQuery(
        trainerData?.data?._id,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    console.log("☘️meal plans by trainer", data?.data);
    // return;

    // return
    const columns = [
        { name: "Meal plan name", uid: "mealPlan_name" },
        { name: "Meal plan category", uid: "mealPlan_category" },
        { name: "Creation date", uid: "createdAt" },
        // { name: "Preparation time", uid: "prep_time" },
        // { name: "Total meals", uid: `meals` },
        // { name: "Trainer ID", uid: "trainer_id" },
    ];

    const renderCell = useCallback((mealPlan, columnKey) => {
        // const cellValue = mealPlan[columnKey];
        const cellValue = mealPlan?.mealPlan_name;
        // console.log(object)
        switch (columnKey) {
            case "mealPlan_name":
                return <p>{cellValue}</p>;
            case "createdAt":
                const dateString = mealPlan?.createdAt.slice(0, 10);
                const registrationDate = moment(dateString).format("DD MMM YYYY");
                return (
                    <div className="flex flex-col">
                        <p className="text-sm capitalize text-bold text-neutral-600">
                            {registrationDate}
                        </p>
                    </div>
                );
            case "mealPlan_category":
                const mealPlanCategory = mealPlan?.mealPlan_category;
                return <p>{mealPlanCategory}</p>;
            // case "prep_time":
            //     const prepDuration = mealPlan?.prep_time;
            //     return <p className="pl-[2rem]">{prepDuration} min</p>;
            // case "meals":
            //     return (
            //         <div className="pl-[2.5rem]">
            //             <span>{mealPlan?.meals.length}</span>
            //         </div>
            //     );
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

    return (
        <>
            <h3 className="font-bold my-5">Created meal plans</h3>
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
                <h3 >Not Created any meal plan</h3>
            )}
        </>
    );
};

export default TrainerMealPlans;
