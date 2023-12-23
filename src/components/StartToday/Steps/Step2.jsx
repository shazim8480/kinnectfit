import { KFInput } from "@/components/UI/KFInput";
import { countries } from "@/lib/db/country-data";
import { Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import React from "react";

const Step2 = () => {
  return (
    <div key={2} className="min-h-[250px]">
      <div className="flex items-center justify-center py-5 bg-white ">
        <form className="w-full" action="#" method="POST">
          <div className="text-left text-lg">
            <label>Select your gender</label>
          </div>
          <RadioGroup
            className="text-left mt-2 text-lg"
            orientation="horizontal"
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </RadioGroup>
          <div className="text-left mt-4 text-lg">
            <label>Where do you live?</label>
          </div>
          <Select
            items={countries}
            label="Select your country"
            className="max-w-l"
          >
            {(country) => (
              <SelectItem key={country.value}>{country.label}</SelectItem>
            )}
          </Select>
          <div className="text-left mt-4 text-lg">
            <label>How old are you?</label>
          </div>
          <KFInput
            id="age"
            name="age"
            required
            label="age"
            variant="bordered"
            size="xl"
            placeholder=""
            className="mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Step2;
