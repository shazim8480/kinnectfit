import React, { useState } from "react";
import { KFInput } from "@/components/UI/KFInput";
import { KFButton } from "../UI/KFButton";
import { v4 as uuidv4 } from 'uuid';
const WorkoutModules = ({ register, errors, fields, append, remove }) => {
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const handleAppend = () => {
    // Show the delete button after the first append
    if (!isDeleteButtonVisible) {
      setDeleteButtonVisible(true);
    }
    append({ id: uuidv4(), moduleName: "", moduleTime: "" });
  };
  return (
    <div className="max-w-xs md:max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {fields.map((item, index) => {
          const isLastItem = index === fields.length - 1;
          const isFirstItem = index === 0;
          return (
            <div key={item.id}>
              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-4">
                {/* start module name */}
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="moduleName">Module Name</label>
                  </div>
                  <KFInput
                    name={`workout_modules[${index}].moduleName`}
                    type="text"
                    placeholder="Give a module name"
                    {...register(`workout_modules[${index}].moduleName`)}
                  />

                </div>
                {/* end module name */}

                {/* start module time  */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-left mt-4 text-base mb-3">
                      <label htmlFor="moduleTime">Module Time</label>
                    </div>
                    <div>
                      <div>
                        <KFInput
                          name={`workout_modules[${index}].moduleTime`}
                          type="text"
                          placeholder="Give a workout name"
                          {...register(`workout_modules[${index}].moduleTime`)}
                        />

                      </div>
                    </div>
                  </div>
                  <div className="place-self-end">
                    {
                      !isFirstItem &&
                      <KFButton
                        type="button"
                        size="sm"
                        className="text-red-50 bg-red-700"
                        onClick={() => remove(index)}
                      >
                        {/* <MinusIcon /> */}
                        Remove
                      </KFButton>
                    }
                  </div>
                </div>

                {/* end module time  */}
              </div>

              <div className="">
                {isLastItem && (
                  <KFButton size="sm" color="secondary" onClick={handleAppend}>
                    Add
                  </KFButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <section>
        {/* <button type="button" onClick={handleAppend}>
          append
        </button> */}
      </section>
    </div>
  );
};

export default WorkoutModules;
