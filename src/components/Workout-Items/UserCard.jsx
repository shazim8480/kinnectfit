import { Checkbox, Chip, cn } from "@nextui-org/react";

const UserCard = ({ module, handleCheck, isStarted }) => {
  console.log("stert ", isStarted);
  return (
    <div className="py-4 w-full">
      <Checkbox
        key={module.moduleName}
        aria-label={module.moduleName}
        onClick={() => handleCheck(module)}
        isSelected={module.isConfirmed}
        isDisabled={!isStarted}
        classNames={{
          base: cn(
            "inline-flex w-full max-w-xl bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          label: "w-full",
        }}
      >
        <div className="w-full flex justify-end gap-2">
          <div className="flex flex-col items-end gap-1">
            {module.moduleName}
            <Chip color="success" size="sm" variant="flat">
              {module.moduleTime} min
            </Chip>
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default UserCard;
