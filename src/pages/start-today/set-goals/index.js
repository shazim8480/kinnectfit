import React, { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/router";
import SelectableItem from "@/components/StartToday/SelectableItems/SelectableItems";
import { KFButton } from "@/components/UI/KFButton";
import { Progress } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setFormValues } from "@/redux/feature/survey/surveySlice";

const SetGoalsPage = () => {
    const dispatch = useDispatch();
    const items = ["Lose Weight", "Gain Weight", "Gain Muscle", "Maintain Weight"];
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState([]);
    const [goal, setGoal] = useState("");
    const handleSelect = (item) => {
        setSelectedItems([item]);
        // console.log({ item });
        setGoal(item);
    };

    const prev = () => {
        router.push("more-info");
    };
    const next = () => {
        if (selectedItems.length === 0) {
            return;
        }
        dispatch(setFormValues({ goal }));
        // console.log(goal);
        router.push("set-plan");
    };

    return (
        <>
            <div className="p-8 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
                    {/* Progress bar and label */}
                    <Progress aria-label="Loading..." value={66} disableAnimation={true} className="max-w-md" />
                    <div className="mb-4">
                        <div className="mt-2 text-center">
                            <span
                                id="progressLabel"
                                className="text-sm font-semibold text-gray-700"
                            >
                                <div className="text-left mt-4 text-lg">
                                    <label>Choose your goals</label>
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
                                <KFButton type="submit" onClick={next} size="md">Next</KFButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetGoalsPage;

SetGoalsPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};