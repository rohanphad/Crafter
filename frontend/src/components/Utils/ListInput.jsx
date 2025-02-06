import React, { useState, useContext } from "react";
import ListItem from "./ListItem";
import { AppContext } from "../../context/AppContextProvider";

const ListInput = ({ sectionName, itemTemplate, onChange }) => {
  const { portfolio } = useContext(AppContext);
  console.log(sectionName);
  console.log(portfolio);
  const section = portfolio.sections.find(
    (section) => section.name === sectionName
  );
  const [items, setItems] = useState(() =>
    section.details.list.map((item) => {
      console.log(item);
      const arr = Object.entries(item);
      const newItem = itemTemplate.map((field, index) => ({
        ...field,
        value: arr[index][1] || "",
      }));
      return newItem;
    })
  );

  const updateList = (updatedItems) =>
    updatedItems.map((item) =>
      Object.fromEntries(item.map((field) => [field.name, field.value]))
    );

  const handleAddItem = () => {
    const newItem = itemTemplate.map((field) => ({
      ...field,
      value: "",
    }));
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onChange(updateList(updatedItems));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onChange(updateList(updatedItems));
  };

  const handleItemChange = (index, fieldName, value) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItems[index].map((field) =>
      field.name === fieldName ? { ...field, value } : field
    );
    setItems(updatedItems);
    onChange(updateList(updatedItems));
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        backgroundColor: "#333333",
        borderRadius: "0.5rem",
        padding: "1rem",
        border: "1px solid #444", // Added border
      }}
    >
      {/* Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={handleAddItem}
          style={{
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            width: "calc(100% - 4rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Add
        </button>
      </div>

      {/* List of Items */}
      {items.map((itemFields, index) => (
        <ListItem
          key={index}
          index={index}
          sectionName={sectionName}
          fields={itemFields}
          onChange={(fieldName, value) =>
            handleItemChange(index, fieldName, value)
          }
          onRemove={() => handleRemoveItem(index)}
        />
      ))}
    </div>
  );
};

export default ListInput;
