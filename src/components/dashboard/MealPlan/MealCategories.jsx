import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import MealList from "./MealList";
import { KFButton } from "@/components/UI/KFButton";

const MealCategories = ({ register, errors, remove, fields, append, items, setItems }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const categories = [
    {
      label: "Breakfast",
      value: "Breakfast",
    },
    {
      label: "Lunch",
      value: "Lunch",
    },
    {
      label: "Dinner",
      value: "Dinner",
    },
    {
      label: "Snacks",
      value: "Snacks",
    },
  ];

  return (
    <div className="max-w-xs md:max-w-5xl mx-auto">
      <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <div >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="mealName">Meal Category</label>
                </div>
                <Select
                  items={categories}
                  label="Select meal category"
                  className="max-w-l"
                  {...register(`mealCategory`, {
                    required: "Please select meal category",
                  })}
                >
                  {(category) => (
                    <SelectItem key={category.value}>
                      {category.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="mealName">Meal Name</label>
                </div>
                <KFInput
                  name="mealName"
                  type="text"
                  placeholder="Give a meal name "
                  {...register(`mealName`, {
                    required: "You must need to give a meal name",
                  })}
                />
                {errors.mealName && (
                  <p className="text-red-500 text-left mt-1">
                    {errors.mealName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="prepTime">Preparation Time</label>
                </div>
                <KFInput
                  name="prepTime"
                  size="xl"
                  placeholder="Minutes"
                  {...register(`prepTime`, {
                    required: "Set prep Time duration",
                    pattern: {
                      value: /^(0|[1-9]\d*)$/,
                      message: "Type in Minutes format.",
                    },
                  })}
                />
                {errors.prepTime && (
                  <p className="text-red-500 text-left mt-1">
                    {errors.prepTime.message}
                  </p>
                )}
              </div>
              <div>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="ingredients">Ingredients</label>
                </div>
                <div>
                  <KFInput
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new item"
                  />
                  <KFButton size="sm" color="secondary" className="mt-2"
                    onClick={handleAddItem}
                  >
                    Add Item
                  </KFButton>
                </div>
                {/* <MealList
                  items={items}
                /> */}
              </div>
            </div>






            <div>
              <div className="text-left mt-4 text-base mb-3">
                <label htmlFor="img">Meal Image Cover</label>
              </div>
              <KFInput
                type="file"
                name="img"
                placeholder="Upload a meal image cover"
                {...register(`mealCoverImg`)}
              />

            </div>

            {/* <KFButton type="button" onClick={() => remove(index)}>
                  Delete
                </KFButton> */}
          </div>
          {/* {fields.map((item, index) => {
            return (
             
            );
          })} */}
        </div>

        {/* <KFButton
          type="button"
          onClick={() => {
            append({});
            setItems((prevItems) => [...prevItems, []]);
          }}
        >
          append
        </KFButton> */}
      </div>
    </div>
  );
};

export default MealCategories;
