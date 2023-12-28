import React, { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import { useRouter } from "next/router";
import SelectableItem from "@/components/StartToday/SelectableItems/SelectableItems";
import { KFButton } from "@/components/UI/KFButton";
import { Progress } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setFormValues } from "@/redux/feature/survey/surveySlice";

const SetPlanPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.surveyForm);

  const items = ["7 days", "15 days", "30 days", "60 days"];
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = (item) => {
    setSelectedItems([item]);
  };

  const prev = () => {
    router.push("set-goals");
  };
  const onSubmit = (data) => {
    if (selectedItems.length === 0) {
      return;
    }
    console.log("plan", data, selectedItems[0]);
    const selectedPlan = selectedItems[0];
    dispatch(setFormValues({ ...formData, plan: selectedPlan }));
    router.push("recommended-plans");
  };

  return (
    <>
      <div className="p-8 bg-gray-100">
        <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
          {/* Progress bar and label */}
          <Progress
            aria-label="Loading..."
            value={100}
            disableAnimation={true}
            className="max-w-md"
          />
          <div className="mb-4">
            <div className="mt-2 text-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <span
                  id="progressLabel"
                  className="text-sm font-semibold text-gray-700"
                >
                  <div className="mt-4 text-lg text-left">
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

                <div className="mx-auto mt-3 space-y-4 text-center">
                  <KFButton
                    type="button"
                    onClick={prev}
                    className="mr-4"
                    size="md"
                  >
                    Previous
                  </KFButton>
                  <KFButton type="submit" size="md">
                    Submit
                  </KFButton>
                </div>
              </form>
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
