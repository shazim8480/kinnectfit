import { KFButton } from "@/components/UI/KFButton";
import { KFInput } from "@/components/UI/KFInput";
import { Select, SelectItem } from "@nextui-org/react";
import { useRef, useState } from "react";

const MealCategories = ({ register, errors, remove, fields, append }) => {
  const [ingredients, setIngredients] = useState([]);
  console.log(ingredients);
  const handleEnterPress = (event) => {
    if (event.key === "Tab") {
      const enteredText = event.target.value;
      setIngredients((prevTexts) => [...prevTexts, enteredText]);
      event.target.value = "";
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
    <div className="max-w-xs md:max-w-lg mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="mealName">Meal Category</label>
                </div>
                <Select
                  items={categories}
                  label="Select meal category"
                  className="max-w-l"
                  {...register(`categories[${index}].categoryname`, {
                    required: "Please select meal category",
                  })}
                >
                  {(category) => (
                    <SelectItem key={category.value}>
                      {category.label}
                    </SelectItem>
                  )}
                </Select>
                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="mealName">Meal Name</label>
                </div>
                <KFInput
                  name={`categories[${index}].name`}
                  type="text"
                  placeholder="Give a meal name "
                  {...register(`categories[${index}].name`, {
                    required: "You must need to give a meal name",
                  })}
                />
                {errors.mealName && (
                  <p className="text-red-500 text-left mt-1">
                    {errors.mealName.message}
                  </p>
                )}

                <div className="text-left mt-4 text-base mb-3">
                  <label htmlFor="prepTime">Preparation Time</label>
                </div>
                <KFInput
                  name="prepTime"
                  size="xl"
                  placeholder="Minutes"
                  {...register(`categories.${index}.prepTime`, {
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

                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="ingredients">Ingredients</label>
                  </div>
                  <KFInput
                    name="ingredients"
                    onKeyDown={handleEnterPress}
                    size="xl"
                    placeholder="Enter ingredients"
                    {...register(`categories.${index}.ingredients`, {
                      required: "enter ingredients",
                    })}
                  />
                  <p>Saved texts: {ingredients.join(", ")}</p>
                </div>

                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="neutrients">Neutrients</label>
                  </div>
                  <KFInput
                    name="neutrients"
                    size="xl"
                    placeholder="neutrients"
                    {...register(`categories.${index}.neutrients`, {
                      required: "enter neutrients",
                    })}
                  />
                </div>

                <div>
                  <div className="text-left mt-4 text-base mb-3">
                    <label htmlFor="img">Meal Image Cover</label>
                  </div>
                  <KFInput
                    type="file"
                    name="img"
                    placeholder="Upload a meal image cover"
                    {...register(`categories.${index}.img`)}
                  />
                  {errors.mealImgCover && (
                    <p className="text-red-500 text-left mt-1">
                      {errors.img.message}
                    </p>
                  )}
                </div>

                <KFButton type="button" onClick={() => remove(index)}>
                  Delete
                </KFButton>
              </li>
            );
          })}
        </ul>

        <KFButton
          type="button"
          onClick={() => {
            append({});
          }}
        >
          append
        </KFButton>
      </div>
    </div>
  );
};

export default MealCategories;
