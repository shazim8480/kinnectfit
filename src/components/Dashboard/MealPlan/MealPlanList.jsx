import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

const MealPlanList = () => {
  const { user } = useSelector((state) => state.user);
  const columns = [
    { name: "Category", uid: "categoryName" },
    { name: "Meal Id", uid: "meal_id" },
  ];
  const items = user?.selected_meals?.flat();

  return (
    <>
      {user?.selected_meals ? (
        <>
          <h3 className="font-bold my-5">Selected Meal plans</h3>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={user?.selected_meals?.flat()}>
              {/* {console.log("Flattened meals:", user?.selected_meals?.flat())} */}

              {items?.map((item) => (
                <TableRow key={item._id}>
                  {columns.map((column) => (
                    <TableCell key={column.uid}>
                      {item[column.uid] ?? "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <h3 className="my-5 font-bold">Not selected any meal plans</h3>
      )}
    </>
  );
};

export default MealPlanList;
