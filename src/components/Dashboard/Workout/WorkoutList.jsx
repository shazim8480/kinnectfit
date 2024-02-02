import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

import { useGetEnrolledWorkoutModuleByUserIdQuery } from "@/redux/feature/workout/workout-api";
import { getItemFromLocalStorage } from "@/lib/utils";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { useCallback } from "react";
import moment from "moment";

const WorkoutList = () => {

  const userData = getItemFromLocalStorage('userData');
  const { data, isLoading } = useGetEnrolledWorkoutModuleByUserIdQuery(
    userData?._id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // console.log("object🇲🇦", data?.data);


  const columns = [
    { name: "Workout name", uid: "workout.workout_name" },
    { name: "Workout category", uid: "workout.workout_category" },
    { name: "Enrolled date", uid: "workout.updatedAt" },
    { name: "Completed modules", uid: `workout.modules` },
    // { name: "Trainer ID", uid: "trainer_id" },
  ];

  const renderCell = useCallback((workout, columnKey) => {
    // const cellValue = workout[columnKey];
    const cellValue = workout?.workout?.workout_name;

    switch (columnKey) {
      case "workout.workout_name":
        return <p>{cellValue}</p>;
      case "workout.updatedAt":
        const dateString = workout?.createdAt.slice(0, 10);
        const registrationDate = moment(dateString).format("DD MMM YYYY");
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold text-neutral-600">
              {registrationDate}
            </p>
          </div>
        );
      case "workout.workout_category":
        const workoutCategory = workout?.workout.workout_category;
        return <p>{workoutCategory}</p>;
      case "workout.modules":
        return (
          <div className="pl-[2.5rem]">
            <span>{workout?.modules.length} / {workout?.total_modules}</span>
          </div>
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
      <h3 className="font-bold my-5">Enrolled workouts</h3>
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
        <h3 >Not Enrolled in any workouts</h3>
      )}
    </>
  );
};

export default WorkoutList;
