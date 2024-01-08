import { Checkbox, Chip, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";

const UserCard = ({ module, handleCheck, isStarted }) => {
  console.log("🚀 ~ file: UserCard.jsx:5 ~ UserCard ~ module:", module);
  console.log("is started ", isStarted);

  const [confirmed, setIsConfirmed] = useState(false);
  console.log("🚀 ~ file: UserCard.jsx:8 ~ UserCard ~ confirmed:", confirmed);

  useEffect(() => {
    if (module?.isConfirmed !== undefined) {
      setIsConfirmed(module?.isConfirmed);
    }
  }, [confirmed, module?.isConfirmed]);

  return (
    <div className="w-full py-4 mx-4 ">
      <Checkbox
        key={module?.moduleName}
        aria-label={module?.moduleName}
        onClick={() => handleCheck(module)}
        isSelected={confirmed}
        isDisabled={confirmed === true ? true : false}
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
            {module?.moduleName}
            <Chip color="success" size="sm" variant="flat">
              {module?.moduleTime} min
            </Chip>
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default UserCard;
