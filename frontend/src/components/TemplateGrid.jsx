import { useEffect, useState } from "react";
import { defaultDetails } from "../config/defaultDetails";

const TemplateGrid = ({
  templates,
  setAddedSection,
  addedSection,
  selectedSection,
}) => {
  const [selectedItem, setSelectedItem] = useState(() => {
    const section = addedSection.find(
      (section) => section.type === selectedSection
    );
    return section?.name;
  });
  console.log(selectedItem);
  useEffect(() => {
    setSelectedItem(() => {
      const section = addedSection.find(
        (section) => section.type === selectedSection
      );
      return section?.name;
    });
  }, [selectedSection, addedSection]);

  const handleSelect = (tempName) => {
    const isAlreadySelected = selectedItem === tempName;
    setAddedSection((prevItems) => {
      let newList = [...prevItems];
      newList = newList.filter((item) => item.type !== selectedSection);
      if (isAlreadySelected) return newList;
      const newItem = {
        name: tempName,
        type: selectedSection,
        details: defaultDetails[tempName],
      };
      newList = [...newList, newItem];
      return newList;
    });
    setSelectedItem(isAlreadySelected ? null : tempName);
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "1rem",
        top: "0",
        position: "absolute",
      }}
    >
      {templates.map((element, id) => (
        <div
          className="clickable"
          style={{
            width: "10rem",
            height: "8rem",
            borderRadius: "0.5rem",
            backgroundColor: "#333333",
            padding: "0.5rem",
            position: "relative",
          }}
          key={id}
          onClick={() => handleSelect(element.name)}
        >
          {selectedItem === element.name && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "5",
                display: "flex",
              }}
            >
              <div
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "white",
                  width: "2rem",
                  height: "2rem",
                  color: "#222222",
                  padding: "0.1rem",
                  margin: "2rem 3.4rem",
                  userSelect: "none",
                }}
              >
                ✓
              </div>
            </div>
          )}
          <div
            style={{ width: "100%", height: "80%", backgroundColor: "#222222" }}
          ></div>
          <div style={{ widht: "100%", padding: "0.1rem" }}>
            <p>{element.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
