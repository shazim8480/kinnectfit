import React from "react";
import MealItem from "./MealItem";

const MealList = ({ items }) => {
  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <MealItem key={index} item={item} index={index} />
          ))}
        </ul>
      ) : (
        <p>No items in the list.</p>
      )}
    </div>
  );
};

export default MealList;
