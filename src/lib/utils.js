import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generic function to retrieve data from localStorage
export const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error retrieving data from localStorage for key '${key}':`, error);
    return null;
  }
};
const userData = getItemFromLocalStorage('userData');
const accessToken = getItemFromLocalStorage('accessToken');
export { userData, accessToken };
