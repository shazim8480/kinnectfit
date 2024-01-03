import CreateWorkout from '@/components/CreateWorkout/CreateWorkout';
import WorkoutModules from '@/components/CreateWorkout/WorkoutModules';
import { KFButton } from '@/components/UI/KFButton';

import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { useCreateWorkoutMutation } from '@/redux/feature/workout/workout-api';
import { setWorkoutValues } from '@/redux/feature/workout/workoutSlice';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
const CreateWorkoutPage = () => {
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
            workoutModules: [{ moduleName: "", moduleTime: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workoutModules",
    });

    const onSubmit = async (data) => {
        // console.log(data);
        dispatch(setWorkoutValues(data));
        setFormSteps(formSteps + 1);
        // if (Object.keys(errors).length === 0) {
        let createWorkoutResponse = await createWorkout(data);
        // console.log("sign in response", signInResponse);
        if (createWorkoutResponse?.data?.status === 200) {
            reset();
            router.push("/dashboard");
        } else if (createWorkoutResponse?.error) {
            console.log("err msg", createWorkoutResponse?.error);
        }
        // }

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
                        (formSteps === 0 && formSteps < 1) && <KFButton color="secondary" size="lg" className="mt-4" type='submit' >
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