import { EyeIcon } from "@/assets/icons/EyeIcon";
import { PROTOCOL_HOST } from "@/constants/url";
import { useFetch } from "@/hooks/useFetch";
import { columns } from "@/lib/db/trainer-data";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import React, { useState } from "react";
import DropdownStatus from "./DropdownStatus";
import TrainerDetails from "./TrainerDetails";

const statusColorMap = {
  approved: "success",
  paused: "danger",
  pending: "warning",
};

export default function TrainerList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const { data: trainerList, loading } = useFetch(`${PROTOCOL_HOST}/trainers`);

  console.log("trainerList", trainerList);

  const handleEyeButton = (trainerId) => {
    setSelectedTrainer(trainerId);
    onOpen();
  };

  const renderCell = React.useCallback((trainer, columnKey) => {
    const cellValue = trainer[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: trainer?.trainerImg
                ? trainer?.trainerImg[0]
                : "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            name={cellValue}
          ></User>
        );
      case "registration_date":
        const dateString = trainers?.created_at;
        const registrationDate = moment(dateString).format("DD MMM YYYY");
        console.log("reg date", registrationDate);
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
            trainerId={trainer?.trainer_id}
          />
        );
      case "actions":
        return (
          <div className="relative flex max-w-[3rem] justify-center items-center">
            <Tooltip content="Details">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <div onClick={() => handleEyeButton(trainer?.trainer_id)}>
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

  const trainers = trainerList?.trainers;

  if (loading) {
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
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
