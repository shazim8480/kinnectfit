import React, { useState } from "react";

const MealItem = ({ item, index }) => {
  return <li key={index}>{item}</li>;
};
export default MealItem;
