import { getItemFromLocalStorage } from "@/lib/utils";
import { useEnrollWorkoutModuleMutation, useGetEnrolledWorkoutModuleByUserIdQuery } from "@/redux/feature/workout/workout-api";
import { Checkbox, Chip, Spinner, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";

const UserCard = ({ module, workoutModuleData, handleCheck, isStarted }) => {

  const userData = getItemFromLocalStorage('userData');
  const accessToken = getItemFromLocalStorage('accessToken');

  const [enrolled, setEnrolled] = useState([]);
  const [enrollWorkoutModule] = useEnrollWorkoutModuleMutation();
  const { data, isLoading } = useGetEnrolledWorkoutModuleByUserIdQuery(userData?._id);
  // console.log("💚enrolled modules", data?.data[0].modules);

  const userModules = data?.data[0]?.modules || [];  // Ensure data is not undefined

  const isModuleEnrolled = userModules.some(userModule => userModule.module_id === module?._id);


  const handleCheckboxClick = async () => {

    const updatedEnrolled = [...enrolled, { module_id: module?._id }];
    setEnrolled(updatedEnrolled);
    try {
      const enrollData = {
        data: {
          modules: updatedEnrolled,
          user: userData?._id
        },
        accessToken
      };
      await enrollWorkoutModule(enrollData);
    } catch (error) {
      console.error("Error enrolling module:", error);
    }

  };

  // const enrollResponse = await enrollWorkoutModule(enrollData);

  // console.log(" ~ file: UserCard.jsx:5 ~ UserCard ~ module:", module);
  // console.log("is started ", isStarted);

  // console.log("🚀 ~ file: UserCard.jsx:8 ~ UserCard ~ confirmed:", confirmed);

  // useEffect(() => {
  //   if (module?.isConfirmed !== undefined) {
  //     setIsConfirmed(module?.isConfirmed);
  //   }
  // }, [confirmed, module?.isConfirmed]);

  // const handleCheckboxClick = () => {
  //   setEnrolled((prevEnrolled) => {
  //     const isModuleEnrolled = prevEnrolled.some((item) => item.module_id === module?._id);

  //     if (!isModuleEnrolled) {
  //       // If module is not enrolled, add it to the enrolled array
  //       return [...prevEnrolled, { module_id: module?._id }];
  //     }

  //     // If module is already enrolled, do not modify the enrolled array
  //     return prevEnrolled;
  //   });
  // };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }


  return (
    <div className="w-full py-4 mx-4 ">
      <Checkbox
        key={module?._id}
        aria-label={module?.module_name}
        onClick={handleCheckboxClick}
        // onClick={(prev) => setEnrolled([...prev, { module_id: module?._id }])}
        // onClick={() => handleCheck(module)}
        isSelected={isModuleEnrolled}
        isDisabled={isModuleEnrolled}
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
