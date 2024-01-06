import React, { useState } from "react";
import { KFInput } from "../UI/KFInput";
import { useForm } from "react-hook-form";
import { KFButton } from "../UI/KFButton";
import { useSelector } from "react-redux";
import { calculateBmi } from "@/lib/getBMI";

const TrainerForm = () => {
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weightValue, setWeightValue] = useState("");
  console.log(
    "🚀 ~ file: TrainerForm.jsx:11 ~ TrainerForm ~ weightValue:",
    weightValue
  );
  const [heightValue, setHeightValue] = useState("");
  console.log(
    "🚀 ~ file: TrainerForm.jsx:13 ~ TrainerForm ~ heightValue:",
    heightValue
  );

  const bmi = calculateBmi(heightValue, weightValue);
  console.log("🚀 ~ file: TrainerForm.jsx:16 ~ TrainerForm ~ bmi:", bmi);

  const userProfile = useSelector((state) => state.user);
  console.log("🚀 ~ userProfile:", userProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      //   const trainerData = {
      //     trainer_id: userProfile?.user?.id,
      //     age: data.age,
      //     height: data.height,
      //     weight: data.weight,
      //     BMI: data.BMI
      //   };
      // ({ userData });
      // dispatch(setFormValues(userData));
      // router.push("more-info");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        action="#"
        method="POST"
      >
        <section className="grid grid-cols-1 gap-8 my-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {/* Name */}
          <div>
            <div className="mt-4 text-base text-left">
              <label>Trainer Name</label>
            </div>
            <KFInput
              id="name"
              name="name"
              label="name"
              placeholder={userProfile?.user?.name}
              isDisabled
              variant="faded"
              size="xl"
              className="mt-3"
            />
          </div>

          {/* Email */}
          <div>
            <div className="mt-4 text-base text-left">
              <label>Trainer Email</label>
            </div>
            <KFInput
              id="email"
              name="email"
              label="email"
              placeholder={userProfile?.user?.email}
              isDisabled
              variant="faded"
              size="xl"
              className="mt-3"
            />
          </div>

          {/* Age */}
          <div>
            <div className="mt-4 text-base text-left">
              <label>Enter your Age</label>
            </div>
            <KFInput
              id="age"
              name="age"
              required
              label="age"
              placeholder="Age"
              variant="bordered"
              size="xl"
              className="mt-3"
              {...register("age", {
                required: "Please select your age",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Please enter age in digit.",
                },
              })}
            />
            {errors.age && (
              <p className="mt-1 text-left text-red-500">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* height */}
          <div>
            <div className="mt-4 mb-2 text-base text-left">
              <label>Enter your Height (cm)</label>
            </div>

            <KFInput
              id="height"
              name="height"
              required
              label="height"
              //   value={heightValue}
              control={control}
              onChange={(text) => setHeightValue(text)}
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
          </div>

          {/* weight */}
          <div>
            <div className="flex items-center justify-between">
              <div className="mt-4 text-base text-left">
                <label>Enter your Weight (kg)</label>
              </div>
            </div>
            <KFInput
              id="weight"
              name="weight"
              required
              label="weight"
              variant="bordered"
              size="xl"
              value={weightValue}
              control={control}
              onChange={(text) => setWeightValue(text)}
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
          </div>

          {/* calculate BMI */}
          <div>
            <div className="flex items-center justify-between">
              <div className="mt-4 text-base text-left">
                <label>BMI Calculation</label>
              </div>
            </div>
            <KFInput
              id="BMI"
              name="BMI"
              label="BMI"
              variant="faded"
              value={bmi ? bmi.toFixed(2) : null}
              isDisabled
              size="xl"
              //   placeholder={calculatedBMI}
              className="mt-2"
              {...register("BMI", {
                required: "BMI is required!",
                pattern: {
                  value: /^(0|[1-9]\d*)$/,
                  message: "Please enter weight in digit.",
                },
              })}
            />
            {errors.BMI && (
              <p className="mt-1 text-left text-red-500">
                {errors.BMI.message}
              </p>
            )}
          </div>
        </section>

        {/* submit registration */}
        <div className="pt-6 mx-auto space-y-4 text-center">
          <KFButton size="lg" type="submit">
            Register
          </KFButton>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;
