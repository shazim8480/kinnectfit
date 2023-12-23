import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import { KFButton } from "@/components/UI/KFButton";
import Link from "next/link";
import React from "react";

const Step4 = () => {
  return (
    <div className="min-h-[250px] " key={3}>
      <div className="flex flex-col justify-center h-[250px] items-center">
        <span className="mb-3 text-lg text-blue-900">
          Thanks for giving information.
        </span>
        <KFButton
          as={Link}
          href="basic-info/choose-plan"
          type="button"
          // variant="bordered"
          size="lg"
          className="font-semibold text-blue-800 border-2 border-blue-500 bg-indigo-50"
        >
          Choose your Plan
          <RightArrowIcon />
        </KFButton>
      </div>
    </div>
  );
};

export default Step4;
