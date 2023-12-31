import React from "react";
import { KFInput } from "@/components/UI/KFInput";
const WorkoutModules = ({ register, errors }) => {
  return (
    <div className="max-w-xs md:max-w-lg mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/*starts module name */}
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="moduleName">Module Name</label>
          </div>
          <KFInput
            name="moduleName"
            type="text"
            placeholder="Give a workout name"
            {...register("moduleName", {
              required: "You must need to give a workout name",
            })}
          />
          {errors.moduleName && (
            <p className="text-red-500 text-left mt-1">
              {errors.moduleName.message}
            </p>
          )}
        </div>
        {/*ends module name */}

        {/*starts module time */}
        <div>
          <div className="text-left mt-4 text-base mb-3">
            <label htmlFor="moduleTime">Module Time</label>
          </div>
          <KFInput
            name="moduleTime"
            size="xl"
            placeholder="Minutes"
            {...register("moduleTime", {
              required: "Set module duration",
              pattern: {
                value: /^(0|[1-9]\d*)$/,
                message: "Minutes can't be letter.",
              },
            })}
          />
          {errors.moduleTime && (
            <p className="text-red-500 text-left mt-1">
              {errors.moduleTime.message}
            </p>
          )}
        </div>
        {/*ends module time */}
      </div>
    </div>
  );
};

export default WorkoutModules;
