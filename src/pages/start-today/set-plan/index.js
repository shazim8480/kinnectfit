import React, { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/router";
import SelectableItem from "@/components/StartToday/SelectableItems/SelectableItems";
import { KFButton } from "@/components/UI/KFButton";
import { Progress } from "@nextui-org/react";

const SetPlanPage = () => {
    const items = ["7 days", "15 days", "30 days", "60 days"];
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState([]);
    const handleSelect = (item) => {
        setSelectedItems([item]);
        console.log({ item });
    };

    const prev = () => {
        router.push("set-goals");
    };
    const next = () => {
        if (selectedItems.length === 0) {
            return;
        }
        router.push("recommended-plans");
    };

    return (
        <>
            <div className="p-8 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
                    {/* Progress bar and label */}
                    <Progress aria-label="Loading..." value={100} disableAnimation={true} className="max-w-md" />
                    <div className="mb-4">
                        <div className="mt-2 text-center">
                            <span
                                id="progressLabel"
                                className="text-sm font-semibold text-gray-700"
                            >
                                <div className="text-left mt-4 text-lg">
                                    <label>Choose your plan</label>
                                </div>
                                {items.map((item) => (
                                    <SelectableItem
                                        key={item}
                                        item={item}
                                        onSelect={handleSelect}
                                        isSelected={selectedItems.includes(item)}
                                    />
                                ))}
                            </span>

                            <div className="mx-auto space-y-4 text-center mt-3">
                                <KFButton type="button" onClick={prev} className="mr-4" size="md">
                                    Previous
                                </KFButton>
                                <KFButton type="submit" onClick={next} size="md">Submit</KFButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetPlanPage;

SetPlanPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
