import React from "react";
import { KFButton } from "@/components/UI/KFButton";
import MainLayout from "@/layouts/mainLayout";
import { KFInput } from "@/components/UI/KFInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Progress } from "@nextui-org/react";

const BasicInfoPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            router.push("more-info");
        }
    };
    return (
        <>
            <div className="p-8 bg-gray-100">
                <div className="max-w-md p-8 mx-auto bg-white rounded shadow-md">
                    {/* Progress bar and label */}
                    <div className="mb-4">
                        <div className="flex items-center">
                        </div>
                        <div className="mt-2 text-center">
                            <span
                                id="progressLabel"
                                className="text-sm font-semibold text-gray-700"
                            >
                                <div key={1} className="min-h-[250px]">
                                    <Progress aria-label="Loading..." value={0} disableAnimation={true} className="max-w-md" />
                                    <div className="flex items-center justify-center py-5 bg-white ">

                                        <form onSubmit={handleSubmit(onSubmit)} className="w-full" action="#" method="POST">
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
                                                {...register('height', {
                                                    required: 'Please enter your height',
                                                    pattern: {
                                                        value: /^(0|[1-9]\d*)$/,
                                                        message: 'Please enter height in digit.',
                                                    },
                                                })}
                                            />
                                            {errors.height && <p className="text-red-600 text-left mt-1">{errors.height.message}</p>}
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
                                                {...register('weight', {
                                                    required: 'Please enter your weight',
                                                    pattern: {
                                                        value: /^(0|[1-9]\d*)$/,
                                                        message: 'Please enter weight in digit.',
                                                    },
                                                })}
                                            />
                                            {errors.weight && <p className="text-red-600 text-left mt-1">{errors.weight.message}</p>}
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
                                                {...register('goalWeight', {
                                                    required: 'Please enter your goal weight',
                                                    pattern: {
                                                        value: /^(0|[1-9]\d*)$/,
                                                        message: 'Please enter goal weight in digit.',
                                                    },
                                                })}
                                            />
                                            {errors.goalWeight && <p className="text-red-600 text-left mt-1">{errors.goalWeight.message}</p>}
                                            <div className="mx-auto space-y-4 pt-6 text-center">
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
