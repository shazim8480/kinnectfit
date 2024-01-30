import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { columns, users } from "@/lib/db/trainer-data";
import DropdownStatus from "./DropdownStatus";
import { PROTOCOL_HOST } from "@/constants/url";
import moment from "moment";
import { useFetch } from "@/hooks/useFetch";
import TrainerDetails from "./TrainerDetails";
import { useGetAllTrainersQuery } from "@/redux/feature/trainer/trainer-api";
import { getItemFromLocalStorage } from "@/lib/utils";

const statusColorMap = {
  approved: "success",
  paused: "danger",
  pending: "warning",
};

export default function TrainerList() {
  const accessToken = getItemFromLocalStorage('accessToken');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const { data, isLoading } = useGetAllTrainersQuery(accessToken);
  const trainers = data?.data;
  console.log("🚀 trainers data", trainers);
  // const {
  //   data: trainerList,
  //   loading,
  //   error,
  // } = useFetch(`${PROTOCOL_HOST}/trainers`);

  // console.log("trainerList", trainerList);

  const handleEyeButton = (trainerId) => {
    console.log(" 🚀 trainerId", trainerId);
    setSelectedTrainer(trainerId);
    // return;
    onOpen();
  };

  const renderCell = React.useCallback((trainer, columnKey) => {
    // const cellValue = trainer[columnKey];
    const cellValue = trainer.user.name;

    switch (columnKey) {
      case "user.name":
        return (
          <User
            name={cellValue}
            avatarProps={{
              src: trainer?.images[0]
            }}
          ></User>
        );
      case "createdAt":
        const dateString = trainer?.createdAt.slice(0, 10);
        const registrationDate = moment(dateString).format("DD MMM YYYY");
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold text-neutral-600">
              {registrationDate}
            </p>
          </div>
        );
      case "status":
        return (
          <DropdownStatus
            trainerStatus={trainer?.status}
            trainerId={trainer?.user?._id}
          />
        );
      case "actions":
        return (
          <div className="relative flex max-w-[3rem] justify-center items-center">
            <Tooltip content="Details">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <div onClick={() => handleEyeButton(trainer?.user?._id)}>
                  <EyeIcon />
                </div>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // const trainers = trainerList?.trainers;

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={trainers}>
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
      {isOpen && (
        <TrainerDetails
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          trainerId={selectedTrainer}
        // trainer={selectedTrainer}
        // onClose={onClose}
        />
      )}
    </>
  );
}
