import { useState } from "react";
import { KFInput } from "@/components/UI/KFInput";
import { KFButton } from "../UI/KFButton";

const WorkoutModules = ({ register, fields, append, remove }) => {
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const handleAppend = () => {
    // Show the delete button after the first append
    if (!isDeleteButtonVisible) {
      setDeleteButtonVisible(true);
    }
    append({ module_name: "", module_time: "" });
  };
  return (
    <div className="max-w-xs mx-auto md:max-w-3xl">
      <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        {fields.map((item, index) => {
          const isLastItem = index === fields.length - 1;
          const isFirstItem = index === 0;
          return (
            <div key={item.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                {/* start module name */}
                <div>
                  <div className="mt-4 mb-3 text-base text-left">
                    <label htmlFor="module_name">Module Name</label>
                  </div>
                  <KFInput
                    name={`modules[${index}].module_name`}
                    type="text"
                    placeholder="Give a module name"
                    {...register(`modules[${index}].module_name`)}
                  />
                </div>
                {/* end module name */}

                {/* start module time  */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="mt-4 mb-3 text-base text-left">
                      <label htmlFor="module_time">Module Time</label>
                    </div>
                    <div>
                      <div>
                        <KFInput
                          name={`modules[${index}].module_time`}
                          type="text"
                          placeholder="Give a module time"
                          {...register(`modules[${index}].module_time`)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="place-self-end">
                    {!isFirstItem && (
                      <KFButton
                        type="button"
                        size="sm"
                        className="bg-red-700 text-red-50"
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
