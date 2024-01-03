import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Spinner, useDisclosure } from "@nextui-org/react";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { columns, users } from "@/lib/db/trainer-data";
import DropdownStatus from "./DropdownStatus";
import { LOCAL_BACKEND } from "@/constants/url";
import moment from "moment";
import { useFetch } from "@/hooks/useFetch";
import TrainerDetails from "./TrainerDetails";

const statusColorMap = {
    approved: "success",
    paused: "danger",
    pending: "warning",
};

export default function TrainerList() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const { data: trainerList, loading, error } = useFetch(`${LOCAL_BACKEND}/trainers`);
    const handleEyeButton = (trainerId) => {
        // console.log("trainerId", trainerId);
        setSelectedTrainer(trainerId);
        onOpen();
    };

    // console.log("Trainers", trainers);
    const renderCell = React.useCallback((trainer, columnKey) => {
        const cellValue = trainer[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: trainer?.trainerImg[0] }}
                        name={cellValue}
                    >
                    </User>
                );
            case "registration_date":
                const dateString = (trainers?.created_at);
                const registrationDate = moment(dateString).format("DD MMM YYYY");
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize text-neutral-600">{registrationDate}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[trainer?.status]} size="sm" variant="flat">
                        <DropdownStatus trainerStatus={trainer?.status} />
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex max-w-[3rem] justify-center items-center">
                        <Tooltip content="Details">
                            <span className="text-lg  text-default-400 cursor-pointer active:opacity-50">
                                <div onClick={() => handleEyeButton(trainer?.trainer_id)}>
                                    <EyeIcon />
                                </div>
                            </span>
                        </Tooltip>
                    </div >
                );
            default:
                return cellValue;
        }
    }, []);

    const trainers = trainerList?.trainers;
    // console.log("trainers", trainers);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">
            <Spinner />
        </div>;
    }


    // console.log(formattedDate);
    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={trainers}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {
                isOpen && (
                    <TrainerDetails
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        trainerId={selectedTrainer}
                    // trainer={selectedTrainer}
                    // onClose={onClose}
                    />
                )
            }</>
    );
}
