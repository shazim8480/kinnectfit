import { getItemFromLocalStorage } from "@/lib/utils";
import { useEnrollWorkoutModuleMutation, useGetEnrolledWorkoutModuleByUserIdQuery } from "@/redux/feature/workout/workout-api";
import { Checkbox, Chip, Spinner, cn } from "@nextui-org/react";
import { useState } from "react";

const UserCard = ({ module, isStarted, workoutModuleData, setIsCompleted, isCompleted, workoutID }) => {
  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');

  const [enrolled, setEnrolled] = useState([]);
  const [enrollWorkoutModule] = useEnrollWorkoutModuleMutation();
  const { data, isLoading } = useGetEnrolledWorkoutModuleByUserIdQuery(userData?._id);

  const userModules = data?.data[0]?.modules || [];  // Ensure data is not undefined
  // console.log("🚀 userModules", userModules);
  const isModuleEnrolled = userModules.some(userModule => userModule.module_id === module?._id);

  const workoutModules = workoutModuleData?.data[0]?.modules || [];

  // Create an array of module_ids from enrolledModules
  const userModuleIds = userModules.map(userModule => userModule.module_id);

  // Filter workoutModules based on enrolledModuleIds
  const matchedModules = workoutModules.filter(workoutModule => userModuleIds.includes(workoutModule.id));

  // console.log("🛩️ matched", matchedModules);

  setIsCompleted(workoutModules.length === matchedModules.length);


  const handleCheckboxClick = async () => {

    const updatedEnrolled = [...enrolled, { module_id: module?._id }];
    setEnrolled(updatedEnrolled);
    // console.log("🚀 workout module data", workoutModuleData);
    try {
      const enrollData = {
        data: {
          modules: updatedEnrolled,
          user: userData?._id,
          workout: workoutID,
          total_modules: workoutModuleData?.data[0]?.modules.length
        },
        accessToken
      };

      const resEnroll = await enrollWorkoutModule(enrollData);
      console.log("🚀 response", resEnroll);

    } catch (error) {
      console.error("Error enrolling module:", error);
    }

  };



  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // console.log("🚀all modules check", allModulesChecked);


  return (
    <div className="w-full py-4 mx-4 ">
      <Checkbox
        key={module?._id}
        aria-label={module?.module_name}
        onClick={handleCheckboxClick}
        isSelected={isModuleEnrolled}
        isDisabled={isStarted ? isModuleEnrolled || isCompleted : true}
        // isDisabled={confirmed === true ? true : false}
        classNames={{
          base: cn(
            "inline-flex w-full max-w-xl bg-gray-50",
            " items-center justify-center",
            "cursor-pointer rounded-lg gap-2 p-4 border-1 border-gray-200",
            "data-[selected=true]:border-primary"
          ),
          label: "w-full",
        }}
      >
        <div className="flex justify-end w-full gap-2 ">
          <div className="flex flex-col items-end gap-1 font-medium text-blue-900">
            {module?.module_name}
            <Chip color="success" size="sm" variant="flat">
              {module?.module_time} min
            </Chip>
          </div>
        </div>
      </Checkbox>
    </div >
  );
};

export default UserCard;
