import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@nextui-org/react";

export default function DropdownStatus({ trainerStatus }) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["pending"]));


    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    // console.log("selectedValue", selectedValue);

    return (
        <Dropdown>
            <DropdownTrigger>
                {/* <Button
                    variant="bordered"
                    className="capitalize"
                >
                    {selectedValue}
                </Button> */}
                <Chip className="capitalize" color={
                    selectedKeys.has("approved") ? "success" :
                        selectedKeys.has("pending") ? "warning" :
                            selectedKeys.has("paused") ? "danger" : "default"
                } size="sm" variant="flat">
                    {selectedValue}
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
