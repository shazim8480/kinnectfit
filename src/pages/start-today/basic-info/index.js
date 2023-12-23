import React, { useState } from "react";

import Step1 from "@/components/StartToday/Steps/Step1";
import Step2 from "@/components/StartToday/Steps/Step2";
import Step3 from "@/components/StartToday/Steps/Step3";
import Step4 from "@/components/StartToday/Steps/Step4";
import { KFButton } from "@/components/UI/KFButton";

import MainLayout from "@/layouts/mainLayout";

const BasicInfoPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;
  const steps = [
    <Step1 key={1} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    <Step4 key={4} />,
  ];

  return (
    <>
      <div className="p-8 bg-gray-100">
        <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
          {/* Progress bar and label */}
          <div className="mb-4">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  id="progressBar"
                  className="h-2 bg-blue-900 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span
                id="progressLabel"
                className="text-sm font-semibold text-gray-700"
              >
                {steps[currentStep - 1]}
              </span>
            </div>
          </div>
          <form className="mx-auto space-y-4 text-center">
            {/* Buttons for navigating between steps */}
            {currentStep > 1 && currentStep < 4 && (
              <KFButton type="button" onClick={prev} className="mr-4" size="md">
                Previous
              </KFButton>
            )}
            {currentStep < 4 && <KFButton onClick={next}>Next</KFButton>}
          </form>
        </div>
      </div>
    </>
  );
};

export default BasicInfoPage;

BasicInfoPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
