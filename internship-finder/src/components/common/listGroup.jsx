import React from "react";

const ListGroup = ({
  items,
  // textProperty,
  // valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map((item, idx) => (
        <li
          key={`listgroup_item_${idx}`}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item['name']}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;