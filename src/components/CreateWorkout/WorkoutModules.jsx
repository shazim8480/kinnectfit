import React, { useState } from "react";
import { KFInput } from "@/components/UI/KFInput";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { MinusIcon } from "@/assets/icons/MinusIcon";
import { KFButton } from "../UI/KFButton";
const WorkoutModules = ({ register, errors, fields, append, remove }) => {
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const handleAppend = () => {
    // Show the delete button after the first append
    if (!isDeleteButtonVisible) {
      setDeleteButtonVisible(true);
    }
    append({ moduleName: "", moduleTime: "" });
  };
  return (
    <div className="max-w-xs md:max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {fields.map((item, index) => {
          const isLastItem = index === fields.length - 1;
          return (
            <div key={item.id}>
              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-4">
                {/* start module name */}
                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="moduleName">Module Name</label>
                  </div>
                  <KFInput
                    name={`workoutModules[${index}].moduleName`}
                    type="text"
                    placeholder="Give a module name"
                    {...register(`workoutModules[${index}].moduleName`, {
                      required: "You must need to give a module name",
                    })}
                  />
                  {errors?.[`workoutModules.${index}.moduleName`] && (
                    <p className="text-red-500 text-left mt-1">
                      {errors[`workoutModules.${index}.moduleName`].message}
                    </p>
                  )}
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
                          name={`workoutModules[${index}].moduleTime`}
                          type="text"
                          placeholder="Give a workout name"
                          {...register(`workoutModules[${index}].moduleTime`, {
                            required: "You must need to give a module time",
                          })}
                        />
                        {errors?.[`workoutModules.${index}.moduleTime`] && (
                          <p className="text-red-500 text-left mt-1">
                            {
                              errors[`workoutModules.${index}.moduleTime`]
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="place-self-end">
                    {!isLastItem && isDeleteButtonVisible && (
                      <KFButton
                        type="button"
                        size="sm"
                        className="text-red-600"
                        onClick={() => remove(index)}
                      >
                        {/* <MinusIcon /> */}
                        Remove
                      </KFButton>
                    )}
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
