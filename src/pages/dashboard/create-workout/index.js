import CreateWorkout from '@/components/CreateWorkout/CreateWorkout';
import WorkoutModules from '@/components/CreateWorkout/WorkoutModules';
import { KFButton } from '@/components/UI/KFButton';

import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { setWorkoutValues } from '@/redux/feature/workout/workoutSlice';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
const CreateWorkoutPage = () => {
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

    const onSubmit = (data) => {
        // console.log(data);
        dispatch(setWorkoutValues(data));
        setFormSteps(formSteps + 1);
        reset();
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