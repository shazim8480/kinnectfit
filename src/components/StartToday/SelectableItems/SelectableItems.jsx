const SelectableItem = ({ item, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(item);
  };
  return (
    <div
      className={`p-4 border ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {item}
    </div>
  );
};

export default SelectableItem;
