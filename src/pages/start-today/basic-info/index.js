import React, { useReducer, useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Progress, Radio, RadioGroup } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setFormValues } from "@/redux/feature/survey/surveySlice";

const BasicInfoPage = () => {
  const dispatch = useDispatch();
  const [weightUnit, setWeightUnit] = useState("kg");
  const [goalWeightUnit, setGoalWeightUnit] = useState("kg");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      const userData = {
        height: data.height,
        weight: data.weight,
        goalWeight: data.goalWeight,
      };
      // ({ userData });
      dispatch(setFormValues(userData));
      router.push("more-info");
    }
  };
  return (
    <>
      <div className="p-8 bg-gray-100">
        <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
          {/* Progress bar and label */}
          <div className="mb-4">
            <div className="flex items-center"></div>
            <div className="mt-2 text-center">
              <span
                id="progressLabel"
                className="text-sm font-semibold text-gray-700"
              >
                <div key={1} className="min-h-[250px]">
                  <Progress
                    aria-label="Loading..."
                    value={0}
                    disableAnimation={true}
                    className="max-w-md"
                  />
                  <div className="flex items-center justify-center py-5 bg-white ">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-full"
                      action="#"
                      method="POST"
                    >
                      <div className="mb-2 text-base text-left">
                        <label>How tall are you ?</label>
                      </div>

                      <KFInput
                        id="height"
                        name="height"
                        required
                        label="height"
                        variant="bordered"
                        size="xl"
                        placeholder="cm"
                        {...register("height", {
                          required: "Please enter your height",
                          pattern: {
                            value: /^(0|[1-9]\d*)$/,
                            message: "Please enter height in digit.",
                          },
                        })}
                      />
                      {errors.height && (
                        <p className="mt-1 text-left text-red-500">
                          {errors.height.message}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="mt-4 text-base text-left">
                          <label>How much do you weight?</label>
                        </div>
                        <div>
                          {/* <div>
                            <RadioGroup
                              className="mt-2 text-base text-left"
                              orientation="horizontal"
                              defaultValue="kg"
                            >
                              <Radio
                                value="kg"
                                onClick={() => setWeightUnit("kg")}
                              >
                                {" "}
                                <span className="text-sm text-gray-500">
                                  kg
                                </span>
                              </Radio>
                              <Radio
                                value="lbs"
                                onClick={() => setWeightUnit("lbs")}
                              >
                                <span className="text-sm text-gray-500">
                                  lbs
                                </span>
                              </Radio>
                            </RadioGroup>
                          </div> */}
                        </div>
                      </div>
                      <KFInput
                        id="weight"
                        name="weight"
                        required
                        label="weight"
                        variant="bordered"
                        size="xl"
                        placeholder={weightUnit}
                        className="mt-2"
                        {...register("weight", {
                          required: "Please enter your weight",
                          pattern: {
                            value: /^(0|[1-9]\d*)$/,
                            message: "Please enter weight in digit.",
                          },
                        })}
                      />
                      {errors.weight && (
                        <p className="mt-1 text-left text-red-500">
                          {errors.weight.message}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="mt-4 text-base text-left">
                          <label>What is your goal weight?</label>
                        </div>
                        {/* <div>
                          <RadioGroup
                            className="mt-2 text-base text-left"
                            orientation="horizontal"
                            defaultValue="kg"
                          >
                            <Radio
                              value="kg"
                              onClick={() => setGoalWeightUnit("kg")}
                            >
                              {" "}
                              <span className="text-sm text-gray-500">kg</span>
                            </Radio>
                            <Radio
                              value="lbs"
                              onClick={() => setGoalWeightUnit("lbs")}
                            >
                              <span className="text-sm text-gray-500">lbs</span>
                            </Radio>
                          </RadioGroup>
                        </div> */}
                      </div>

                      <KFInput
                        id="goalWeight"
                        name="goalWeight"
                        required
                        label="goalWeight"
                        variant="bordered"
                        size="xl"
                        placeholder={goalWeightUnit}
                        className="mt-2"
                        {...register("goalWeight", {
                          required: "Please enter your goal weight",
                          pattern: {
                            value: /^(0|[1-9]\d*)$/,
                            message: "Please enter goal weight in digit.",
                          },
                        })}
                      />
                      {errors.goalWeight && (
                        <p className="mt-1 text-left text-red-500">
                          {errors.goalWeight.message}
                        </p>
                      )}
                      <div className="pt-6 mx-auto space-y-4 text-center">
                        <KFButton type="submit">Next</KFButton>
                      </div>
                    </form>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfoPage;

BasicInfoPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
