import React, { useState } from "react";
import SelectableItem from "../SelectableItems/SelectableItems";
const items = ["Lose Weight", "Gain Weight", "Gain Muscle", "Maintain Weight"];
const Step3 = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = (item) => {
    const index = selectedItems.indexOf(item);
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };
  return (
    <div className="min-h-[250px] selector-container" key={3}>
      <div className="text-left mt-4 text-lg">
        <label>Choose your goals</label>
      </div>
      {items.map((item) => (
        <SelectableItem
          key={item}
          item={item}
          onSelect={handleSelect}
          isSelected={selectedItems.includes(item)}
        />
      ))}
    </div>
  );
};

export default Step3;
