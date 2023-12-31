import CreateWorkout from '@/components/CreateWorkout/CreateWorkout';
import WorkoutModules from '@/components/CreateWorkout/WorkoutModules';
import { KFButton } from '@/components/UI/KFButton';

import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const CreateWorkoutPage = () => {
    const [formSteps, setFormSteps] = useState(0);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
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
                    formSteps === 1 && <WorkoutModules register={register} errors={errors} />
                }

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