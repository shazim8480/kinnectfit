import { KFInput } from "@/components/UI/KFInput";
import React from "react";

const Step1 = () => {
  return (
    <div key={1} className="min-h-[250px]">
      <div className="flex items-center justify-center py-5 bg-white ">
        <form className="w-full" action="#" method="POST">
          <div className="text-left mb-2  text-lg">
            <label>How tall are you ?</label>
          </div>
          <KFInput
            id="height"
            name="height"
            required
            label="height"
            variant="bordered"
            size="xl"
            placeholder="ft"
          />
          <div className="text-left mt-4 text-lg">
            <label>How much do you weight?</label>
          </div>
          <KFInput
            id="weight"
            name="weight"
            required
            label="weight"
            variant="bordered"
            size="xl"
            placeholder="lbs"
            className="mt-2"
          />
          <div className="text-left mt-4 text-lg">
            <label>What is your goal weight?</label>
          </div>
          <KFInput
            id="goalWeight"
            name="goalWeight"
            required
            label="goalWeight"
            variant="bordered"
            size="xl"
            placeholder="lbs"
            className="mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Step1;
