import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { useGetUserWorkoutByIdQuery } from "@/redux/feature/workout/workout-api";
import { useSelector } from "react-redux";

const WorkoutList = () => {
  const { user } = useSelector((state) => state.user);
  const { data: getworkoutbyuserid, isLoading } = useGetUserWorkoutByIdQuery(
    user?.id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const columns = [
    { name: "Workout name", uid: "workout_name" },
    { name: "Modules Completed", uid: "workout_modules" },
    { name: "Category", uid: `category` },
    { name: "Trainer ID", uid: "trainer_id" },
  ];

  return (
    <>
      <h3 className="font-bold my-5">Enrolled workouts</h3>
      {getworkoutbyuserid?.workouts ? (
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={getworkoutbyuserid.workouts}>
            {(item) => (
              <TableRow key={item._id}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {column.uid === "workout_modules" ? (
                      <ul>
                        {item.workout_modules.filter(
                          (e) => e?.isConfirmed == true
                        )
                          ? item.workout_modules.filter(
                              (e) => e?.isConfirmed == true
                            ).length
                          : 0}
                        /{item.workout_modules.length}
                      </ul>
                    ) : (
                      item[column.uid]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <h3>Not Enrolled in any workouts</h3>
      )}
    </>
  );
};

export default WorkoutList;
