import CreateWorkout from "@/components/CreateWorkout/CreateWorkout";
import WorkoutModules from "@/components/CreateWorkout/WorkoutModules";
import { KFButton } from "@/components/UI/KFButton";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { useCreateWorkoutModuleMutation, useCreateWorkoutMutation } from "@/redux/feature/workout/workout-api";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getItemFromLocalStorage } from "@/lib/utils";

const CreateWorkoutPage = () => {
  const [files, setFiles] = useState([]);
  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');
  const dispatch = useDispatch();
  const router = useRouter();
  // redux states
  const { user } = useSelector((state) => state?.user);
  const workoutState = useSelector((state) => state.workout);
  console.log("cover of workout", workoutState);
  const [workoutId, setWorkoutId] = useState("");
  const [createWorkout] = useCreateWorkoutMutation();
  const [createWorkoutModule] = useCreateWorkoutModuleMutation();

  const [formSteps, setFormSteps] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      modules: [{ module_name: "", module_time: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "modules",
  });

  const onSubmit = async (data) => {
    let workout;
    const { modules, ...workoutData } = data;

    if (formSteps === 0) {

      const createWorkoutData = {
        data: {
          ...workoutData,
          workout_cover: files,
          trainer: userData?._id
        }, accessToken
      };

      try {
        const createWorkoutRes = await createWorkout(createWorkoutData);
        // console.log("☘️ createModuleRes", createWorkoutRes);

        workout = createWorkoutRes?.data?.data?._id;
        setWorkoutId(workout);

        if (createWorkoutRes?.data?.statusCode === 200) {

          handleNext();
        }
      } catch (error) {
        alert(error.message);
        console.log("Error occured", error);
      }
    }

    else if (formSteps === 1) {
      const createModuleData = {
        data: {
          modules: modules,
          workout: workoutId,
          trainer: userData?._id
        }, accessToken
      };
      const createModuleRes = await createWorkoutModule(createModuleData);
      if (createModuleRes?.data?.statusCode === 200) {
        router.push('/dashboard/trainer-summary');
      }
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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {formSteps === 0 && (
          <CreateWorkout files={files} setFiles={setFiles} register={register} errors={errors} />
        )}
        {formSteps === 1 && (
          <WorkoutModules
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
          />
        )}

        {/* {
                    <WorkoutModules register={register} errors={errors} fields={fields} append={append} remove={remove} />
                } */}

        <div className="flex justify-center gap-4 text-center">
          {formSteps === 1 && (
            <KFButton
              color="secondary"
              size="md"
              className="mt-4"
              onClick={prev}
            >
              Prev
            </KFButton>
          )}
          {formSteps === 0 && formSteps < 1 && (
            <KFButton
              color="secondary"
              size="md"
              className="mt-4"
              type="submit"
            // onClick={() => {
            //   handleNext();
            // }}
            >
              Next
            </KFButton>
          )}
          {formSteps === 1 && (
            <KFButton
              color="secondary"
              size="md"
              className="mt-4"
              type="submit"
            >
              Create Workout
            </KFButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateWorkoutPage;

CreateWorkoutPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
