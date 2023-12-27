import React, { useState } from "react";
import { KFButton } from "@/components/UI/KFButton";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { Progress, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { countries } from "@/lib/db/country-data";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const MoreInfoPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        // Check if there are no errors before navigating
        if (Object.keys(errors).length === 0) {
            router.push("set-goals");
        }
    };
    const prev = () => {
        router.push("basic-info");
    };

    return (
        <>
            <div className="p-8 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
                    <Progress aria-label="Loading..." value={33} disableAnimation={true} className="max-w-md" />
                    {/* Progress bar and label */}
                    <div className="mb-4">
                        <div className="mt-2 text-center">
                            <span
                                id="progressLabel"
                                className="text-sm font-semibold text-gray-700"
                            >
                                <div key={2} className="min-h-[250px]">
                                    <div className="flex items-center justify-center py-5 bg-white ">
                                        <form onSubmit={handleSubmit(onSubmit)} className="w-full" action="#" method="POST">
                                            <div>
                                                <div className="text-left text-lg mb-2">
                                                    <label>Select your gender</label>
                                                </div>
                                                <RadioGroup
                                                    className="text-left mt-2 text-lg"
                                                    orientation="horizontal"
                                                >
                                                    <Radio value="male"  {...register("gender", {
                                                        required: "Gender is required",
                                                    })} >  <span className="text-gray-600">Male</span></Radio>
                                                    <Radio value="female" {...register("gender", {
                                                        required: "Please select your gender",
                                                    })} >
                                                        <span className="text-gray-600">Female</span>
                                                    </Radio>
                                                </RadioGroup>
                                                {errors.gender && (
                                                    <p className="text-red-600 text-left mt-1">{errors.gender.message}</p>
                                                )}
                                            </div>
                                            <div className="text-left mt-4 text-lg">
                                                <label>Where do you live?</label>
                                            </div>
                                            <Select
                                                items={countries}
                                                label="Select your country"
                                                className="max-w-l mt-3"
                                                {...register("country", {
                                                    required: "Please select your country",
                                                })}
                                            >
                                                {(country) => (
                                                    <SelectItem key={country.value}>{country.label}</SelectItem>
                                                )}
                                            </Select>
                                            {errors.country && (
                                                <p className="text-red-600 text-left mt-1">{errors.country.message}</p>
                                            )}
                                            <div className="text-left mt-4 text-lg">
                                                <label>How old are you?</label>
                                            </div>
                                            <KFInput
                                                id="age"
                                                name="age"
                                                required
                                                label="age"
                                                variant="bordered"
                                                size="xl"
                                                className="mt-3"
                                                {...register('age', {
                                                    required: 'Please select your age',
                                                    pattern: {
                                                        value: /^(0|[1-9]\d*)$/,
                                                        message: 'Please enter age in digit.',
                                                    },
                                                })}
                                            />
                                            {errors.age && <p className="text-red-600 text-left mt-1">{errors.age.message}</p>}
                                            <div className="mx-auto space-y-4 text-center mt-3">
                                                <KFButton type="button" onClick={prev} className="mr-4" size="md">
                                                    Previous
                                                </KFButton>
                                                <KFButton type="submit" size="md">Next</KFButton>
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

export default MoreInfoPage;

MoreInfoPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
