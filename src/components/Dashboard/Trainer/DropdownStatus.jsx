/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { PROTOCOL_HOST } from "@/constants/url";
import { useCreateTrainerMutation, usePauseTrainerMutation } from "@/redux/feature/trainer/trainer-api";
import { getItemFromLocalStorage } from "@/lib/utils";

export default function DropdownStatus({ trainerStatus, trainerId }) {
  // console.log("🚀 trainerStatus", trainerStatus);
  // console.log("😆 trainerId", trainerId);
  const accessToken = getItemFromLocalStorage('accessToken');
  const [createTrainer] = useCreateTrainerMutation();
  const [pauseTrainer] = usePauseTrainerMutation();

  const [selectedKeys, setSelectedKeys] = useState(new Set([trainerStatus]));
  const [localTrainerStatus, setLocalTrainerStatus] = useState(trainerStatus);

  const selectedValue = Array.from(selectedKeys)
    .join(", ")
    .replaceAll("_", " ");

  const handleStatusUpdate = async () => {
    const apiUrl = `${PROTOCOL_HOST}/trainer/${trainerId}`;
    const updateStatusData = selectedValue.toLowerCase().replaceAll(" ", "_");
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
  }, [handleStatusUpdate]);

  const handleApproved = async (user) => {
    const approveData = {
      data: {
        user
      },
      accessToken
    };
    const createTrainerRes = await createTrainer(approveData);
    // console.log("🚀 createTrainerRes", createTrainerRes);
  };
  const handlePaused = async (user) => {
    const pauseData = {
      data: {
        user
      },
      accessToken
    };
    const pauseTrainerRes = await pauseTrainer(pauseData);
    // console.log("🛩️ pauseTrainerRes", pauseTrainerRes);
  };
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
        <DropdownItem onClick={() => handleApproved(trainerId)} key="approved">Approve</DropdownItem>
        {
          trainerStatus === 'approved' && <DropdownItem onClick={() => handlePaused(trainerId)} key="paused">Pause</DropdownItem>
        }
        {
          trainerStatus === 'pending' && <DropdownItem key="pending">Pending</DropdownItem>
        }

        {/* <DropdownItem key="paused">Paused</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
