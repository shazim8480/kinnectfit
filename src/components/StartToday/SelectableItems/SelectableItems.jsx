import cn from "@/lib/utils";

const SelectableItem = ({ item, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(item);
  };
  return (
    <div
      // className={`my-3 rounded-lg p-4 border ${isSelected ? "selected" : ""}`}
      className={cn(`my-3 rounded-lg p-4 border `, {
        "bg-gray-100": isSelected,
        "border-blue-900": isSelected,
      })}
      onClick={handleClick}
    >
      {item}
    </div>
  );
};

export default SelectableItem;
