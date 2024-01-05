import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { PROTOCOL_HOST } from "@/constants/url";

export default function DropdownStatus({ trainerStatus, trainerId }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([trainerStatus]));
  const [localTrainerStatus, setLocalTrainerStatus] = useState(trainerStatus);

  const selectedValue = Array.from(selectedKeys)
    .join(", ")
    .replaceAll("_", " ");

  const handleStatusUpdate = async () => {
    const apiUrl = `${PROTOCOL_HOST}/trainer/${trainerId}`;
    const updateStatusData = selectedValue.toLowerCase().replaceAll(" ", "_");
    // let isTrainer;
    // if (updateStatusData === "approved") {
    //     isTrainer = true;
    // } else {
    //     isTrainer = false;
    // }
    let isTrainer;
    updateStatusData === "approved" ? (isTrainer = true) : (isTrainer = false);
    try {
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updateStatusData,
          isTrainer,
        }),
      });

      // Update local state after a successful API call
      setLocalTrainerStatus(updateStatusData);
      // console.log("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    handleStatusUpdate();
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Chip
          className="capitalize"
          color={
            localTrainerStatus === "approved"
              ? "success"
              : localTrainerStatus === "pending"
              ? "warning"
              : localTrainerStatus === "paused"
              ? "danger"
              : "default"
          }
          size="sm"
          variant="flat"
        >
          {localTrainerStatus}
        </Chip>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="approved">Approved</DropdownItem>
        <DropdownItem key="pending">Pending</DropdownItem>
        <DropdownItem key="paused">Paused</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
