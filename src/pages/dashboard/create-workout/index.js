import CreateWorkout from '@/components/CreateWorkout/CreateWorkout';
import WorkoutModules from '@/components/CreateWorkout/WorkoutModules';
import { KFButton } from '@/components/UI/KFButton';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { useCreateWorkoutMutation } from '@/redux/feature/workout/workout-api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from '@/redux/feature/user/user-api';

const CreateWorkoutPage = () => {
    const [updateUser] = useUpdateUserMutation();
    const { user } = useSelector((state) => state?.user);
    const router = useRouter();
    const [createWorkout] = useCreateWorkoutMutation();
    const dispatch = useDispatch();
    const [formSteps, setFormSteps] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            workout_modules: [{ id: uuidv4(), moduleName: "", moduleTime: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workout_modules",
    });

    const onSubmit = async (data) => {
        console.log(data);
        // return;
        // const mealData = { ...data, ingredients: items };
        // console.log(object)
        let createWorkoutResponse = await createWorkout({ ...data, trainer_id: user?.id });
        console.log("createWorkoutResponse", createWorkoutResponse);
        const updateUserInfo = {
            data: {
                workout: data
            },
            userId: user?.id
        };
        // console.log("mealplan-response", createMealPlanResponse?.data?.status);
        // console.log("updateuserinfo", updateUserInfo);
        // return;
        if (createWorkoutResponse?.data?.status === 201) {
            const result = await updateUser(updateUserInfo);
            router.push("/dashboard");
            console.log(result);
            // reset();
        } else if (createWorkoutResponse?.error) {
            console.log("err msg", createWorkoutResponse?.error);
        }
    };

    const handleNext = () => {
        setFormSteps(formSteps + 1);
    };

    const prev = () => {
        setFormSteps(formSteps - 1);
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                {
                    formSteps === 0 && <CreateWorkout register={register} errors={errors} />
                }
                {
                    formSteps === 1 && <WorkoutModules register={register} errors={errors} fields={fields} append={append} remove={remove} />
                }

                {/* {
                    <WorkoutModules register={register} errors={errors} fields={fields} append={append} remove={remove} />
                } */}

                <div className='text-center flex gap-4 justify-center'>
                    {
                        formSteps === 1 && <KFButton color="secondary" size="lg" className="mt-4" onClick={prev}>
                            Prev
                        </KFButton>
                    }
                    {
                        (formSteps === 0 && formSteps < 1) && <KFButton color="secondary" size="lg" className="mt-4" onClick={() => { handleNext(); }} >
                            Next
                        </KFButton>
                    }
                    {
                        (formSteps === 1) && <KFButton color="secondary" size="lg" className="mt-4" type='submit' >
                            Create Workout
                        </KFButton>
                    }
                </div>

            </form>
        </div>
    );
};

export default CreateWorkoutPage;

CreateWorkoutPage.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};